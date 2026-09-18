// A compact inline score badge — "Factual 82%" — colored by band.
export default function ScoreMeter({ label, value }) {
  const clamped = Math.max(0, Math.min(100, value));
  const color =
    clamped >= 80 ? "#15803D" : clamped >= 55 ? "#A16207" : "#B91C1C";
  const bg =
    clamped >= 80 ? "#EEFBF3" : clamped >= 55 ? "#FFF8E5" : "#FFF1EE";

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ color, backgroundColor: bg }}
    >
      {label} {clamped}%
    </span>
  );
}
