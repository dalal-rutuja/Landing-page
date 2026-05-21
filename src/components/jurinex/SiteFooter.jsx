import SocialStrip from "./SocialStrip"
import gravalIcon from "../../assets/graval.png"

const LEGAL_LINKS = [
  { label: "Terms of Services", href: "https://drive.google.com/open?id=1BTXf-YUiOjQiJmdwM9QS0GCgbGUXRBOO&usp=drive_copy" },
  { label: "Master Service Agreement", href: "https://drive.google.com/open?id=1iUYu1fDiqp95_GV16G8w_Su-EIgBg4aT&usp=drive_copy" },
  { label: "DPA", href: "https://drive.google.com/open?id=1MEYVdK5NtlqkhlhPrCi_q4o6zCvsyBTP&usp=drive_copy" },
  { label: "Privacy Policy", href: "https://drive.google.com/open?id=10RKK0Eh7ybm0mRNpbsDx4ecMs5ymedWa&usp=drive_copy" },
  { label: "Data Security Policy", href: "https://drive.google.com/open?id=1X0qE1gpz-oVfy9qfL7UdIhcoLezhIEeZ&usp=drive_copy" },
  { label: "Disclosures", href: "https://drive.google.com/open?id=11oc-dhaFbjhPtraRuYucjfOtnE5WqQj4&usp=drive_copy" },
  { label: "Cookie Policy", href: "https://drive.google.com/open?id=1iKeGRa0w86ERuGJLYRSaAFnw7H1fYeNS&usp=drive_copy" },
  { label: "Refund Policy", href: "https://drive.google.com/open?id=1ryZoxjk55ESOU4QaSximCarJe2236DAC&usp=drive_copy" },
]

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-col">
            <a href="#" className="logo" aria-label="JuriNex">
              <img src={gravalIcon} alt="" className="logo-mark-img" />
              <span className="brandmark">
                Jurinex<sup>™</sup>
              </span>
            </a>
            <p className="footer-brand-desc">
              Enterprise grade legal operating system
              <br />
              for Professionals
              <br />
              for powered by AI
            </p>
            <div className="footer-address">
              <div className="footer-address-line"><strong>NexIntel AI Pvt Ltd</strong></div>
              <div className="footer-address-line">B11, Near Railway Station Road, MIDC</div>
              <div className="footer-address-line">
                Chhatrapati Sambhajinagar, Maharashtra 431010
              </div>
              <a href="mailto:hello@jurinex.ai" className="footer-address-email">
                connect@jurinex.ai
              </a>
            </div>
            <SocialStrip label="Follow" />
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <ul>
              <li><a href="#product">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li>
                <a href="mailto:connect@jurinex.ai?subject=Demo%20request">Request Demo</a>
              </li>
              <li><a href="#login">Login</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <ul>
              <li><a href="#team">Team</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <ul>
              {LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-compliance">
          <div className="footer-compliance-row">
            <span>
              <span className="footer-compliance-label">CIN:</span>{" "}
              <span className="footer-compliance-value">U62010MH2025PTC448297</span>
            </span>
            <span>
              <span className="footer-compliance-label">GSTIN:</span>{" "}
              <span className="footer-compliance-value">27AAKCN4811B1ZQ</span>
            </span>
            <span>
              <span className="footer-compliance-label">Registered Office:</span>{" "}
              <span className="footer-compliance-value">
                Chhatrapati Sambhajinagar, Maharashtra 431005
              </span>
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2026 NexIntel AI Pvt Ltd. Incorporated under the Companies Act, 2013.
          </div>
         
        </div>
      </div>
    </footer>
  )
}
