export default function ResourcesSection({ resources }) {
  return (
    <ul className="space-y-2">
      {resources.map((resource) =>
        resource.href ? (
          <li key={resource.id}>
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B54A32] font-semibold hover:underline"
            >
              {resource.title} ↗
            </a>
          </li>
        ) : (
          <li key={resource.id} className="text-[#9C927C]">
            {resource.title} <span className="text-xs italic">(coming soon)</span>
          </li>
        )
      )}
    </ul>
  );
}
