import { TEAM } from "./content"

export default function TeamSection() {
  return (
    <section id="team">
      <div className="container">
        <div className="section-eyebrow">The team behind JuriNex</div>
        <h2 className="section-title">
          Engineers and lawyers, <em>building together</em>.
        </h2>
        <p className="section-lead">
          JuriNex is built in Chhatrapati Sambhajinagar by NexIntel AI Pvt Ltd &mdash; a team
          that combines deep AI engineering with real legal practice.
        </p>

        <div className="team-grid">
          {TEAM.map((m) => (
            <div className="team-card" key={m.name}>
              <div className="team-photo">
                <div className="team-photo-initial">{m.initial}</div>
                <div className="team-photo-label">{m.label}</div>
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <div className="team-bio">{m.bio}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
