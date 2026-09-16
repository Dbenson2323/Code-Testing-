"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RateCard from "./components/RateCard";
import MarketMetricCard from "./components/MarketMetricCard";
import NewsList from "./components/NewsList";
import ModelsSection from "./components/ModelsSection";
import ResourcesSection from "./components/ResourcesSection";

const MARKETS = [
  { key: "denver", label: "Denver" },
  { key: "chicago", label: "Chicago" },
  { key: "miami", label: "Miami" },
  { key: "sanfrancisco", label: "San Francisco" },
];

const ASSET_CLASSES = [
  { key: "multifamily", label: "Multifamily" },
  { key: "industrial", label: "Industrial" },
  { key: "office", label: "Office" },
  { key: "retail", label: "Retail" },
  { key: "hospitality", label: "Hospitality" },
];

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function RealEstateClient({ rates, ratesGeneratedAt, news, metrics, models, resources }) {
  const [activeMarket, setActiveMarket] = useState("denver");
  const [activeAssetClass, setActiveAssetClass] = useState("multifamily");

  const marketNews = useMemo(
    () => news.filter((item) => item.market === activeMarket).slice(0, 6),
    [news, activeMarket]
  );

  const marketMetrics = metrics.markets[activeMarket];
  const assetMetrics = marketMetrics?.assetClasses?.[activeAssetClass];
  const assetLabel = ASSET_CLASSES.find((a) => a.key === activeAssetClass)?.label ?? activeAssetClass;

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#2A241C]">
      {/* Hero */}
      <header className="px-6 pt-14 pb-10 text-center border-b border-[#D8CDB8] bg-[#FBF8F0]">
        <Link href="/" className="text-xs text-[#9C927C] hover:text-[#2A241C] block mb-6">
          ← Back to home
        </Link>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1F3A34]">Real Estate</h1>
        <p className="mt-3 text-[#5C5443] max-w-xl mx-auto">
          A market analyst&apos;s view of commercial real estate — national interest rates,
          deal news, and asset-class metrics across four focus markets.
        </p>
        {ratesGeneratedAt && (
          <p className="mt-3 text-xs text-[#9C927C]">
            Rates &amp; news last updated {formatDate(ratesGeneratedAt)} · refreshes automatically every day
          </p>
        )}
      </header>

      {/* National interest rates */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif font-bold text-[#1F3A34] mb-2">
          US Market News: Interest Rates &amp; Cost of Capital
        </h2>
        <p className="text-sm text-[#5C5443] mb-6">
          Real, current figures pulled directly from the Federal Reserve (FRED) — not estimates.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          <RateCard label="Fed Funds Rate" rate={rates.fedFundsRate} />
          <RateCard label="10-Year Treasury" rate={rates.treasury10Y} />
          <RateCard label="30-Year Mortgage" rate={rates.mortgage30Y} />
        </div>
      </section>

      {/* Market tabs */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {MARKETS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMarket(m.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeMarket === m.key
                  ? "bg-[#1F3A34] text-white"
                  : "bg-white border border-[#D8CDB8] text-[#5C5443] hover:border-[#1F3A34]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {ASSET_CLASSES.map((a) => (
            <button
              key={a.key}
              onClick={() => setActiveAssetClass(a.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeAssetClass === a.key
                  ? "bg-[#B54A32] text-white"
                  : "bg-white border border-[#D8CDB8] text-[#5C5443] hover:border-[#B54A32]"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#1F3A34] mb-3">
              {MARKETS.find((m) => m.key === activeMarket)?.label} — {assetLabel} Metrics
            </h3>
            <MarketMetricCard assetClassLabel={assetLabel} metrics={assetMetrics} />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-[#1F3A34] mb-3">
              {MARKETS.find((m) => m.key === activeMarket)?.label} — Recent Deal News
            </h3>
            <NewsList items={marketNews} />
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-[#D8CDB8]">
        <h2 className="text-2xl font-serif font-bold text-[#1F3A34] mb-2">Models</h2>
        <p className="text-sm text-[#5C5443] mb-6">
          Downloadable Excel models. Drop a file into the models folder and it appears here
          automatically — no code changes needed.
        </p>
        <ModelsSection models={models} />
      </section>

      {/* Resources */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-[#D8CDB8]">
        <h2 className="text-2xl font-serif font-bold text-[#1F3A34] mb-4">Resources</h2>
        <ResourcesSection resources={resources} />
      </section>

      <footer className="text-center text-xs text-[#9C927C] pb-12 px-6">
        Interest rates are real, current data from the Federal Reserve. Deal news is pulled
        automatically from commercial real estate trade press. Asset-class metrics marked
        &ldquo;Example data&rdquo; are placeholders, not real market figures.
      </footer>
    </div>
  );
}
