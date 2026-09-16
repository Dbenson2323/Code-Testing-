// The classic four-phase real estate cycle clock (Recovery -> Expansion ->
// Hypersupply -> Recession -> back to Recovery). Determining which phase a
// given market/asset class is actually in requires real trend data
// (multi-quarter vacancy + absorption direction) that isn't available for
// free — so this deliberately does NOT claim a phase. It shows the
// framework and marks each market "Coming soon" rather than guessing.
const PHASES = [
  { key: "recovery", label: "Recovery", desc: "Falling vacancy, no new construction yet" },
  { key: "expansion", label: "Expansion", desc: "Falling vacancy, rising construction" },
  { key: "hypersupply", label: "Hypersupply", desc: "Rising vacancy, construction still delivering" },
  { key: "recession", label: "Recession", desc: "Rising vacancy, negative absorption" },
];

export default function CyclePhase({ marketLabel }) {
  return (
    <div className="rounded-xl border border-[#D8CDB8] bg-white p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-serif font-bold text-[#1F3A34]">{marketLabel} — Where in the Cycle?</h3>
        <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#EDE6D6] text-[#7A6F5A] px-2.5 py-1 rounded-full">
          Coming soon
        </span>
      </div>
      <p className="text-sm text-[#5C5443] mb-4">
        Placing a market in the cycle takes multiple quarters of real vacancy and absorption trend
        data, which isn&apos;t available for free — so rather than guess, here&apos;s the framework.{" "}
        {marketLabel}&apos;s actual position will populate here once that data is connected.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PHASES.map((phase) => (
          <div key={phase.key} className="rounded-lg border border-dashed border-[#D8CDB8] p-3 text-center">
            <p className="text-sm font-semibold text-[#7A6F5A]">{phase.label}</p>
            <p className="text-[11px] text-[#9C927C] mt-1">{phase.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
