import { useEffect, useState } from "react"
import { TEAM_EXECUTIVES, TEAM_ADVISORS } from "./content"

const ADV_AUTOPLAY_MS = 5000

/* ---- inline icons (stroke = currentColor) ---- */
const PeopleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const AwardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)
const ScaleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v18" />
    <path d="M5 7h14" />
    <path d="M7 7 4 14h6L7 7Z" />
    <path d="M17 7l-3 7h6l-3-7Z" />
    <path d="M8 21h8" />
  </svg>
)
const BuildingIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18" />
    <path d="M12 3 3 8h18l-9-5Z" />
    <path d="M5 8v9M9.5 8v9M14.5 8v9M19 8v9" />
  </svg>
)
const BookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2V4Z" />
    <path d="M22 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22V4Z" />
  </svg>
)

const STAT_ICONS = {
  scale: ScaleIcon,
  building: BuildingIcon,
  book: BookIcon,
  people: PeopleIcon,
  award: AwardIcon,
}

export default function TeamSection() {
  const [board, setBoard] = useState("executive")
  const [adv, setAdv] = useState(0)

  const advisor = TEAM_ADVISORS[adv]
  const advNext = () => setAdv((p) => (p + 1) % TEAM_ADVISORS.length)
  const advPrev = () => setAdv((p) => (p - 1 + TEAM_ADVISORS.length) % TEAM_ADVISORS.length)

  useEffect(() => {
    if (board !== "advisory" || TEAM_ADVISORS.length <= 1) return
    const id = setInterval(advNext, ADV_AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [board, adv])

  return (
    <section id="team">
      <div className="container">
        <div className="team-head">
          <div className="team-head-text">
            <div className="section-eyebrow team-eyebrow">
              <PeopleIcon className="team-eyebrow-icon" /> The team behind JuriNex
            </div>
            <h2 className="section-title team-title">
              Engineers and lawyers, <em>building together</em>.
            </h2>
            <p className="section-lead team-lead">
              JuriNex is built by NexIntel AI Pvt Ltd &mdash; a team that combines deep
              AI engineering with real legal practice.
            </p>
          </div>

          <div className="team-toggle" role="tablist" aria-label="Team board">
            <button
              type="button"
              role="tab"
              aria-selected={board === "executive"}
              className={`team-toggle-btn${board === "executive" ? " is-active" : ""}`}
              onClick={() => setBoard("executive")}
            >
              Executive Core
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={board === "advisory"}
              className={`team-toggle-btn${board === "advisory" ? " is-active" : ""}`}
              onClick={() => setBoard("advisory")}
            >
              Advisory Board
            </button>
          </div>
        </div>

        {board === "executive" ? (
          <div className="exec-grid">
            {TEAM_EXECUTIVES.map((m) => (
              <article className="exec-card" key={m.name}>
                <div className="exec-card-photo">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} />
                  ) : (
                    <div className="exec-card-initial">{m.initial}</div>
                  )}
                </div>
                <div className="exec-card-body">
                  <h3 className="exec-name">{m.name}</h3>
                  <div className="exec-role">{m.role}</div>
                  <p className="exec-quote">&ldquo;{m.quote}&rdquo;</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="adv-wrap">
            <button
              type="button"
              className="adv-arrow adv-arrow-prev"
              onClick={advPrev}
              aria-label="Previous advisor"
            >
              ‹
            </button>
            <button
              type="button"
              className="adv-arrow adv-arrow-next"
              onClick={advNext}
              aria-label="Next advisor"
            >
              ›
            </button>

            <div className="adv-panel">
              <div className="adv-panel-head">
                <span className="adv-panel-line" />
                <span className="adv-panel-title">
                  Jurinex Advisory Board <span className="adv-panel-diamond">◆</span>
                </span>
                <span className="adv-panel-line" />
              </div>

              <div className="adv-main" key={adv}>
                <div className="adv-photo">
                  {advisor.photo ? (
                    <img
                      src={advisor.photo}
                      alt={advisor.name}
                      style={advisor.focus ? { objectPosition: advisor.focus } : undefined}
                    />
                  ) : (
                    <div className="exec-card-initial">{advisor.initial}</div>
                  )}
                </div>
                <div className="adv-info">
                  <h3 className="adv-name">{advisor.name}</h3>
                  <div className="adv-role">{advisor.role}</div>
                  <p className="adv-bio">{advisor.bio}</p>
                </div>
              </div>

              <div className="adv-divider" />

              <div className="adv-stats">
                {advisor.stats.map((stat) => {
                  const Icon = STAT_ICONS[stat.icon] || AwardIcon
                  return (
                    <div className="adv-stat" key={stat.label}>
                      <span className="adv-stat-icon"><Icon /></span>
                      <div className="adv-stat-label">{stat.label}</div>
                      <div className="adv-stat-text">{stat.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="adv-dots" role="tablist" aria-label="Advisors">
              {TEAM_ADVISORS.map((a, i) => (
                <button
                  type="button"
                  key={a.name}
                  className={`adv-dot${i === adv ? " is-active" : ""}`}
                  onClick={() => setAdv(i)}
                  aria-label={`Go to ${a.name}`}
                  aria-selected={i === adv}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
