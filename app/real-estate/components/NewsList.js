function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const days = Math.round((Date.now() - then) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function NewsList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#D8CDB8] bg-white/50 p-8 text-center text-[#9C927C]">
        No deal news for this market yet — this list updates automatically every day from
        commercial real estate trade press.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-[#D8CDB8] bg-white p-4 hover:border-[#B54A32] transition-colors"
        >
          <div className="flex items-center gap-2 text-xs text-[#9C927C] mb-1.5">
            <span className="font-semibold text-[#B54A32]">{item.sourceName}</span>
            <span>·</span>
            <span>{timeAgo(item.publishedAt)}</span>
          </div>
          <h4 className="font-semibold text-[#2A241C] leading-snug">{item.title}</h4>
          <p className="text-sm text-[#5C5443] mt-1 leading-relaxed line-clamp-2">{item.blurb}</p>
        </a>
      ))}
    </div>
  );
}
