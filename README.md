# Web-1-

Duke Benson's site — a personal home/portfolio plus a daily-updated **AI Research Feed**.

## AI Research Feed (`/ai-research`)

A Twitter-style scrolling feed of AI research and industry news, most recent first, with a
Google-style search bar up top and category filter chips. Every story shows two automated
scores at the bottom of the card:

- **Factual Accuracy** — a 0–100 scale from *Opinion* to *100% Factual*. This is a heuristic
  based on the *type* of source (an arXiv preprint or an official lab announcement scores high;
  an unmoderated forum post scores lower), not a manual fact-check of each claim.
- **Writing Quality** — a 0–100 estimate of how well-written/substantive the piece is, also
  heuristic (source reputation + content length), not a grammar check.

Both scores are computed automatically in `scripts/fetch-ai-news.mjs` — see `scoreStory()` and
`SOURCE_BASELINE` in that file if you want to tune the rubric.

### Where the content comes from

Pulled fresh every day from free, public sources:

- **arXiv** (`cs.AI`, `cs.CL`, `cs.LG`, `cs.RO`) — new preprints
- **Hacker News** (Algolia API) — AI-related front-page stories
- **Reddit** — r/MachineLearning, r/artificial
- **GitHub Trending** — new AI repos gaining stars
- Official blogs: **OpenAI**, **Anthropic**, **Google DeepMind**, **Meta AI**, **Mistral AI**,
  **Hugging Face**
- Tech journalism: **MIT Technology Review AI**, **VentureBeat AI**

**Note on Twitter/X:** live scanning of Twitter/X was intentionally left out — the official API's
cheapest paid tier runs about $100+/month, which isn't worth it for this. Hacker News and Reddit
both surface the same announcements as community discussion, for free, so they're used instead.
If you later get API access and want it added, `scripts/fetch-ai-news.mjs` is where a new source
function would go.

A blog's RSS feed URL occasionally changes — if a source stops showing up, check
`RSS_SOURCES` in `scripts/fetch-ai-news.mjs` and update the URL. Every source is wrapped in its
own try/catch, so one broken feed never breaks the whole daily update.

### How the daily update works

`.github/workflows/fetch-ai-news.yml` runs `npm run fetch:news` once a day (13:00 UTC), which
fetches all sources above, scores and categorizes each item, merges it with existing stories
(deduped by URL, kept for 30 days), and commits the result to `data/ai-stories.json` if anything
changed. That commit triggers `.github/workflows/deploy.yml`, which rebuilds the site and
redeploys it to GitHub Pages — so the feed updates itself with no manual work.

**One-time setup required:** GitHub only runs scheduled (`cron`) workflows on the repository's
default branch, so the daily fetch won't fire on its own until this branch is merged to `main`.
Until then (or any time), you can trigger it manually: repo → **Actions** tab → "Fetch daily AI
research news" → **Run workflow**.

You can also run it locally any time:

```bash
npm run fetch:news
```

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the personal home page is at `/`, the AI
feed is at `/ai-research`, and the about page is unchanged at `/about-me`.

## Deploying / getting a public link

The site deploys to **GitHub Pages** automatically via `.github/workflows/deploy.yml` on every
push. One-time setup in the GitHub UI (can't be done from a script):

1. Repo → **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to **GitHub Actions**

After that, every push rebuilds and redeploys automatically, and your public link will be:

```
https://dbenson2323.github.io/Web-1-/
```

That's the link you can open on your phone or send to anyone.

## Project structure

```
app/
  page.js              personal home page
  about-me/            personal about page (unchanged)
  ai-research/         the AI research feed
    page.js            server component, loads data/ai-stories.json
    AiResearchClient.js search + category filtering + feed layout
    components/
      StoryCard.js      one feed card
      ScoreMeter.js     the factual/quality score bars
data/
  ai-stories.json       the current feed data (rewritten daily by CI)
scripts/
  fetch-ai-news.mjs      the daily fetch/score/merge job
.github/workflows/
  fetch-ai-news.yml      daily cron: fetch news, commit if changed
  deploy.yml             build + deploy to GitHub Pages on every push
```

## Security

Dependencies are kept on patched versions (`npm audit` is clean except for one build-tool-only
`postcss` advisory nested inside Next.js's own tooling, which never ships to the deployed site —
fixing it requires a breaking Next 16 / ESLint 9 upgrade). Run `npm audit` periodically to check
for new advisories.

---

This is a [Next.js](https://nextjs.org) project. See the [Next.js docs](https://nextjs.org/docs)
to learn more about the framework itself.
