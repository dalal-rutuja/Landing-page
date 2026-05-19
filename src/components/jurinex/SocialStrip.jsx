import { SOCIALS } from "./content"

export default function SocialStrip({ label, dark = false, centered = false }) {
  const cls = [
    "social-strip",
    dark && "social-strip-dark",
    centered && "social-centered",
  ].filter(Boolean).join(" ")

  return (
    <div className={cls}>
      <span className="social-label">{label}</span>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          className="social-icon"
          aria-label={s.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}
