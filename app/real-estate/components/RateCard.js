function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function RateCard({ label, rate }) {
  if (!rate) {
    return (
      <div className="rounded-lg border border-[#D8CDB8] bg-white/60 p-5 text-center">
        <p className="text-sm font-semibold text-[#7A6F5A] uppercase tracking-wide">{label}</p>
        <p className="mt-3 text-sm text-[#9C927C]">Pending first automated update</p>
      </div>
    );
  }

  return (
    <a
      href={rate.source}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-[#D8CDB8] bg-white p-5 text-center hover:border-[#B54A32] transition-colors"
    >
      <p className="text-sm font-semibold text-[#7A6F5A] uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-4xl font-serif font-bold text-[#1F3A34]">{rate.value.toFixed(2)}%</p>
      <p className="mt-2 text-xs text-[#9C927C]">
        As of {formatDate(rate.date)} · Source: Federal Reserve (FRED) ↗
      </p>
    </a>
  );
}
