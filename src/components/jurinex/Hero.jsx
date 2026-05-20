import { useEffect, useState } from "react"
import {
  SIDEBAR_ITEMS_FULL_TOP,
  SIDEBAR_ITEMS_FULL_BOTTOM,
  SIDEBAR_ICONS,
  DEMO_CASE_DETAIL,
  BRIEF_STATS,
  QUICK_ACTIONS,
  STORAGE_FOLDERS,
  CHAT_TIMELINE,
  DRAFT_TEMPLATES,
  RECENT_DRAFTS,
} from "./content"

const SLIDES = [
  { url: "jurinex.ai/#/dashboard",   Component: SlideDashboardChat },
  { url: "jurinex.ai/#/case-briefs", Component: SlideCaseBriefs },
  { url: "jurinex.ai/#/case-storage", Component: SlideCaseStorage },
  { url: "jurinex.ai/#/chat",        Component: SlideChat },
  { url: "jurinex.ai/#/ai-drafting", Component: SlideAIDrafting },
]
const SLIDE_INTERVAL_MS = 3200

export default function Hero() {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="hero">
      <h1 className="hero-headline">
        <span className="hero-headline-left hero-headline-nowrap">Enterprise grade legal operating system</span>
        <em className="hero-headline-left">for  Professionals</em>
        <em className="hero-headline-left">for powered by AI</em>
      </h1>

      <p className="hero-sub">
        Work faster, practice smarter with the power of AI. JuriNex automates document
        processing, case research, and legal drafting &mdash; purpose-built for Indian courts,
        in Multilingual .
      </p>

      <div className="hero-cta">
        <a href="#demo" className="btn btn-primary btn-lg btn-arrow">Start 3 days free trial</a>
      </div>

      <div className="hero-credential">
        <span className="dot" />
        Developed, tried and tested by experienced lawyers
      </div>

      <div
        className="hero-preview"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero-preview-chrome">
          <div className="chrome-dot" />
          <div className="chrome-dot" />
          <div className="chrome-dot" />
          <div className="chrome-url">{SLIDES[slide].url}</div>
        </div>

        <div className="hero-slider">
          <div className="hero-slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {SLIDES.map(({ Component }, i) => (
              <div className="hero-slide" key={i}><Component /></div>
            ))}
          </div>

          <button
            type="button"
            className="hero-slider-arrow hero-slider-arrow--prev"
            aria-label="Previous slide"
            onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
          >
            ‹
          </button>
          <button
            type="button"
            className="hero-slider-arrow hero-slider-arrow--next"
            aria-label="Next slide"
            onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
          >
            ›
          </button>
        </div>

        <div className="hero-slider-dots" role="tablist" aria-label="Product preview slides">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Show slide ${i + 1}`}
              className={`hero-slider-dot${slide === i ? " active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FullSidebar({ activeKey }) {
  return (
    <div className="preview-sidebar preview-sidebar-full">
      <div className="preview-sidebar-logo">
        <div className="preview-sidebar-logo-mark">JN</div>
        <span className="preview-sidebar-logo-text">JuriNex</span>
      </div>
      <div className="preview-sidebar-group">
        {SIDEBAR_ITEMS_FULL_TOP.map((item) => (
          <div
            key={item.key}
            className={`preview-sidebar-item${item.key === activeKey ? " active" : ""}`}
          >
            {SIDEBAR_ICONS[item.key]}
            {item.label}
          </div>
        ))}
      </div>
      <div className="preview-sidebar-spacer" />
      <div className="preview-sidebar-group preview-sidebar-bottom">
        {SIDEBAR_ITEMS_FULL_BOTTOM.map((item) => (
          <div key={item.key} className="preview-sidebar-item">
            {SIDEBAR_ICONS[item.key]}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideDashboardChat() {
  const c = DEMO_CASE_DETAIL
  return (
    <div className="hero-preview-body hero-preview-body--wide">
      <FullSidebar activeKey="dashboard" />
      <div className="preview-main preview-main--compact">
        <div className="preview-main-row">
          <div className="preview-main-header">Hello, Adv. Rajesh Kumar</div>
          <button className="preview-cta-btn">Create New Case</button>
        </div>

        <div className="preview-section-row">
          <div className="preview-section-title">Cases</div>
          <button className="preview-ghost-btn">View All</button>
        </div>

        <div className="preview-tabs">
          <div className="preview-tab active">Ongoing (1)</div>
          <div className="preview-tab">Pending (0)</div>
          <div className="preview-tab">Disposed (0)</div>
          <div className="preview-tab">Draft (0)</div>
        </div>

        <div className="preview-table preview-table--wide">
          <div className="preview-row preview-row-wide preview-row-header">
            <div>Title</div>
            <div>Case No.</div>
            <div>Court / Bench</div>
            <div>Stage</div>
            <div>Advocate</div>
            <div>Hearing</div>
            <div>Status</div>
            <div>Updated</div>
            <div>Actions</div>
          </div>
          <div className="preview-row preview-row-wide">
            <div>{c.title}</div>
            <div>{c.no}</div>
            <div>{c.court}</div>
            <div className="preview-cell-soft">{c.type}</div>
            <div className="preview-cell-soft">{c.advocate}</div>
            <div className="preview-cell-soft">{c.hearing}</div>
            <div><span className="preview-badge">{c.status}</span></div>
            <div className="preview-cell-soft">{c.updated}</div>
            <div className="preview-actions">
              <span className="preview-action-dot" />
              <span className="preview-action-dot" />
              <span className="preview-action-dot" />
            </div>
          </div>
        </div>

        <div className="preview-chat">
          <div className="preview-chat-title">How can I help you today?</div>
          <div className="preview-chat-chips">
            {QUICK_ACTIONS.map((q) => (
              <span key={q} className="preview-chat-chip">{q}</span>
            ))}
          </div>
          <div className="preview-chat-input">
            <span className="preview-chat-placeholder">
              Ask anything about your cases or upload documents to get started…
            </span>
            <span className="preview-chat-send">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideCaseBriefs() {
  const c = DEMO_CASE_DETAIL
  return (
    <div className="hero-preview-body hero-preview-body--wide">
      <FullSidebar activeKey="newcase" />
      <div className="preview-main preview-main--compact">
        <div className="preview-main-row">
          <div>
            <div className="preview-main-header">Case Briefs</div>
            <div className="preview-main-sub">Manage, track, and analyze all your cases in one place.</div>
          </div>
          <button className="preview-cta-btn">Create New Case</button>
        </div>

        <div className="preview-stats-grid">
          {BRIEF_STATS.map((s) => (
            <div key={s.label} className="preview-stat-card">
              <div className="preview-stat-label">{s.label}</div>
              <div className="preview-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="preview-section-row">
          <div className="preview-section-title">Cases</div>
          <div className="preview-search">
            <span className="preview-search-icon">⌕</span>
            <span className="preview-search-placeholder">Search by title, case number, court…</span>
          </div>
        </div>

        <div className="preview-tabs">
          <div className="preview-tab active">Ongoing (1)</div>
          <div className="preview-tab">Pending (0)</div>
          <div className="preview-tab">Disposed (0)</div>
          <div className="preview-tab">Draft (0)</div>
        </div>

        <div className="preview-table preview-table--wide">
          <div className="preview-row preview-row-wide preview-row-header">
            <div>Title</div>
            <div>Case No.</div>
            <div>Court / Bench</div>
            <div>Stage</div>
            <div>Advocate</div>
            <div>Hearing</div>
            <div>Status</div>
            <div>Updated</div>
            <div>Actions</div>
          </div>
          <div className="preview-row preview-row-wide">
            <div>{c.title}</div>
            <div>{c.no}</div>
            <div>{c.court}</div>
            <div className="preview-cell-soft">{c.type}</div>
            <div className="preview-cell-soft">{c.advocate}</div>
            <div className="preview-cell-soft">{c.hearing}</div>
            <div><span className="preview-badge">{c.status}</span></div>
            <div className="preview-cell-soft">{c.updated}</div>
            <div className="preview-actions">
              <span className="preview-action-dot" />
              <span className="preview-action-dot" />
              <span className="preview-action-dot" />
            </div>
          </div>
        </div>

        <div className="preview-pagination">
          <span>Showing 1 to 1 of 1 results</span>
          <span className="preview-pagination-page">1</span>
        </div>
      </div>
    </div>
  )
}

function SlideCaseStorage() {
  return (
    <div className="hero-preview-body hero-preview-body--wide">
      <FullSidebar activeKey="storage" />
      <div className="preview-main preview-main--compact">
        <div className="preview-main-row">
          <div className="preview-main-header">Case Storage</div>
        </div>

        <div className="preview-storage-toolbar">
          <div className="preview-search preview-search--lg">
            <span className="preview-search-icon">⌕</span>
            <span className="preview-search-placeholder">Search files, folders, documents…</span>
          </div>
          <button className="preview-ghost-btn">Filters</button>
          <button className="preview-ghost-btn">Upload</button>
          <div className="preview-toolbar-spacer" />
          <button className="preview-ghost-btn">Custom Branding</button>
        </div>

        <div className="preview-storage-tabs">
          <span className="preview-storage-tab"><span className="preview-storage-dot preview-storage-dot--blue" />My Documents (0)</span>
          <span className="preview-storage-tab active"><span className="preview-storage-dot preview-storage-dot--green" />My Cases (1)</span>
          <div className="preview-toolbar-spacer" />
          <span className="preview-storage-sort">Sort by: Name ⌄</span>
        </div>

        <div className="preview-storage-cases-label">CASES</div>

        <div className="preview-storage-grid">
          {STORAGE_FOLDERS.map((f) => (
            <div className="preview-folder-card" key={f.title}>
              <div className="preview-folder-row">
                <svg className="preview-folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span className="preview-badge preview-folder-badge">{f.status}</span>
              </div>
              <div className="preview-folder-title">{f.title}</div>
              <div className="preview-folder-meta">{f.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideChat() {
  return (
    <div className="hero-preview-body hero-preview-body--wide">
      <FullSidebar activeKey="chat" />
      <div className="preview-main preview-main--compact">
        <div className="preview-main-row">
          <div className="preview-main-header">Chat with Me</div>
          <div className="preview-chat-actions">
            <button className="preview-ghost-btn">⌚ List of Dates &amp; Events ⌄</button>
            <button className="preview-cta-btn">+ New Conversation</button>
          </div>
        </div>

        <div className="preview-chat-stream">
          <div className="preview-chat-bubble preview-chat-bubble--right">List of Dates &amp; Events</div>
          <div className="preview-chat-pdf">
            <span className="preview-chat-pdf-icon">PDF</span>
            <span>aditya_industries_documents.pdf</span>
          </div>

          <div className="preview-chat-bubble preview-chat-bubble--left">
            <p>Of course. As a Senior Advocate dealing with an IP matter like this, having a clear, factual timeline is crucial. Based on the documents you've provided, I have extracted the sequence of events.</p>
            <p className="preview-chat-bubble-section"><strong>FACTUAL MATRIX</strong> — Aditya Industries Ltd. vs. Sanjay Sharma</p>
            <div className="preview-chat-bubble-meta">
              <div><strong>Document Analyzed:</strong> Reply (Exh. 19) &amp; Rejoinder (Exh. 16) in Com. Suit No. 1/2024</div>
              <div><strong>Date of Analysis:</strong> 20-May-2026</div>
              <div><strong>Total Events Extracted:</strong> 7</div>
            </div>

            <div className="preview-chat-section-title">CHRONOLOGICAL EVENT TIMELINE</div>
            <div className="preview-chat-table">
              <div className="preview-chat-trow preview-chat-thead">
                <div>S.No</div>
                <div>Date</div>
                <div>Nature</div>
                <div>Parties</div>
                <div>Place</div>
                <div>Conf.</div>
              </div>
              {CHAT_TIMELINE.map((r) => (
                <div className="preview-chat-trow" key={r.sno}>
                  <div>{r.sno}</div>
                  <div>{r.date}</div>
                  <div>{r.nature}</div>
                  <div>{r.parties}</div>
                  <div>{r.place}</div>
                  <div className="preview-chat-conf">{r.conf}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-chat-chips preview-chat-chips--small">
          {QUICK_ACTIONS.slice(0, 6).map((q) => (
            <span key={q} className="preview-chat-chip">{q}</span>
          ))}
        </div>
        <div className="preview-chat-input">
          <span className="preview-chat-placeholder">Ask a follow-up or start a new query…</span>
          <span className="preview-chat-send">→</span>
        </div>
      </div>
    </div>
  )
}

function SlideAIDrafting() {
  return (
    <div className="hero-preview-body hero-preview-body--wide">
      <FullSidebar activeKey="draft" />
      <div className="preview-main preview-main--compact">
        <div className="preview-main-row">
          <div>
            <div className="preview-main-header">My templates</div>
            <div className="preview-main-sub">Templates you created. Upload a document to create a new one.</div>
          </div>
          <div className="preview-chat-actions">
            <button className="preview-cta-btn preview-cta-btn--green">+ Create Template</button>
            <button className="preview-cta-btn">Browse Templates</button>
          </div>
        </div>

        <div className="preview-template-row">
          {DRAFT_TEMPLATES.map((t) => (
            <div key={t.title} className={`preview-template-card${t.custom ? " preview-template-card--custom" : ""}`}>
              {t.custom ? (
                <div className="preview-template-plus">+</div>
              ) : (
                <svg className="preview-template-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              )}
              <div className="preview-template-title">{t.title}</div>
            </div>
          ))}
        </div>

        <div className="preview-section-row preview-section-row--tight">
          <div className="preview-section-title">Recent Drafts</div>
          <div className="preview-chat-actions">
            <span className="preview-ghost-btn">All cases ⌄</span>
            <button className="preview-cta-btn preview-cta-btn--green">+ Create Draft</button>
          </div>
        </div>

        <div className="preview-draft-grid">
          {RECENT_DRAFTS.map((d) => (
            <div key={d.title} className="preview-draft-card">
              <div className="preview-draft-tags">
                <span className="preview-draft-tag">LEGAL</span>
                <span className="preview-draft-tag preview-draft-tag--green">Generated</span>
              </div>
              <div className="preview-draft-thumb"><span className="preview-draft-w">W</span></div>
              <div className="preview-draft-title">{d.title}</div>
              <div className="preview-draft-date">{d.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
