// Small, original line-art icons used as each story's "hero art" instead of
// a photo — hand-drawn here, so there's zero copyright/licensing risk, and
// each one is picked (in scripts/fetch-ai-news.mjs) to match what the
// article is actually about.

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Brain(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <path d="M18 10c-4 0-6 3-6 6-2 1-3 3-3 5s1 4 3 5c-1 2 0 5 3 6 1 3 4 4 6 3 2 1 4 1 5-1V10c-1-1-4-2-8 0z" />
      <path d="M30 10c4 0 6 3 6 6 2 1 3 3 3 5s-1 4-3 5c1 2 0 5-3 6-1 3-4 4-6 3-1 .5-2 .6-3 .3" />
      <path d="M21 16c1.5 1 2.5 2.5 3 4M17 24c1.5.5 2.7 1.6 3.4 3M27 16c-1.5 1-2.5 2.5-3 4M31 24c-1.5.5-2.7 1.6-3.4 3" />
    </svg>
  );
}

function Robot(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <rect x="12" y="16" width="24" height="18" rx="4" />
      <circle cx="19" cy="25" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="29" cy="25" r="2.2" fill="currentColor" stroke="none" />
      <path d="M18 31h12" />
      <path d="M24 16v-5M19 11h10" />
      <path d="M8 22v6M40 22v6" />
    </svg>
  );
}

function Eye(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <path d="M6 24s7-11 18-11 18 11 18 11-7 11-18 11S6 24 6 24z" />
      <circle cx="24" cy="24" r="6" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Chip(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <rect x="15" y="15" width="18" height="18" rx="2" />
      <rect x="20" y="20" width="8" height="8" rx="1" />
      <path d="M20 9v6M28 9v6M20 33v6M28 33v6M9 20h6M9 28h6M33 20h6M33 28h6" />
    </svg>
  );
}

function Shield(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <path d="M24 6l14 5v11c0 9-6 15-14 20-8-5-14-11-14-20V11z" />
      <path d="M18 24l4 4 8-8" />
    </svg>
  );
}

function Rocket(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <path d="M24 6c5 4 8 11 8 18 0 3-1 6-2 8h-12c-1-2-2-5-2-8 0-7 3-14 8-18z" />
      <circle cx="24" cy="20" r="3" />
      <path d="M17 30l-5 8M31 30l5 8M20 38h8" />
    </svg>
  );
}

function Document(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <path d="M14 6h14l8 8v28H14z" />
      <path d="M28 6v8h8" />
      <path d="M18 24h12M18 29h12M18 34h8" />
    </svg>
  );
}

function Code(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <path d="M17 15L7 24l10 9M31 15l10 9-10 9M27 12l-6 24" />
    </svg>
  );
}

function Globe(props) {
  return (
    <svg viewBox="0 0 48 48" {...common} {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M7 24h34M24 7c4.5 4.7 7 10.7 7 17s-2.5 12.3-7 17c-4.5-4.7-7-10.7-7-17s2.5-12.3 7-17z" />
    </svg>
  );
}

export const ICONS = { brain: Brain, robot: Robot, eye: Eye, chip: Chip, shield: Shield, rocket: Rocket, document: Document, code: Code, globe: Globe };

export default function TechIcon({ name, className }) {
  const Cmp = ICONS[name] ?? Globe;
  return <Cmp className={className} />;
}
