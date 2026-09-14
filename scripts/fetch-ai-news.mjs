#!/usr/bin/env node
/**
 * Pulls fresh AI-research items from a spread of free, public sources and
 * writes the merged, scored result to data/ai-stories.json. Run daily by
 * .github/workflows/fetch-ai-news.yml (a GitHub Actions cron), or manually
 * with `npm run fetch:news`.
 *
 * Every source is wrapped in try/catch with a timeout: one dead feed (a
 * blog changing its RSS path, a rate limit) must never take the whole run
 * down. Live Twitter/X scanning is intentionally excluded — the official
 * API's cheapest paid tier starts around $100/month, so instead we lean on
 * Hacker News + Reddit, which both surface the same AI announcements as
 * community discussion, for free.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "ai-stories.json");

const MAX_AGE_DAYS = 30;
const MAX_STORIES = 200;
const FETCH_TIMEOUT_MS = 12000;

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "ai-research-feed-bot/1.0 (+https://github.com/Dbenson2323/Code-Testing-)",
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

function stripHtml(input = "") {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function makeBlurb(text, max = 240) {
  const clean = stripHtml(text);
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

function hashId(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash * 31 + url.charCodeAt(i)) | 0;
  }
  return `s${Math.abs(hash)}`;
}

const CATEGORY_RULES = [
  { category: "LLMs & Chatbots", keywords: ["llm", "gpt", "chatgpt", "gemini", "claude", "language model", "chatbot", "grok", "llama", "copilot"] },
  { category: "Computer Vision", keywords: ["image generation", "diffusion", "vision model", "video generation", "sora", "midjourney", "stable diffusion", "text-to-image", "text-to-video"] },
  { category: "Robotics", keywords: ["robot", "robotics", "humanoid", "autonomous vehicle", "self-driving"] },
  { category: "AI Safety & Policy", keywords: ["safety", "alignment", "regulation", "policy", "governance", "ethics", "executive order", "eu ai act"] },
  { category: "Open Source & Tools", keywords: ["open source", "open-source", "github", "framework", "library", "sdk", "api release", "open weights"] },
  { category: "Industry & Business", keywords: ["funding", "valuation", "acquisition", "ipo", "revenue", "partnership", "raises", "series a", "series b", "series c"] },
  { category: "Research Papers", keywords: ["arxiv", "paper", "study", "benchmark", "dataset", "preprint"] },
];

function detectCategory(title, summary) {
  const haystack = `${title} ${summary}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) return rule.category;
  }
  return "AI News";
}

// Baseline "opinion -> 100% factual" and "well-written" scores by source
// type. These are heuristics, not a fact-check: they reflect how reliable
// that *kind* of source tends to be (a peer-reviewed-adjacent preprint vs.
// an unmoderated forum thread), not a claim-by-claim verification.
const SOURCE_BASELINE = {
  paper: { factual: 96, quality: 88 },
  official: { factual: 90, quality: 85 },
  journalism: { factual: 78, quality: 80 },
  opensource: { factual: 82, quality: 74 },
  aggregator: { factual: 62, quality: 65 },
  community: { factual: 48, quality: 55 },
};

const OPINION_MARKERS = ["opinion", "i think", "rumor", "rumour", "leaked", "allegedly", "hot take", "my take"];
const FACTUAL_MARKERS = ["announces", "announced", "releases", "released", "launches", "launched", "paper", "study", "report finds"];

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function scoreStory({ title, summary, sourceType }) {
  const baseline = SOURCE_BASELINE[sourceType] ?? SOURCE_BASELINE.community;
  const haystack = `${title} ${summary}`.toLowerCase();

  let factual = baseline.factual;
  if (OPINION_MARKERS.some((m) => haystack.includes(m))) factual -= 20;
  if (FACTUAL_MARKERS.some((m) => haystack.includes(m))) factual += 4;

  let quality = baseline.quality;
  const len = stripHtml(summary).length;
  if (len > 500) quality += 5;
  else if (len < 80) quality -= 8;

  return { factualScore: clamp(factual), qualityScore: clamp(quality) };
}

// Deterministic hyper-tech placeholder art per category (no external image
// calls, so it never breaks, costs nothing, and never hotlinks a source's
// own image without permission).
const CATEGORY_GRADIENTS = {
  "LLMs & Chatbots": ["#7C3AED", "#22D3EE"],
  "Computer Vision": ["#EC4899", "#6366F1"],
  Robotics: ["#F97316", "#EAB308"],
  "AI Safety & Policy": ["#EF4444", "#7C3AED"],
  "Open Source & Tools": ["#22C55E", "#0EA5E9"],
  "Industry & Business": ["#0EA5E9", "#A855F7"],
  "Research Papers": ["#6366F1", "#14B8A6"],
  "AI News": ["#14B8A6", "#22D3EE"],
};

function buildStory({ title, url, summary, sourceName, sourceType, publishedAt }) {
  const category = detectCategory(title, summary);
  const { factualScore, qualityScore } = scoreStory({ title, summary, sourceType });
  return {
    id: hashId(url),
    title: stripHtml(title),
    blurb: makeBlurb(summary || title),
    url,
    sourceName,
    sourceType,
    category,
    publishedAt: new Date(publishedAt).toISOString(),
    factualScore,
    qualityScore,
    gradient: CATEGORY_GRADIENTS[category] ?? CATEGORY_GRADIENTS["AI News"],
  };
}

// ---------------------------------------------------------------------------
// sources
// ---------------------------------------------------------------------------

async function fetchArxiv() {
  const url =
    "http://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG+OR+cat:cs.RO&sortBy=submittedDate&sortOrder=descending&max_results=20";
  const res = await fetchWithTimeout(url);
  const xml = await res.text();
  const parsed = xmlParser.parse(xml);
  const entries = parsed?.feed?.entry;
  const list = Array.isArray(entries) ? entries : entries ? [entries] : [];
  return list.map((entry) =>
    buildStory({
      title: entry.title,
      url: Array.isArray(entry.link) ? entry.link.find((l) => l["@_rel"] === "alternate")?.["@_href"] ?? entry.id : entry.id,
      summary: entry.summary,
      sourceName: "arXiv",
      sourceType: "paper",
      publishedAt: entry.published,
    })
  );
}

async function fetchHackerNews() {
  const url =
    "https://hn.algolia.com/api/v1/search_by_date?tags=story&query=AI%20OR%20LLM%20OR%20OpenAI%20OR%20Anthropic%20OR%20%22artificial%20intelligence%22&hitsPerPage=25";
  const res = await fetchWithTimeout(url);
  const json = await res.json();
  return (json.hits ?? [])
    .filter((hit) => hit.url && hit.title)
    .map((hit) =>
      buildStory({
        title: hit.title,
        url: hit.url,
        summary: `Trending on Hacker News with ${hit.points ?? 0} points and ${hit.num_comments ?? 0} comments.`,
        sourceName: "Hacker News",
        sourceType: "aggregator",
        publishedAt: hit.created_at,
      })
    );
}

async function fetchReddit(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=15`;
  const res = await fetchWithTimeout(url);
  const json = await res.json();
  return (json.data?.children ?? [])
    .map((c) => c.data)
    .filter((post) => post && !post.stickied && post.title)
    .map((post) =>
      buildStory({
        title: post.title,
        url: post.url?.startsWith("http") ? post.url : `https://www.reddit.com${post.permalink}`,
        summary: post.selftext || `Discussed on r/${subreddit} with ${post.score ?? 0} upvotes.`,
        sourceName: `Reddit r/${subreddit}`,
        sourceType: "community",
        publishedAt: new Date((post.created_utc ?? Date.now() / 1000) * 1000).toISOString(),
      })
    );
}

async function fetchRss({ url, sourceName, sourceType }) {
  const res = await fetchWithTimeout(url);
  const xml = await res.text();
  const parsed = xmlParser.parse(xml);

  // RSS 2.0
  const rssItems = parsed?.rss?.channel?.item;
  if (rssItems) {
    const list = Array.isArray(rssItems) ? rssItems : [rssItems];
    return list.map((item) =>
      buildStory({
        title: item.title,
        url: item.link,
        summary: item.description ?? item["content:encoded"] ?? "",
        sourceName,
        sourceType,
        publishedAt: item.pubDate ?? new Date().toISOString(),
      })
    );
  }

  // Atom
  const atomEntries = parsed?.feed?.entry;
  if (atomEntries) {
    const list = Array.isArray(atomEntries) ? atomEntries : [atomEntries];
    return list.map((entry) =>
      buildStory({
        title: entry.title,
        url: Array.isArray(entry.link) ? entry.link[0]?.["@_href"] : entry.link?.["@_href"] ?? entry.id,
        summary: entry.summary ?? entry.content ?? "",
        sourceName,
        sourceType,
        publishedAt: entry.updated ?? entry.published ?? new Date().toISOString(),
      })
    );
  }

  return [];
}

async function fetchGithubTrendingAI() {
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const url = `https://api.github.com/search/repositories?q=artificial+intelligence+created:>${since}&sort=stars&order=desc&per_page=15`;
  const res = await fetchWithTimeout(url, { headers: { Accept: "application/vnd.github+json" } });
  const json = await res.json();
  return (json.items ?? []).map((repo) =>
    buildStory({
      title: `${repo.full_name}: ${repo.description ?? "new AI project"}`,
      url: repo.html_url,
      summary: repo.description ?? "",
      sourceName: "GitHub Trending",
      sourceType: "opensource",
      publishedAt: repo.created_at,
    })
  );
}

const RSS_SOURCES = [
  { url: "https://openai.com/news/rss.xml", sourceName: "OpenAI", sourceType: "official" },
  { url: "https://www.anthropic.com/rss.xml", sourceName: "Anthropic", sourceType: "official" },
  { url: "https://deepmind.google/blog/rss.xml", sourceName: "Google DeepMind", sourceType: "official" },
  { url: "https://ai.meta.com/blog/rss/", sourceName: "Meta AI", sourceType: "official" },
  { url: "https://mistral.ai/news/rss.xml", sourceName: "Mistral AI", sourceType: "official" },
  { url: "https://huggingface.co/blog/feed.xml", sourceName: "Hugging Face", sourceType: "opensource" },
  { url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", sourceName: "MIT Technology Review", sourceType: "journalism" },
  { url: "https://venturebeat.com/category/ai/feed/", sourceName: "VentureBeat AI", sourceType: "journalism" },
];

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function safe(label, fn) {
  try {
    const result = await fn();
    console.log(`[ok]   ${label}: ${result.length} items`);
    return result;
  } catch (err) {
    console.warn(`[skip] ${label}: ${err.message}`);
    return [];
  }
}

async function main() {
  const jobs = [
    safe("arXiv", fetchArxiv),
    safe("Hacker News", fetchHackerNews),
    safe("Reddit r/MachineLearning", () => fetchReddit("MachineLearning")),
    safe("Reddit r/artificial", () => fetchReddit("artificial")),
    safe("GitHub Trending", fetchGithubTrendingAI),
    ...RSS_SOURCES.map((src) => safe(src.sourceName, () => fetchRss(src))),
  ];

  const results = (await Promise.all(jobs)).flat();

  let previous = [];
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    previous = JSON.parse(raw).stories ?? [];
  } catch {
    // no existing file yet — first run
  }

  const byUrl = new Map();
  for (const story of [...previous, ...results]) {
    byUrl.set(story.url, story);
  }

  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const merged = [...byUrl.values()]
    .filter((s) => {
      const t = new Date(s.publishedAt).getTime();
      return Number.isFinite(t) && t >= cutoff;
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, MAX_STORIES);

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(
    DATA_FILE,
    JSON.stringify({ generatedAt: new Date().toISOString(), stories: merged }, null, 2) + "\n"
  );

  console.log(`\nWrote ${merged.length} stories to ${path.relative(process.cwd(), DATA_FILE)}`);
  if (results.length === 0 && previous.length === 0) {
    console.warn("Warning: no sources returned data and there was no existing file. Check network access.");
  }
}

main().catch((err) => {
  console.error("Fatal error in fetch-ai-news:", err);
  process.exitCode = 1;
});
