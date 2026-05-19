import { SIDEBAR_ITEMS, SIDEBAR_ICONS, CASES } from "./content"

export default function Hero() {
  return (
    <section className="hero">
      {/* <div className="hero-eyebrow">Built for Indian Legal Professionals &middot; Launching May 2026</div> */}

      <h1 className="hero-headline">
        <span className="hero-headline-left hero-headline-nowrap">AI powered operating system</span>
        <em className="hero-headline-left">for Legal Professionals</em>
      </h1>

      <p className="hero-sub">
        Work faster, practice smarter with the power of AI. JuriNex automates document
        processing, case research, and legal drafting &mdash; purpose-built for Indian courts,
        in Multilingual .
      </p>

      <div className="hero-cta">
        <a href="#demo" className="btn btn-primary btn-lg btn-arrow">Start 3 days free trial</a>
        {/* <a href="#waitlist" className="btn btn-ghost btn-lg">Join the Waitlist</a> */}
      </div>

      <div className="hero-credential">
        <span className="dot" />
        Developed, tried and tested by experienced lawyers 
      </div>

      <div className="hero-preview">
        <div className="hero-preview-chrome">
          <div className="chrome-dot" />
          <div className="chrome-dot" />
          <div className="chrome-dot" />
          <div className="chrome-url">jurinex.ai/#/dashboard</div>
        </div>
        <div className="hero-preview-body">
          <div className="preview-sidebar">
            <div className="preview-sidebar-logo">
              <div className="preview-sidebar-logo-mark">JN</div>
              <span className="preview-sidebar-logo-text">JuriNex</span>
            </div>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.key}
                className={`preview-sidebar-item${item.active ? " active" : ""}`}
              >
                {SIDEBAR_ICONS[item.key]}
                {item.label}
              </div>
            ))}
          </div>
          <div className="preview-main">
            <div className="preview-main-header">Hello, Adv. Rajesh Kumar</div>
            <div className="preview-tabs">
              <div className="preview-tab active">Ongoing (19)</div>
              <div className="preview-tab">Pending</div>
              <div className="preview-tab">Disposed</div>
              <div className="preview-tab">Draft (13)</div>
            </div>
            <div className="preview-table">
              <div className="preview-row preview-row-header">
                <div>Title</div>
                <div>Case No.</div>
                <div>Court / Bench</div>
                <div>Status</div>
              </div>
              {CASES.map((c) => (
                <div className="preview-row" key={c.no}>
                  <div>{c.title}</div>
                  <div>{c.no}</div>
                  <div>{c.court}</div>
                  <div><span className="preview-badge">Active</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
