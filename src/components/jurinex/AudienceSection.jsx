import { AUDIENCES } from "./content"

export default function AudienceSection() {
  return (
    <section id="audience">
      <div className="container">
        <div className="section-eyebrow">Built for every kind of legal practice</div>
        <h2 className="section-title">
          Whether you're a <em>solo advocate</em> or a <em>corporate legal team</em> &mdash;
          Jurinex is the solution.
        </h2>

        <div className="audience-grid">
          {AUDIENCES.map((a) => (
            <div className="audience-card" key={a.title}>
              <div className="audience-icon">{a.icon}</div>
              <div className="audience-title">{a.title}</div>
              <div className="audience-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
