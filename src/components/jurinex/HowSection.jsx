import { HOW } from "./content"

export default function HowSection() {
  return (
    <section id="how">
      <div className="container">
        <div className="section-eyebrow">Getting started</div>
        <h2 className="section-title">
          Three steps to <em>your first drafted petition</em>.
        </h2>

        <div className="how-grid">
          {HOW.map((h) => (
            <div className="how-card" key={h.num}>
              <div className="how-number">{h.num}</div>
              <div className="how-title">{h.title}</div>
              <div className="how-desc">{h.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
