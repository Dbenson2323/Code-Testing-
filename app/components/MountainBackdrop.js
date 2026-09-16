// A crisp (no blur), black-and-white mountain skyline with a pine tree
// line — evoking the Colorado Front Range. Purely original vector shapes,
// not a photo, fixed behind the page content at low opacity so overlapping
// text/buttons stay legible.
const PINE_X_POSITIONS = [40, 95, 150, 720, 770, 815, 860, 1180, 1230, 1290, 1350];

function Pine({ x, scale = 1 }) {
  return (
    <g transform={`translate(${x}, 0) scale(${scale})`} fill="#0A0A0A">
      <polygon points="12,0 2,20 8,20 0,32 9,32 0,44 24,44 15,32 24,32 16,20 22,20" />
      <rect x="10" y="44" width="4" height="6" />
    </g>
  );
}

export default function MountainBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      className="fixed bottom-0 left-0 w-full h-[40vh] max-h-[420px] pointer-events-none select-none"
      style={{ filter: "grayscale(1)", opacity: 0.22 }}
    >
      {/* Back ridge */}
      <polygon
        fill="#8A8A8A"
        points="0,520 0,280 90,220 160,260 230,160 300,230 380,140 460,240 540,170 630,250 710,150 800,240 880,180 970,250 1050,190 1140,260 1220,180 1300,250 1380,200 1440,240 1440,520"
      />
      {/* Mid ridge */}
      <polygon
        fill="#4E4E4E"
        points="0,520 0,340 100,300 190,360 280,270 370,350 460,260 560,360 650,290 740,370 830,280 920,360 1010,300 1100,370 1190,290 1280,360 1370,310 1440,340 1440,520"
      />
      {/* Front ridge */}
      <polygon
        fill="#0A0A0A"
        points="0,520 0,400 120,360 220,410 330,350 440,415 560,355 670,410 790,350 900,410 1010,360 1120,410 1230,355 1340,405 1440,380 1440,520"
      />
      {PINE_X_POSITIONS.map((x, i) => (
        <Pine key={x} x={x} scale={0.9 + (i % 3) * 0.15} />
      ))}
    </svg>
  );
}
