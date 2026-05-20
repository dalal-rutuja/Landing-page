import { TRUST } from "./content"

export default function TrustSection() {
  return (
    <section id="trust" className="trust-section">
      <div className="container">
        <div className="section-eyebrow">Why JuriNex is different</div>
        <h2 className="section-title">
          Built for Indian courts. 
        </h2>
        {/* <p className="section-lead">
          Most legal AI was designed for American and European law firms, then translated.
          JuriNex was designed for the High Court of Bombay from day one &mdash; and it shows.
        </p> */}

        <div className="trust-grid">
          {TRUST.map((t) => (
            <div className="trust-card" key={t.title}>
              <div className="trust-icon">{t.icon}</div>
              <div className="trust-title">{t.title}</div>
              <div className="trust-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
