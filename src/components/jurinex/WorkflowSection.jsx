import { WORKFLOW } from "./content"

export default function WorkflowSection() {
  return (
    <section id="product" className="workflow-section">
      <div className="container">
        <div className="section-eyebrow">The JuriNex workflow</div>
        <h2 className="section-title">
          Five moments of value in <em>every case</em>.
        </h2>
        <p className="section-lead">
          JuriNex isn't eleven scattered features. It's one connected workflow &mdash; capture,
          converse, draft, verify &mdash; that handles the mechanical work so you can focus on
          strategy.
        </p>

        <div className="workflow-grid">
          {WORKFLOW.map((w) => (
            <div className="workflow-card" key={w.step}>
              <div className="workflow-step">{w.step}</div>
              <div className="workflow-title">{w.title}</div>
              <div className="workflow-desc">{w.desc}</div>
              <div className="workflow-meta">{w.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
