// Inline SVG icons — matches the codebase convention (no external icon dep).
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

export const IconChat = (p) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const IconCalendar = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export const IconMic = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

export const IconSend = (p) => (
  <svg {...base} {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export const IconLock = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export const IconBot = (p) => (
  <svg {...base} {...p}>
    {/* Antenna */}
    <line x1="12" y1="5" x2="12" y2="7.5" />
    <circle cx="12" cy="3.6" r="1.3" />
    {/* Side ears */}
    <rect x="2" y="12" width="2.6" height="4" rx="1.1" />
    <rect x="19.4" y="12" width="2.6" height="4" rx="1.1" />
    {/* Head */}
    <rect x="4.5" y="7.5" width="15" height="12.5" rx="4" />
    {/* Eyes (filled) */}
    <circle cx="9.5" cy="13.8" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="13.8" r="1.7" fill="currentColor" stroke="none" />
  </svg>
)

export const IconStop = (p) => (
  <svg {...base} {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
)
