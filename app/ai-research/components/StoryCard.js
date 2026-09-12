import ScoreMeter from "./ScoreMeter";

const SOURCE_TYPE_LABEL = {
  paper: "Preprint",
  official: "Official Announcement",
  journalism: "Tech Journalism",
  opensource: "Open Source",
  aggregator: "Community Aggregator",
  community: "Community Discussion",
};

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diffMs = Date.now() - then;
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function StoryCard({ story }) {
  const [c1, c2] = story.gradient ?? ["#14B8A6", "#22D3EE"];

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-cyan-400/40 transition-colors">
      <a href={story.url} target="_blank" rel="noopener noreferrer" className="block">
        <div
          className="relative h-32 w-full flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <span className="relative text-xs font-mono tracking-widest text-white/90 uppercase bg-black/30 px-3 py-1 rounded-full">
            {story.category}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <span className="font-semibold text-cyan-300">{story.sourceName}</span>
            <span>·</span>
            <span>{SOURCE_TYPE_LABEL[story.sourceType] ?? "Source"}</span>
            <span>·</span>
            <span>{timeAgo(story.publishedAt)}</span>
          </div>

          <h2 className="text-lg font-semibold text-white leading-snug mb-2">
            {story.title}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
            {story.blurb}
          </p>
        </div>
      </a>

      <div className="px-4 pb-4 pt-1 flex flex-wrap gap-4 border-t border-white/5 mt-1">
        <ScoreMeter
          label="Factual Accuracy"
          value={story.factualScore}
          fromLabel="Opinion"
          toLabel="100% Factual"
        />
        <ScoreMeter label="Writing Quality" value={story.qualityScore} />
      </div>
    </article>
  );
}
