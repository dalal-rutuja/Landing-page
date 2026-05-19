// JuriNex landing page — composition root. Each section lives in its own file
// under src/components/jurinex/, styled by the shared, .jx-scoped stylesheet.
import "../components/jurinex/jurinex.css"
import Nav from "../components/jurinex/Nav"
import Hero from "../components/jurinex/Hero"
import CredibilityStrip from "../components/jurinex/CredibilityStrip"
import AudienceSection from "../components/jurinex/AudienceSection"
import WorkflowSection from "../components/jurinex/WorkflowSection"
import TrustSection from "../components/jurinex/TrustSection"
import HowSection from "../components/jurinex/HowSection"
import PricingSection from "../components/jurinex/PricingSection"
import TeamSection from "../components/jurinex/TeamSection"
import MentorSection from "../components/jurinex/MentorSection"
import FinalCTASection from "../components/jurinex/FinalCTASection"
import SiteFooter from "../components/jurinex/SiteFooter"
import Chatbot from "../components/jurinex/chatbot/Chatbot"

export default function JuriNexLanding() {
  return (
    <div className="jx">
      <Nav />
      <Hero />
      <CredibilityStrip />
      <AudienceSection />
      <WorkflowSection />
      <TrustSection />
      <HowSection />
      <PricingSection />
      <TeamSection />
      <MentorSection />
      <FinalCTASection />
      <SiteFooter />
      <Chatbot />
    </div>
  )
}
