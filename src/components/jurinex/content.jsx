// Static content for the JuriNex landing page — kept separate from markup.

export const SIDEBAR_ICONS = {
  dashboard: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  brief: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  vault: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  chat: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  draft: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  ),
  newcase: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  storage: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  profile: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  billing: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  settings: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
  support: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  help: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  logout: (
    <svg className="preview-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
}

export const SIDEBAR_ITEMS = [
  { key: "dashboard", label: "Dashboard", active: true },
  { key: "brief", label: "Brief" },
  { key: "vault", label: "Vault" },
  { key: "chat", label: "Chat" },
  { key: "draft", label: "AI Drafting" },
]

// Expanded sidebar (top group) used by slides 2 & 3
export const SIDEBAR_ITEMS_FULL_TOP = [
  { key: "dashboard", label: "Dashboard" },
  { key: "newcase", label: "Create New Case" },
  { key: "storage", label: "Case Storage" },
  { key: "chat", label: "Chat" },
  { key: "draft", label: "AI Drafting" },
]

export const SIDEBAR_ITEMS_FULL_BOTTOM = [
  { key: "profile", label: "Profile" },
  { key: "billing", label: "Billing" },
  { key: "settings", label: "Settings" },
  { key: "support", label: "Get Support" },
  { key: "help", label: "Help" },
  { key: "logout", label: "Logout" },
]

export const CASES = [
  { title: "Ramesh Patel Vs Union of India", no: "11296 OF 2019", court: "HC Bombay – Aurangabad" },
  { title: "Anil Kumar Sharma Vs State of Maharashtra", no: "Test 001", court: "Supreme Court – Criminal" },
  { title: "M/s. Premier Tours and Travels", no: "28045 OF 2024", court: "HC Bombay – Aurangabad" },
]

// Slide 2 / 3 single demo case row (dummy)
export const DEMO_CASE_DETAIL = {
  title: "Aditya Industries Pvt Ltd Vs Sanjay Sharma",
  no: "OF 2025",
  court: "High Court of Bombay - Aurangabad",
  type: "WRIT JURISDICTION / Writ Petition (Civil)",
  advocate: "Unassigned",
  hearing: "Never",
  status: "Active",
  docs: 1,
  updated: "06-05-2026",
}

// Slide 3 — stat cards
export const BRIEF_STATS = [
  { label: "Total Active Cases", value: "1" },
  { label: "Cases Pending Review", value: "0" },
  { label: "Upcoming Hearings (Next 7 Days)", value: "0" },
  { label: "Documents Uploaded This Month", value: "1" },
  { label: "Today's Hearings", value: "0" },
]

// Slide 2 — quick action chips below the table
export const QUICK_ACTIONS = [
  "Case Summary",
  "List of Dates & Events",
  "Case Gist",
  "Grounds",
  "Basic Drafting assistant",
  "Hearing Preparation",
  "Generate a Brief",
  "Client Brief",
  "Statute & Section Finder",
]

// Case Storage slide — folder card data (dummy)
export const STORAGE_FOLDERS = [
  { title: "Aditya Industries Pvt Ltd Vs Sanjay Sh…", meta: "1 item · 05/06/2026", status: "ACTIVE" },
]

// Chat slide — chronological timeline rows (dummy)
export const CHAT_TIMELINE = [
  { sno: "1.", date: "2021 [Year only]", nature: "Legal/Procedural", parties: "Plaintiff (as Plaintiff)", place: "District Court, Pune", conf: "[HC]" },
  { sno: "2.", date: "2024 [Year only]", nature: "Legal/Procedural", parties: "Aditya Industries Ltd (Plaintiff)", place: "Commercial Court, Latur", conf: "[HC]" },
  { sno: "3.", date: "Before 28-Jan-2025", nature: "Legal/Procedural", parties: "Aditya Industries Ltd (Defendant)", place: "District Court, Pune", conf: "[MC]" },
  { sno: "4.", date: "Before 12-Feb-2025", nature: "Legal/Procedural", parties: "Sanjay Sharma (Defendant)", place: "Commercial Court, Latur", conf: "[MC]" },
]

// AI Drafting slide — template tiles + draft cards (dummy)
export const DRAFT_TEMPLATES = [
  { title: "Custom template", custom: true },
  { title: "Lease Deed" },
  { title: "Partition Deed" },
  { title: "Non Compete" },
  { title: "Writ – Certiorari" },
  { title: "NDA" },
  { title: "Mortgage Deed" },
]

export const RECENT_DRAFTS = [
  { title: "Recovery of Money – Sahyad…", date: "Apr 24, 2026" },
  { title: "Recovery of Money – Legal_…", date: "Apr 24, 2026" },
  { title: "Suit for partition (By Will)", date: "Apr 21, 2026" },
  { title: "Lease Deed – Supporting_1", date: "Apr 20, 2026" },
  { title: "Lease Deed – Lease Deed", date: "Apr 20, 2026" },
]

export const STRIP_STATS = [
  { num: "5,00,000+", label: "Pages Processed" },
  // { num: "7,000+", label: "AI Requests Processed" },
  { num: "95%", label: "Accuracy" },
  { num: "100%", label: "Data Residency in India" },
]

export const AUDIENCES = [
  { icon: "I", title: "Solo Practitioners", desc: "3 seats" },
  { icon: "II", title: "Small Law Firms", desc: "4 to 10 seats" },
  { icon: "III", title: "Large Law Firms and Enterprises", desc: "11 and above seats" },
]

export const WORKFLOW = [
  { step: "01 · UNDERSTAND", title: "Upload case documents.", desc: "Scanned FIRs, bulky case files, judgments, affidavits. OCR extracts the text, RAG indexes it for semantic search, chronology builds automatically.", meta: "Up to 1,050 pages · 50MB per file" },
  { step: "02 · CONVERSE & SUMMARIZE", title: "Ask anything about the case", desc: "Ask questions in plain English across an entire case folder. Surface prior statements, cross-reference dates, and pull key testimony in seconds.", meta: "8 preset prompts · Custom queries · All answered" },
  { step: "03 · DRAFT", title: "Generate court-ready documents.", desc: "Bail applications, petitions, writs, agreements. Upload your own templates or use our library. Formatted for the bench you're filing in.", meta: "10-agent drafting pipeline" },
  { step: "04 · RESEARCH & CITATION", title: "Every citation, verified and reference displayed.", desc: "Court approved format citations verified against source databases. Zero-hallucination policy — if the system isn't confident, it flags rather than invents.", meta: "100% verification target" },
  { step: "05 · STORAGE & CASE LIFECYCLE", title: "Every matter, end to end.", desc: "Encrypted vault storage with full-text search. Track each case from filing through hearings to disposal, with deadlines, status, and a clean archive when it closes.", meta: "Filing → Hearing → Disposal · Encrypted vault" },
]

export const TRUST = [
  { icon: "भा", title: "Supports Indian Languages.", desc: (<><strong>English, Marathi, Hindi, Tamil and Telugu etc</strong> — The system is capable of generating reports in most of the widely spoken Indian languages.</>) },
  { icon: "§", title: "Built for Indian court hierarchy.", desc: (<>Drafts in formats suitable for District Courts, High Courts, Supreme Court as well as tribunals.</>) },
  { icon: "✓", title: "Zero hallucination policy.", desc: (<>The system seeks information only from approved authentic sources, multiple checks for accuracy across every response.</>) },
  { icon: "🇮🇳", title: "Data sensitivity and security.", desc: (<>All data storage infrastructure in India. <strong>DPDPA compliant,</strong> No cross-border transfer of data. ever. End to End Encryption protection for all the data processed.</>) },
]

export const HOW = [
  { num: "I.", title: "Create your account", desc: "Sign up in under two minutes. Add your Bar Council registration, choose your practice areas, and invite your team with role-based access." },
  { num: "II.", title: "Upload your case", desc: "Add documents — FIRs, judgments, contracts, affidavits. OCR scanning, Indexing and Chronology happens automatically." },
  { num: "III.", title: "Chat, draft, cite, edit, collaborate", desc: "Ask questions. Generate drafts. Verify citations. Share with your team. The work that took hours now take minutes." },
]

const PRICING_FEATURES = [
  "Chat & Assistance",
  "Case Management",
  "Document Vault",
  "AI Drafting",
  "Citation",
  "Branding & Output",
  "Multi Languages",
  "Role based User management",
  "DPDPA compliant",
  "In-app ticket system",
]

export const PRICING = [
  {
    tier: "Solo practitioner",
    users: "(for 3 seats)",
    badge: "Limited time offer",
    original: "₹5,999",
    now: "₹3,999",
    period: "/per month",
    features: PRICING_FEATURES,
    cta: "Start Free Trial",
    ctaClass: "btn-ghost",
  },
  {
    tier: "Small law firm",
    users: "(for 4 to 10 seats)",
    now: "₹9,999",
    period: "/per month",
    features: PRICING_FEATURES,
    cta: "Start Free Trial",
    ctaClass: "btn-ghost",
  },
  {
    tier: "Large law firms and enterprises",
    now: "Plan",
    users: "tailored to your firm",
    features: PRICING_FEATURES,
    cta: "Start Free Trial",
    ctaClass: "btn-ghost",
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "\"As in-house counsel, I run a high volume of litigation at once, each matter with its own record and timeline. The challenge is holding all of it clearly in view. Jurinex helps me do that - it summarizes voluminous matters quickly and accurately, surfaces relevant citations, and cuts drafting time sharply. That lets me focus where in-house counsel adds real value: assessing exposure and advising the business, rather than getting buried in paperwork. For a lean corporate legal team, that efficiency is real.\"",
    attribution: "— Adv. Aashish Manglani, Corporate Legal Team, Mahyco Seeds",
    name: "Adv. Aashish Manglani",
  },
  {
    quote:
      "\"Our work demands precision — the margin for error is thin. I'd always wondered how accurate AI could really be in the legal domain, and Jurinex has proved me wrong. I was working with it properly within hours, no training needed. The responses are sharp and save real time, and the combination of ease and effectiveness is the best part. Drafting that once took hours now takes thirty minutes — time I can put back into case strategy with my clients and into court appearances. For a lawyer, time is the one resource you can't recover. Jurinex gives it back.\"",
    attribution: "— Adv. Shailesh Chapalgaonkar, High Court, Chhatrapati Sambhajinagar",
    name: "Adv. Shailesh Chapalgaonkar",
  },
  {
    quote:
      "\"As a junior, the hardest part is the volume — reading long matters, pulling out what counts, and getting the dates and timelines exactly right before I brief senior counsel. There's no room to be vague. Jurinex's summarization changed that: I get to the core of a matter fast and accurately, with the chronology laid out clearly, so my briefs are tighter and I walk in confident they're right. It's made me better at my job, and the seniors have noticed.\"",
    attribution: "— Adv. Prathamesh Borde, Associate, Chamber of Adv. Shailesh Chapalgaonkar",
    name: "Adv. Prathamesh Borde",
  },
  {
    quote:
      "\"Our chamber practises heavily before the DRT, NCLT and in civil suits - dense matters that move fast. As a junior, the moment that tested me most was a client walking in when senior counsel wasn't around. Jurinex changed that. It helps me grasp a matter well enough to explain exactly where it stands, what comes next, and its real strengths and weak points - clearly, and without the client having to wait for the senior. They walk away with clarity straight away. For a junior in a busy chamber, that has been invaluable.\"",
    attribution:
      "— Adv. Akshay Kulkarni, Associate, Chamber of Adv. Yadkikar, Chhatrapati Sambhajinagar",
    name: "Adv. Akshay Kulkarni",
  },
]

export const TEAM = [
  {
    initial: "S",
    name: "Santosh Dehadrai",
    line1: "Founder,",
    line2: "CTO  & Principle Architect",
  },
  {
    initial: "S",
    name: "Saurabh Bhogale",
    line1: "Co Founder",
    line2: "Executive Director & Project Coordinator",
  },
  {
    initial: "A",
    name: "Adv. Amit yadkikar",
    line1: "Legal Expert",
    line2: "Chh. Sambhajinagar High Court",
  },
  {
    initial: "A",
    name: "Adv. Amar Damodar Soman",
    line1: "Legal Expert",
    line2: "Chh. Sambhajinagar High Court",
  },
  {
    initial: "A",
    name: "Adv. Anoop Patil",
    line1: "Legal Expert",
    line2: "Chh. Sambhajinagar High Court",
  },
]

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/jurinex", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Instagram", href: "https://www.instagram.com/jurinex.ai", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: "Facebook", href: "https://www.facebook.com/jurinex", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "X (Twitter)", href: "https://twitter.com/jurinex_ai", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Pinterest", href: "https://pinterest.com/jurinex", path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.378l-.75 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z" },
]
