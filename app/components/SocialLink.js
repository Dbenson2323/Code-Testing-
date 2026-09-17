export default function SocialLink({ href, icon, label }) {
  if (!href) {
    return (
      <span className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/40 text-sm font-medium cursor-not-allowed">
        {icon}
        {label} <span className="text-xs italic">(coming soon)</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/30 hover:border-white/60 bg-white/10 backdrop-blur-sm text-white hover:text-white text-sm font-medium transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}
