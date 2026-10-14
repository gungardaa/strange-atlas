// Inline survey-instrument icon set. No icon library.
// ponytail: hand-drawn paths. Swap for a library only past ~30 icons.
type P = { className?: string };

function Base({ className = "h-4 w-4", children }: P & { children: React.ReactNode }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      {children}
    </svg>
  );
}

export const SunIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
  </Base>
);

export const MoonIcon = (p: P) => (
  <Base {...p}>
    <path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5Z" />
  </Base>
);

export const CompassIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15.5 8.5 13 13l-4.5 2.5L11 11Z" fill="currentColor" stroke="none" />
  </Base>
);

export const SearchIcon = (p: P) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Base>
);

export const CloseIcon = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Base>
);

export const ArrowRightIcon = (p: P) => (
  <Base {...p}>
    <path d="M3.5 12h16M14 6.5 19.5 12 14 17.5" />
  </Base>
);

export const DiceIcon = (p: P) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none" />
  </Base>
);

// Category marker glyphs. Same geometry as the map markers.
function Glyph({ className = "h-3 w-3", children }: P & { children: React.ReactNode }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className={className}>
      {children}
    </svg>
  );
}

export const glyphFor = (category: string, color: string, className?: string) => {
  const fill = { fill: color } as const;
  switch (category) {
    case "border-puzzles":
      return (
        <Glyph className={className}>
          <circle cx="6" cy="6" r="5" {...fill} />
        </Glyph>
      );
    case "enclaves-exclaves":
      return (
        <Glyph className={className}>
          <rect x="1.5" y="1.5" width="9" height="9" {...fill} />
        </Glyph>
      );
    case "access-oddities":
      return (
        <Glyph className={className}>
          <rect x="2.6" y="2.6" width="6.8" height="6.8" transform="rotate(45 6 6)" {...fill} />
        </Glyph>
      );
    case "time-date":
      return (
        <Glyph className={className}>
          <circle cx="6" cy="6" r="4.4" fill="none" stroke={color} strokeWidth="2.4" />
        </Glyph>
      );
    case "history-shaped-borders":
      return (
        <Glyph className={className}>
          <polygon points="6,1 10.4,3.5 10.4,8.5 6,11 1.6,8.5 1.6,3.5" fill="none" stroke={color} strokeWidth="1.8" />
        </Glyph>
      );
    default:
      return (
        <Glyph className={className}>
          <polygon points="6,1.5 10.8,10.5 1.2,10.5" {...fill} />
        </Glyph>
      );
  }
};
