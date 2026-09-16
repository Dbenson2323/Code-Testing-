// Original, simple line-art icons for the homepage contact card — not
// reproductions of any company's or school's actual trademarked logo/seal,
// just generic recognizable shapes (a cap for education, an envelope for
// mail, a camera for Instagram, etc.) in the relevant brand's real colors
// where that's public knowledge (e.g. CU Boulder's black-and-gold).

const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

export function GraduationCapIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M12 4L2 9l10 5 10-5-10-5z" />
      <path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 9v6" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif" fill="white">
        in
      </text>
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
