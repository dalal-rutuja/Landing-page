import { PRICING } from "./content"

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        {/* <div className="section-eyebrow">Founding member pricing</div> */}
        <h2 className="section-title">Subcription plans</h2>
        <p className="section-lead">
          Start your 3-day free trial now !
        </p>

        <div className="pricing-grid">
          {PRICING.map((p) => (
            <div className="price-card" key={p.tier}>
              {p.badge && <div className="price-badge">{p.badge}</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-amount">
                {p.original && <span className="price-original">{p.original}</span>}
                <span className="price-now">{p.now}</span>
                <span className="price-period">{p.period}</span>
              </div>
              {p.users && <div className="price-users">{p.users}</div>}
              <ul className="price-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href={`mailto:hello@jurinex.ai?subject=${encodeURIComponent(`JuriNex — ${p.tier}: ${p.cta}`)}`}
                className={`btn ${p.ctaClass} price-cta`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
