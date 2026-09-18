import TechIcon from "./TechIcons";
import LiveDemo from "./LiveDemo";

export default function CapabilityCard({ capability }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-start gap-4 mb-4">
        <span className="shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          <TechIcon name={capability.icon} className="w-7 h-7 text-gray-700" />
        </span>
        <div>
          <span className="inline-block text-[10px] font-semibold uppercase tracking-wide bg-gray-900 text-white px-2 py-0.5 rounded-full mb-1.5">
            New capability
          </span>
          <h3 className="text-xl font-serif font-bold text-gray-900 leading-snug">
            {capability.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{capability.tagline}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
            What it is
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{capability.whatItIs}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
            How it works
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{capability.howItWorks}</p>
        </div>
      </div>

      <LiveDemo demo={capability.liveDemo} />

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-1.5">Pros</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {capability.pros.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-700">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700 mb-1.5">Cons</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {capability.cons.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-700">−</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 self-center">
          Try it
        </span>
        {capability.tryIt.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600"
          >
            {link.label} →
          </a>
        ))}
      </div>
    </article>
  );
}
