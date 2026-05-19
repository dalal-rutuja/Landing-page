import { PRICING } from "./content"

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="section-eyebrow">Founding member pricing</div>
        <h2 className="section-title">
          Honest pricing, <em>in rupees</em>.
        </h2>
        <p className="section-lead">
          No dollar conversions. No hidden tiers. 14-day free trial for every plan.
        </p>

        <div className="pricing-notice">
          <span>{"⚡"}</span>
          <div>
            <strong>First 50 signups only:</strong> Founding Member pricing is locked for life.
            Available until public launch in May 2026.
          </div>
        </div>

        <div className="pricing-grid">
          {PRICING.map((p) => (
            <div className={`price-card${p.highlight ? " highlight" : ""}`} key={p.tier}>
              {p.badge && <div className="price-badge">{p.badge}</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-amount">
                {p.original && <span className="price-original">{p.original}</span>}
                <span className="price-now">{p.now}</span>
              </div>
              <div className="price-period">{p.period}</div>
              <ul className="price-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#demo" className={`btn ${p.ctaClass} price-cta`}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
