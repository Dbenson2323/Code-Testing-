// Renders one 0-100 score as a labeled horizontal meter.
export default function ScoreMeter({ label, value, fromLabel, toLabel }) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor =
    clamped >= 80 ? "#22C55E" : clamped >= 55 ? "#EAB308" : "#EF4444";

  return (
    <div className="flex-1 min-w-[120px]">
      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
        <span className="font-semibold tracking-wide uppercase">{label}</span>
        <span className="font-mono text-gray-300">{clamped}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${clamped}%`, backgroundColor: barColor }}
        />
      </div>
      {(fromLabel || toLabel) && (
        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
          <span>{fromLabel}</span>
          <span>{toLabel}</span>
        </div>
      )}
    </div>
  );
}
