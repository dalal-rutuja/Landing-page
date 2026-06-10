import { useEffect, useMemo, useState } from "react"
import { TESTIMONIALS } from "./content"

const TRANSITION_MS = 650
const AUTO_SCROLL_MS = 5000

export default function TestimonialsSection() {
  const [index, setIndex] = useState(1)
  const [animate, setAnimate] = useState(true)

  const slides = useMemo(() => {
    if (!TESTIMONIALS.length) return []
    const first = TESTIMONIALS[0]
    const last = TESTIMONIALS[TESTIMONIALS.length - 1]
    return [last, ...TESTIMONIALS, first]
  }, [])

  const showCount = TESTIMONIALS.length

  const goToNext = () => {
    setAnimate(true)
    setIndex((prev) => prev + 1)
  }

  const goToPrev = () => {
    setAnimate(true)
    setIndex((prev) => prev - 1)
  }

  useEffect(() => {
    if (showCount <= 1) return
    const id = setInterval(goToNext, AUTO_SCROLL_MS)
    return () => clearInterval(id)
  }, [showCount, index])

  useEffect(() => {
    if (showCount <= 1) return
    if (index > showCount) {
      const t = setTimeout(() => {
        setAnimate(false)
        setIndex(1)
      }, TRANSITION_MS)
      return () => clearTimeout(t)
    }
    if (index < 1) {
      const t = setTimeout(() => {
        setAnimate(false)
        setIndex(showCount)
      }, TRANSITION_MS)
      return () => clearTimeout(t)
    }
  }, [index, showCount])

  useEffect(() => {
    if (index < 0 || index > slides.length - 1) {
      setAnimate(false)
      setIndex(1)
    }
  }, [index, slides.length])

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true))
      )
      return () => cancelAnimationFrame(id)
    }
  }, [animate])

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-eyebrow">Voices from the bench &amp; bar</div>
        <h2 className="section-title">What our users are saying.</h2>

        <div className="testimonials-carousel">
          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-prev"
            onClick={goToPrev}
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

          <div className="testimonials-track">
            <div
              className="testimonials-track-inner"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transitionDuration: animate ? `${TRANSITION_MS}ms` : "0ms",
              }}
            >
              {slides.map((t, idx) => (
                <figure className="testimonial-card" key={`${t.name}-${idx}`}>
                  <div className="testimonial-person">
                    <span className="testimonial-avatar" aria-hidden="true">
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} />
                      ) : (
                        <span className="testimonial-avatar-initial">
                          {t.name.replace(/^Adv\.\s*/, "").charAt(0)}
                        </span>
                      )}
                    </span>
                    <figcaption className="testimonial-attribution">
                      <span className="testimonial-name">{t.name}</span>
                      {t.role && <span className="testimonial-role">{t.role}</span>}
                    </figcaption>
                  </div>
                  <div className="testimonial-body">
                    {t.tag && (
                      <div className="testimonial-tag">
                        <svg
                          className="testimonial-tag-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 3v18" />
                          <path d="M5 7h14" />
                          <path d="M7 7 4 14h6L7 7Z" />
                          <path d="M17 7l-3 7h6l-3-7Z" />
                          <path d="M8 21h8" />
                        </svg>
                        {t.tag}
                      </div>
                    )}
                    <blockquote className="testimonial-quote">{t.quote}</blockquote>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-next"
            onClick={goToNext}
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

        <div className="testimonials-dots" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((t, i) => {
            const active = ((index - 1) % showCount + showCount) % showCount === i
            return (
              <button
                type="button"
                key={t.name}
                className={`testimonials-dot${active ? " is-active" : ""}`}
                onClick={() => {
                  setAnimate(true)
                  setIndex(i + 1)
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-selected={active}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
