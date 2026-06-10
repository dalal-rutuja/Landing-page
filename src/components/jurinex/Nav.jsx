import { useEffect, useState } from "react"
import gravalIcon from "../../assets/graval.png"

const NAV_LINKS = [
  { id: "product", label: "Product" },
  { id: "trust", label: "Why JuriNex" },
  { id: "pricing", label: "Pricing" },
  { id: "team", label: "Team" },
]

export default function Nav() {
  const [active, setActive] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
      Boolean
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`nav${open ? " is-open" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="logo" aria-label="JuriNex">
          <img src={gravalIcon} alt="" className="logo-mark-img" />
          <span className="brandmark">
            Jurinex<sup>™</sup>
          </span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <div className="nav-menu">
          <div className="nav-links">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-cta">
            <a href="#login" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Login
            </a>
            <a
              href="#pricing"
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              Start 3 days free trial
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
