export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="logo" aria-label="JuriNex">
          <img src="/jurinex-mark.png" alt="" className="logo-mark-img" />
          <span className="brandmark">
            Jurinex<sup>™</sup>
          </span>
        </a>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#trust">Why JuriNex</a>
          <a href="#pricing">Pricing</a>
          <a href="#team">Team</a>
        </div>
        <div className="nav-cta">
          <a href="#login" className="btn btn-ghost">Login</a>
          <a href="#demo" className="btn btn-primary">Start 3 days free trial</a>
        </div>
      </div>
    </nav>
  )
}
