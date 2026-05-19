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
}

export const SIDEBAR_ITEMS = [
  { key: "dashboard", label: "Dashboard", active: true },
  { key: "brief", label: "Brief" },
  { key: "vault", label: "Vault" },
  { key: "chat", label: "Chat" },
  { key: "draft", label: "AI Drafting" },
]

export const CASES = [
  { title: "Kisan S/o Bansi Salampure Vs Union of India", no: "11296 OF 2019", court: "HC Bombay – Aurangabad" },
  { title: "Rahul Bhikulal Kasat Vs State of Maharashtra", no: "Test 001", court: "Supreme Court – Criminal" },
  { title: "M/s. K.S. Tondare Tours and Travels", no: "28045 OF 2024", court: "HC Bombay – Aurangabad" },
]

export const STRIP_STATS = [
  { num: "20,000+", label: "Pages Processed" },
  // { num: "7,000+", label: "AI Requests Processed" },
  { num: "95%", label: "Accuracy" },
  { num: "100%", label: "Data Residency in India" },
]

export const AUDIENCES = [
  { icon: "I", title: "Solo Practitioners", desc: "District court advocates and individual consultants handling their own drafting, research, and case files." },
  { icon: "II", title: "Small Law Firms", desc: "2–15 lawyer practices needing shared vaults, multi-user access, and team collaboration." },
  { icon: "III", title: "Mid-Size Firms", desc: "15–50 lawyers needing granular permissions, white-label output, and practice analytics." },
  { icon: "IV", title: "Corporate Legal", desc: "In-house teams managing bulk contracts, compliance workflows, and matter tracking at scale." },
  { icon: "V", title: "Senior Advocates", desc: "High Court and Supreme Court practitioners demanding citation accuracy and fast research." },
]

export const WORKFLOW = [
  { step: "01 · UNDERSTAND", title: "Upload anything.", desc: "Scanned FIRs, bulky case files, judgments, affidavits. OCR extracts the text, RAG indexes it for semantic search, chronology builds automatically.", meta: "Up to 1,050 pages · 50MB per file" },
  { step: "02 · CONVERSE & SUMMARIZE", title: "Ask your case anything.", desc: "Natural language queries across every document in a case folder. Find prior statements, cross-reference dates, locate key testimony in seconds.", meta: "8 preset prompts · Custom queries" },
  { step: "03 · DRAFT", title: "Generate court-ready documents.", desc: "Bail applications, petitions, writs, agreements. Upload your own templates or use our library. Formatted for the bench you're filing in.", meta: "9-agent drafting pipeline" },
  { step: "04 · RESEARCH & CITATION", title: "Every citation, verified and reference displayed.", desc: "AIR-format citations verified against source databases. Zero-hallucination policy — if the system isn't confident, it flags rather than invents.", meta: "100% verification target" },
  { step: "05 · STORAGE & CASE LIFECYCLE", title: "Every matter, end to end.", desc: "Encrypted vault storage with full-text search. Track each case from filing through hearings to disposal, with deadlines, status, and a clean archive when it closes.", meta: "Filing → Hearing → Disposal · Encrypted vault" },
]

export const TRUST = [
  { icon: "भा", title: "Vernacular, natively.", desc: (<><strong>English, Hindi, Marathi</strong> — not machine-translated. OCR reads Devanagari. Drafting generates in the language the filing demands.</>) },
  { icon: "§", title: "Indian court hierarchy, built in.", desc: (<>Supreme Court, High Courts, District Courts, and Tribunals are <strong>first-class citizens</strong> in our case classification — not afterthoughts.</>) },
  { icon: "✓", title: "Zero hallucination policy.", desc: (<>AI output that fails citation verification gets flagged, not published. <strong>Three or more triggers halt a response.</strong> No exceptions.</>) },
  { icon: "🇮🇳", title: "Your data stays in India.", desc: (<>All infrastructure runs in GCP Mumbai (asia-south1). <strong>DPDPA 2023 compliant.</strong> No cross-border transfer. Ever.</>) },
  { icon: "₹", title: "UPI-first billing.", desc: (<>Pay by UPI, card, or net banking via Razorpay. <strong>GST-compliant invoices</strong> auto-generated. No international credit card required.</>) },
  { icon: "A", title: "AIR-format citations.", desc: (<>All India Reporter format, validated against source databases. Your court filings look the way your bench expects — <strong>not like a US brief.</strong></>) },
]

export const HOW = [
  { num: "I.", title: "Create your account", desc: "Sign up in under two minutes. Add your Bar Council registration, choose your practice areas, and invite your team with role-based access." },
  { num: "II.", title: "Upload your case", desc: "Add any documents — FIRs, judgments, contracts, affidavits. OCR handles the scanning. Indexing and chronology happen automatically." },
  { num: "III.", title: "Chat, draft, cite, edit, collaborate", desc: "Ask questions. Generate drafts. Verify citations. Share with your team. The work that took two hours now takes minutes." },
]

export const PRICING = [
  {
    tier: "Basic",
    original: "₹2,499",
    now: "₹1,499",
    period: "per month · billed monthly",
    features: [
      "Desktop Chat with document upload",
      "Case folder with OCR + RAG",
      "Vault storage with search",
      "Basic drafting templates",
      "English + Hindi + Marathi",
      "Up to 1 user",
    ],
    cta: "Start Free Trial",
    ctaClass: "btn-ghost",
  },
  {
    tier: "Professional",
    original: "₹4,999",
    now: "₹3,999",
    period: "per month · billed monthly",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Basic",
      "9-agent AI Drafting pipeline",
      "Premium drafting templates",
      "Citation verification (AIR format)",
      "Teams with RBAC — up to 5 users",
      "Custom branding on outputs",
      "Priority support",
    ],
    cta: "Start Free Trial",
    ctaClass: "btn-primary",
  },
  {
    tier: "Enterprise",
    now: "Custom",
    period: "tailored to your firm",
    features: [
      "Everything in Professional",
      "Unlimited users",
      "SSO + audit trails",
      "White-label outputs",
      "Dedicated success manager",
      "Custom AI model routing",
      "On-premise options",
    ],
    cta: "Talk to Sales",
    ctaClass: "btn-ghost",
  },
]

export const TEAM = [
  { initial: "S", name: "Santosh Dehadrai", role: "Founder & CTO", bio: "Leads product vision, AI architecture, and engineering. 18+ months researching legal AI for India.", label: "Replace photo" },
  { initial: "S", name: "Saurabh Bhogale", role: "Co-Founder & BD", bio: "Leads business development, partnerships, and go-to-market strategy across Indian legal markets.", label: "Replace photo" },
  { initial: "C", name: "Chaitrali", role: "Product Lead · Advocate", bio: "Practicing lawyer leading product demos and customer onboarding. Brings real courtroom context to every decision.", label: "Replace photo" },
  { initial: "+", name: "The Engineering Team", role: "AI / ML · Backend · Frontend", bio: "Pravin, Vishal, Rutuja, Manasi, and the extended team — turning legal intuition into working software.", label: "5 more" },
]

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/jurinex", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Instagram", href: "https://www.instagram.com/jurinex.ai", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: "Facebook", href: "https://www.facebook.com/jurinex", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "X (Twitter)", href: "https://twitter.com/jurinex_ai", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Pinterest", href: "https://pinterest.com/jurinex", path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.378l-.75 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z" },
]
