import { useCallback, useEffect, useRef, useState } from "react"
import { TESTIMONIALS } from "./content"

const AUTO_SCROLL_MS = 4500

export default function TestimonialsSection() {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const scrollByCard = useCallback((dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector(".testimonial-card")
    if (!card) return
    const step = card.getBoundingClientRect().width + 22 // card + gap
    const max = track.scrollWidth - track.clientWidth
    let next = track.scrollLeft + dir * step
    if (dir > 0 && next > max - 4) next = 0
    else if (dir < 0 && next < 4) next = max
    track.scrollTo({ left: next, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => scrollByCard(1), AUTO_SCROLL_MS)
    return () => clearInterval(id)
  }, [paused, scrollByCard])

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-eyebrow">Voices from the bench &amp; bar</div>
        <h2 className="section-title">What our users are saying.</h2>
        <p className="section-lead">
          Advocates and firms across Indian jurisdictions, using JuriNex for real
          filings &mdash; not pilots.
        </p>

        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-prev"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous testimonial"
          >
            <svg
              className="testimonials-arrow-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="testimonials-track" ref={trackRef}>
            {TESTIMONIALS.map((t) => (
              <figure className="testimonial-card" key={t.name}>
                <div className="testimonial-mark" aria-hidden="true">&ldquo;</div>
                <blockquote className="testimonial-quote">{t.quote}</blockquote>
                <figcaption className="testimonial-meta">
                  <span className="testimonial-avatar">{t.initial}</span>
                  <span className="testimonial-meta-text">
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-next"
            onClick={() => scrollByCard(1)}
            aria-label="Next testimonial"
          >
            <svg
              className="testimonials-arrow-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
