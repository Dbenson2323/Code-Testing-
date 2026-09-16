// A short daily-recap paragraph computed entirely from the real fetched
// rate numbers above — not a fabricated "market commentary." If the rates
// haven't been fetched yet, it says so instead of guessing.
function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function MarketOverview({ rates, generatedAt }) {
  const { fedFundsRate, treasury10Y, mortgage30Y } = rates;

  if (!fedFundsRate || !treasury10Y || !mortgage30Y) {
    return (
      <div className="rounded-xl border border-dashed border-[#D8CDB8] bg-white/50 p-6 text-center text-[#9C927C]">
        Daily market recap will appear here once rates have been fetched for the first time.
      </div>
    );
  }

  const spread = Math.round((treasury10Y.value - fedFundsRate.value) * 100); // in bps
  const spreadDesc =
    spread > 0
      ? `a positive spread of ${spread} basis points`
      : `an inverted spread of ${Math.abs(spread)} basis points`;
  const mortgageOverTreasury = Math.round((mortgage30Y.value - treasury10Y.value) * 100);

  return (
    <div className="rounded-xl border border-[#D8CDB8] bg-white p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-serif font-bold text-[#1F3A34]">Daily Recap</h3>
        <span className="text-[11px] text-[#9C927C]">{formatDate(generatedAt)}</span>
      </div>
      <p className="text-sm text-[#5C5443] leading-relaxed">
        The effective Fed Funds Rate stands at <strong>{fedFundsRate.value.toFixed(2)}%</strong>, while the
        10-Year Treasury trades at <strong>{treasury10Y.value.toFixed(2)}%</strong> — {spreadDesc}, a
        common read on the market&apos;s growth and inflation expectations. The average 30-year mortgage
        rate of <strong>{mortgage30Y.value.toFixed(2)}%</strong> sits {mortgageOverTreasury} basis points
        over the 10-Year, setting the debt-financing backdrop for acquisitions across all four focus
        markets below.
      </p>
      <p className="mt-3 text-[10px] text-[#9C927C] italic">
        Computed directly from the real Federal Reserve figures above — not commentary or prediction.
      </p>
    </div>
  );
}
