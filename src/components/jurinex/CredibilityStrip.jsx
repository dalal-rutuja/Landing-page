import { STRIP_STATS } from "./content"

export default function CredibilityStrip() {
  return (
    <div className="strip">
      <div className="strip-inner">
        {STRIP_STATS.map((s) => (
          <div className="strip-item" key={s.label}>
            <div className="strip-num">{s.num}</div>
            <div className="strip-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
