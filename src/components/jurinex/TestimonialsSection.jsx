import { useEffect, useMemo, useState } from "react"
import { TESTIMONIALS } from "./content"

const AUTO_SCROLL_MS = 4500
const TRANSITION_MS = 650

export default function TestimonialsSection() {
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
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
    if (paused || hidden || showCount <= 1) return
    const id = setInterval(() => goToNext(), AUTO_SCROLL_MS)
    return () => clearInterval(id)
  }, [paused, hidden, showCount])

  useEffect(() => {
    const onVisibilityChange = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

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
              {slides.map((t, idx) =>
                t.cardImage ? (
                  <figure
                    className="testimonial-card testimonial-card-image"
                    key={`${t.name}-${idx}`}
                  >
                    <img src={t.photo} alt={t.name} />
                  </figure>
                ) : (
                  <figure className="testimonial-card" key={`${t.name}-${idx}`}>
                    <div className="testimonial-photo" aria-hidden="true">
                      {t.photo && <img src={t.photo} alt={t.name} />}
                    </div>
                    <div className="testimonial-body">
                      <blockquote className="testimonial-quote">{t.quote}</blockquote>
                      <figcaption className="testimonial-attribution">
                        {t.attribution}
                      </figcaption>
                    </div>
                  </figure>
                )
              )}
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
      </div>
    </section>
  )
}
