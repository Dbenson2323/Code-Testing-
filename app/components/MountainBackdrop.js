// A faint, blurred, black-and-white mountain skyline — evoking the Front
// Range without being (or claiming to be) an actual photo. Purely original
// vector shapes, fixed behind the page content at low opacity.
export default function MountainBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMax slice"
      className="fixed bottom-0 left-0 w-full h-[38vh] max-h-96 pointer-events-none select-none"
      style={{ filter: "blur(6px) grayscale(1)", opacity: 0.16 }}
    >
      <polygon points="0,500 0,300 180,180 340,280 520,140 700,260 860,120 1040,240 1220,150 1440,260 1440,500" fill="#4B4B4B" />
      <polygon points="0,500 0,360 220,240 420,340 640,220 880,330 1100,210 1300,320 1440,300 1440,500" fill="#2B2B2B" />
      <polygon points="0,500 0,420 260,360 500,410 760,350 1020,410 1260,360 1440,400 1440,500" fill="#111111" />
    </svg>
  );
}
