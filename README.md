# Code-Testing-

Duke Benson's site — a personal home/portfolio, a daily-updated **AI Research Feed**, and a
**Real Estate** market page.

## Quick start (read this first)

There are two completely different ways this site gets used, and they don't require the same
thing from you:

- **Visitors** (anyone you send the link to) just open a URL in their normal browser — phone,
  laptop, whatever. They never install anything or run any command. That's the whole point of
  hosting it.
- **You**, when you want to preview a change *before* it's live, run it on your own computer
  with the steps below. This is optional — the live site works without you ever doing this.

See "Running it on your own computer" and "Getting the live public link" further down for both.

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

## Real Estate (`/real-estate`)

A commercial real estate market page covering four focus markets — Denver, Chicago, Miami, and
San Francisco — across five asset classes (Multifamily, Industrial, Office, Retail, Hospitality).

**What's real vs. what's a placeholder, and why:**

- **Interest rates** (Fed Funds Rate, 10-Year Treasury, 30-Year Mortgage) are real, current
  figures pulled directly from the Federal Reserve's public FRED data — no API key needed, no
  estimates. See `fetchAllRates()` in `scripts/fetch-real-estate-news.mjs`.
- **Deal news** per market is pulled from free commercial real estate trade-press RSS feeds
  (GlobeSt, Commercial Property Executive, REBusinessOnline, The Real Deal, Multi-Housing News),
  filtered to stories that mention one of the four focus markets.
- **Asset-class metrics** (net absorption, supply under construction, vacancy) are **not**
  fetched from anywhere — that data lives behind paid subscriptions (CoStar, CBRE, JLL) with no
  free public API, so fabricating realistic-looking numbers here would be misleading. Instead,
  `data/real-estate-metrics.json` holds clearly-labeled example figures (`"example": true`,
  which the page shows as an "Example data" badge) for you to replace with your own real numbers
  and source citations once you have data access.

**How the automatic update works:** `.github/workflows/fetch-real-estate-news.yml` runs
`npm run fetch:real-estate` every 6 hours, which writes the real rates and news to
`data/real-estate-rates.json` and `data/real-estate-news.json` and commits if anything changed —
same pattern as the AI Research Feed. Trigger it by hand any time from the Actions tab, or run
locally with `npm run fetch:real-estate`.

**Uploading Excel models:** the "Models" section reads `data/real-estate-models.json`, a simple
list of `{ name, description, file }` entries. To publish a model:

1. Drop the `.xlsx` file into `public/real-estate/models/`
2. Set that entry's `file` to the filename (e.g. `"waterfall-model.xlsx"`)
3. Push — the download button appears automatically, no code changes needed

The same pattern works for the "Resources" section's video/article links in
`data/real-estate-resources.json` — just fill in a `href`.

## Running it on your own computer

This is only for previewing changes before they go live — nobody else needs to do this to view
the site.

1. **Install Node.js** (one-time, only if you don't have it): go to
   [nodejs.org](https://nodejs.org) and install the "LTS" version. This gives your computer the
   `node` and `npm` commands used below.
2. **Get the code onto your computer** (one-time): if you don't already have a local copy,
   install [GitHub Desktop](https://desktop.github.com) and use it to clone
   `Dbenson2323/Code-Testing-`, or run `git clone https://github.com/Dbenson2323/Code-Testing-.git`
   in a terminal.
3. **Open a terminal in that folder** and install dependencies (one-time per copy, or after code
   changes to `package.json`):
   ```bash
   npm install
   ```
   This downloads all the libraries the project depends on (Next.js, React, etc.) into a
   `node_modules` folder. You won't see this folder in GitHub — it's not something anyone
   uploads or downloads by hand.
4. **Start the local preview server**:
   ```bash
   npm run dev
   ```
   Leave this running in the terminal, then open
   [http://localhost:3000](http://localhost:3000) in your browser — the personal home page is at
   `/`, the AI feed is at `/ai-research`, and the about page is unchanged at `/about-me`.
   `localhost:3000` only works on your own computer; nobody else can open that address.
5. **To stop it**, click into the terminal and press `Ctrl+C`.
6. **To get the latest version** (e.g. after the daily AI-fetch bot has added new stories, or
   after I push more changes), pull the latest code first, then restart:
   ```bash
   git pull
   npm run dev
   ```

## Getting the live public link

The site deploys to **GitHub Pages** automatically via `.github/workflows/deploy.yml` on every
push. One-time setup in the GitHub UI (can't be done from a script):

1. Repo → **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to **GitHub Actions**

After that, every push rebuilds and redeploys automatically, and your public link will be:

```
https://dbenson2323.github.io/Code-Testing-/
```

That's the link you can open on your phone or send to anyone.

## Project structure

```
app/
  page.js              personal home page
  about-me/            personal about page (unchanged)
  work/                real project list (replaces old dead Portfolio/Projects links)
  ai-research/         the AI research feed
    page.js            server component, loads data/ai-stories.json
    AiResearchClient.js search + category filtering + feed layout
    components/
      StoryCard.js      one feed card
      ScoreMeter.js     the factual/quality score bars
      TechIcons.js      original topic-matched SVG icon art (no stock photos)
  real-estate/         the real estate market page
    page.js            server component, loads all data/real-estate-*.json
    RealEstateClient.js market/asset-class tabs, rates, news, models, resources
    components/
      RateCard.js          one FRED interest-rate stat
      MarketMetricCard.js  one market x asset-class metrics card
      NewsList.js          filtered deal-news list for a market
      ModelsSection.js     Excel model download cards
      ResourcesSection.js  video/article link list
data/
  ai-stories.json            the current AI feed data (rewritten daily by CI)
  real-estate-rates.json     real Fed interest rates (rewritten daily by CI)
  real-estate-news.json      real deal news per market (rewritten daily by CI)
  real-estate-metrics.json   hand-edited example asset-class metrics (see Real Estate section)
  real-estate-models.json    named Excel model download slots
  real-estate-resources.json named resource/video link slots
public/real-estate/models/   drop .xlsx files here to publish them for download
scripts/
  fetch-ai-news.mjs           the daily AI feed fetch/score/merge job
  fetch-real-estate-news.mjs  the real estate rates/news fetch job (runs every 6h)
.github/workflows/
  fetch-ai-news.yml            daily cron: fetch AI news, commit if changed
  fetch-real-estate-news.yml   cron: fetch real estate data every 6h, commit if changed
  deploy.yml                   build + deploy to GitHub Pages on every push
```

## Security

Dependencies are kept on patched versions (`npm audit` is clean except for one build-tool-only
`postcss` advisory nested inside Next.js's own tooling, which never ships to the deployed site —
fixing it requires a breaking Next 16 / ESLint 9 upgrade). Run `npm audit` periodically to check
for new advisories.

---

This is a [Next.js](https://nextjs.org) project. See the [Next.js docs](https://nextjs.org/docs)
to learn more about the framework itself.
