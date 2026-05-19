export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="logo">
          <img src="/jurinex-logo.png" alt="JuriNex" className="nav-logo-img" />
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
