import SocialStrip from "./SocialStrip"

export default function FinalCTASection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Form connected in production. Thank you!")
  }

  return (
    <section id="demo" className="final-cta-section">
      <div className="final-cta-inner">
        <div className="final-cta-eyebrow">Launching May 2026 &middot; Founding spots closing</div>
        <h2 className="final-cta-title">
          Be among the <em>first 50 firms</em> using JuriNex.
        </h2>
        <p className="final-cta-sub">
          Request a demo and Chaitrali &mdash; a practicing advocate on our team &mdash; will
          walk you through JuriNex on a real case of yours. 45 minutes. No pressure. Founding
          pricing locked for life if you sign up.
        </p>

        <form className="final-cta-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="final-cta-input"
            placeholder="your@lawfirm.com"
            required
          />
          <button type="submit" className="btn btn-primary btn-lg btn-arrow">
            Request Demo
          </button>
        </form>
        <div className="final-cta-note">
          We'll reach out within 24 hours. No spam. No sales pressure.
        </div>

        <div className="final-cta-waitlist" id="waitlist">
          <div className="final-cta-waitlist-item">
            <span className="final-cta-waitlist-num">15</span> in active beta
          </div>
          <div className="final-cta-waitlist-item">
            <span className="final-cta-waitlist-num">35</span> founding spots remaining
          </div>
          <div className="final-cta-waitlist-item">
            <span className="final-cta-waitlist-num">14-day</span> free trial, no card required
          </div>
        </div>

        <SocialStrip label="Follow the journey" dark centered />
      </div>
    </section>
  )
}
