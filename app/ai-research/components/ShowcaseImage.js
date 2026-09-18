// A real screenshot from the source's own page (not a stock photo) —
// used where we have a verified image but embedding the source's page
// itself isn't practical (blocked from framing, or it's a whole
// marketing page rather than a focused demo).
export default function ShowcaseImage({ showcase }) {
  if (!showcase) return null;

  return (
    <div className="mb-4 rounded-xl border border-gray-200 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={showcase.src} alt={showcase.alt} className="w-full h-auto block" />
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        {showcase.caption && (
          <p className="text-xs text-gray-600 mb-1.5">{showcase.caption}</p>
        )}
        <a
          href={showcase.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600"
        >
          Watch on {showcase.sourceLabel} ↗
        </a>
      </div>
    </div>
  );
}
