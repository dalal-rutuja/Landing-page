import { useEffect, useMemo, useState } from "react"
import { TEAM } from "./content"

const AUTO_SCROLL_MS = 4200
const TRANSITION_MS = 650

export default function TeamSection() {
  const [paused, setPaused] = useState(false)
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)

  const slides = useMemo(() => {
    if (!TEAM.length) return []
    const first = TEAM[0]
    const last = TEAM[TEAM.length - 1]
    return [last, ...TEAM, first]
  }, [])

  const goNext = () => {
    setAnimate(true)
    setIndex((prev) => prev + 1)
  }

  const goPrev = () => {
    setAnimate(true)
    setIndex((prev) => prev - 1)
  }

  useEffect(() => {
    if (paused || TEAM.length <= 1) return
    const id = setInterval(() => goNext(), AUTO_SCROLL_MS)
    return () => clearInterval(id)
  }, [paused])

  useEffect(() => {
    // Safety clamp: prevents occasional blank state if index drifts out of loop bounds.
    if (index > TEAM.length + 1) {
      setAnimate(false)
      setIndex(1)
      return
    }
    if (index < 0) {
      setAnimate(false)
      setIndex(TEAM.length)
    }
  }, [index])

  const handleTransitionEnd = () => {
    if (index === TEAM.length + 1) {
      setAnimate(false)
      setIndex(1)
      return
    }
    if (index === 0) {
      setAnimate(false)
      setIndex(TEAM.length)
    }
  }

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true))
      return () => cancelAnimationFrame(id)
    }
  }, [animate])

  return (
    <section id="team">
      <div className="container">
        <div className="section-eyebrow">The team behind JuriNex</div>
        <h2 className="section-title">
          Engineers and lawyers, <em>building together</em>.
        </h2>
        <p className="section-lead">
          JuriNex is built by NexIntel AI Pvt Ltd &mdash; a team
          that combines deep AI engineering with real legal practice.
        </p>

        <div
          className="team-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <button
            type="button"
            className="team-arrow team-arrow-prev"
            onClick={goPrev}
            aria-label="Previous team member"
          >
            ‹
          </button>

          <div className="team-track">
            <div
              className="team-track-inner"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transitionDuration: animate ? `${TRANSITION_MS}ms` : "0ms",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((m, i) => (
                <article className="team-slide" key={`${m.name}-${i}`}>
                  <div className="team-slide-photo">
                    <div className="team-photo-initial">{m.initial}</div>
                  </div>
                  <div className="team-slide-foot">
                    <div className="team-name">{m.name}</div>
                    <div className="team-role-line">{m.line1}</div>
                    <div className="team-role-line">{m.line2}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="team-arrow team-arrow-next"
            onClick={goNext}
            aria-label="Next team member"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
