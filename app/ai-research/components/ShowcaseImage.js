// A real frame from the source's own demo video (not a stock photo) —
// used where we have a verified image but embedding the source's page
// itself isn't practical (blocked from framing, or it's a whole
// marketing page rather than a focused demo). Styled as a video
// thumbnail — with a play button — since it's a still from something
// that's actually running, not a static illustration.
export default function ShowcaseImage({ showcase }) {
  if (!showcase) return null;

  return (
    <a
      href={showcase.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-4 rounded-xl border border-gray-200 overflow-hidden group"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={showcase.src} alt={showcase.alt} className="w-full h-auto block" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60 group-hover:bg-black/75 transition-colors">
            <span
              className="border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        {showcase.caption && (
          <p className="text-xs text-gray-600 mb-1.5">{showcase.caption}</p>
        )}
        <span className="text-xs font-semibold text-gray-900 underline underline-offset-2 group-hover:text-gray-600">
          ▶ Watch it run on {showcase.sourceLabel} ↗
        </span>
      </div>
    </a>
  );
}
