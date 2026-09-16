import { GraduationCapIcon } from "./ProfileIcons";

export default function EducationRow({ href, iconColor, iconBg, title, subtitle, bio }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-400 bg-white transition-colors"
    >
      <span
        className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <GraduationCapIcon className="w-6 h-6" />
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-gray-900">{title}</span>
        <span className="block text-sm text-gray-500">{subtitle}</span>
        <span className="block text-sm text-gray-600 mt-1">{bio}</span>
      </span>
    </a>
  );
}
