export default function SocialLink({ href, icon, label }) {
  if (!href) {
    return (
      <span className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-800 text-gray-600 text-sm font-medium cursor-not-allowed">
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
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}
