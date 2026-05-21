import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  bookDemo,
  getDemoSlots,
  parseSlotSelection,
  sendChat,
} from "./chatbotApi"
import { useVoiceChat } from "./useVoiceChat"
import {
  IconBot,
  IconCalendar,
  IconClose,
  IconLock,
  IconMic,
  IconSend,
  IconStop,
} from "./icons"
import "./chatbot.css"

const SESSION_KEY = "jurinex_chat_session"

const GREETING =
  "Hello! I'm JuriNex AI, your dedicated legal intelligence assistant. Ask me anything about our platform, features, or Indian legal workflows."

const QUICK_QUESTIONS = [
  "What does JuriNex offer?",
  "How does Case Summarizer work?",
  "Is there a free trial?",
]

let msgSeq = 0
const newId = () => `m${++msgSeq}_${Date.now()}`
const mkMsg = (role, content, extra = {}) => ({
  id: newId(),
  role,
  type: "text",
  content,
  ...extra,
})

const renderInline = (text, keyPrefix) => {
  const parts = []
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g
  let last = 0
  let match
  let i = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[1] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-b${i}`}>{match[1]}</strong>)
    } else if (match[2] !== undefined) {
      parts.push(<em key={`${keyPrefix}-i${i}`}>{match[2]}</em>)
    } else if (match[3] !== undefined) {
      parts.push(<code key={`${keyPrefix}-c${i}`}>{match[3]}</code>)
    }
    last = match.index + match[0].length
    i++
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

const renderMessageContent = (content) => {
  if (typeof content !== "string") return content
  const lines = content.split("\n")
  const blocks = []
  let list = null
  const flushList = () => {
    if (list && list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="jx-md-ul">{list}</ul>,
      )
    }
    list = null
  }
  lines.forEach((raw, idx) => {
    const line = raw.trimEnd()
    const trimmed = line.trim()
    if (!trimmed) { flushList(); return }
    const headingMatch = /^(#{1,4})\s+(.*)$/.exec(trimmed)
    const bulletMatch = /^[*-]\s+(.*)$/.exec(trimmed)
    if (headingMatch) {
      flushList()
      const level = headingMatch[1].length
      const Tag = level <= 2 ? "h4" : "h5"
      blocks.push(
        <Tag key={`h-${idx}`} className="jx-md-h">
          {renderInline(headingMatch[2], `h${idx}`)}
        </Tag>,
      )
    } else if (bulletMatch) {
      if (!list) list = []
      list.push(
        <li key={`li-${idx}`}>{renderInline(bulletMatch[1], `li${idx}`)}</li>,
      )
    } else {
      flushList()
      blocks.push(
        <p key={`p-${idx}`} className="jx-md-p">
          {renderInline(trimmed, `p${idx}`)}
        </p>,
      )
    }
  })
  flushList()
  return blocks
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    mkMsg("assistant", GREETING, { type: "greeting" }),
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [sessionId, setSessionId] = useState(
    () => localStorage.getItem(SESSION_KEY) || null,
  )
  // Inline demo-booking form: { slot, name, email, company, submitting, error }
  const [booking, setBooking] = useState(null)
  const [voiceSlotPanel, setVoiceSlotPanel] = useState(null)

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  // Voice agent only speaks slots; we fetch them over REST once per session.
  const voiceSlotsShownRef = useRef(false)

  const hasUserMessage = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages],
  )

  const push = useCallback((msg) => setMessages((prev) => [...prev, msg]), [])

  const persistSession = useCallback((id) => {
    if (id) {
      setSessionId(id)
      try {
        localStorage.setItem(SESSION_KEY, id)
      } catch { /* storage disabled */ }
    }
  }, [])

  // --- Voice ---------------------------------------------------------------
  // The hook streams the answer paced to audio; we just replace the open
  // voice bubble's content with the latest revealed text. Decisions are
  // derived only from `prev` so they're correct under StrictMode's
  // double-invoked updaters.
  const onAssistantReveal = useCallback((text) => {
    if (!text) return
    setMessages((prev) => {
      const last = prev[prev.length - 1]
      if (
        last &&
        last.voice &&
        last.streaming &&
        last.role === "assistant"
      ) {
        return prev.map((m) =>
          m.id === last.id ? { ...m, content: text } : m,
        )
      }
      return [
        ...prev,
        mkMsg("assistant", text, { voice: true, streaming: true }),
      ]
    })
  }, [])

  // The mic transcript is unreliable, so the user-question bubble is the
  // query the model actually acted on (from its tool_call).
  const onUserQuestion = useCallback((query) => {
    const q = (query || "").trim()
    if (!q) return
    setMessages((prev) => {
      const lastUser = [...prev].reverse().find((m) => m.role === "user")
      if (lastUser && lastUser.content === q) return prev
      return [...prev, mkMsg("user", q, { voice: true })]
    })
  }, [])

  const onTurnComplete = useCallback(() => {
    setMessages((prev) => {
      const last = prev[prev.length - 1]
      if (!last || !last.streaming) return prev
      return prev.map((m) =>
        m.id === last.id ? { ...m, streaming: false } : m,
      )
    })
  }, [])

  const onToolCall = useCallback(
    (msg) =>
      push(
        mkMsg("system", `Searching JuriNex docs: “${msg.query || msg.tool}”…`, {
          type: "system",
        }),
      ),
    [push],
  )

  // The spoken agent says "a slot panel has appeared" — make that true by
  // pulling slots over REST and rendering them (once per voice session).
  const onBookingIntent = useCallback(async () => {
    if (voiceSlotsShownRef.current) return
    voiceSlotsShownRef.current = true
    try {
      const slots = await getDemoSlots()
      if (Array.isArray(slots) && slots.length) {
        push(mkMsg("assistant", "We have slots available. Please select one below."))
        setVoiceSlotPanel(slots)
      } else {
        voiceSlotsShownRef.current = false
        push(
          mkMsg(
            "assistant",
            "No demo slots are open right now — please try again a little later.",
          ),
        )
      }
    } catch (err) {
      voiceSlotsShownRef.current = false
      push(
        mkMsg("assistant", err?.message || "Couldn't load demo slots.", {
          type: "error",
        }),
      )
    }
  }, [push])

  const voice = useVoiceChat({
    onAssistantText: onAssistantReveal,
    onUserQuestion,
    onToolCall,
    onTurnComplete,
    onBookingIntent,
  })

  const toggleVoice = useCallback(() => {
    onTurnComplete() // seal any open voice bubble before toggling
    voiceSlotsShownRef.current = false
    setVoiceSlotPanel(null)
    if (voice.isActive) {
      voice.stop()
    } else {
      setBooking(null)
      // Use the booking-aware socket when a demo flow is on screen.
      voice.start(booking ? "booking" : "default")
    }
  }, [voice, booking, onTurnComplete])

  // --- Text chat -----------------------------------------------------------
  const handleSend = useCallback(
    async (raw) => {
      const text = (raw ?? input).trim()
      if (!text || sending) return
      setInput("")
      push(mkMsg("user", text))
      setSending(true)
      try {
        const res = await sendChat(text, sessionId)
        persistSession(res?.session_id)
        const slotSel = parseSlotSelection(res?.answer)
        if (slotSel) {
          push(
            mkMsg(
              "assistant",
              slotSel.message || "Here are our available demo slots:",
              { type: "slots", slots: slotSel.slots },
            ),
          )
        } else {
          push(mkMsg("assistant", res?.answer || "…"))
        }
      } catch (err) {
        push(
          mkMsg("assistant", err?.message || "Something went wrong.", {
            type: "error",
          }),
        )
      } finally {
        setSending(false)
      }
    },
    [input, sending, sessionId, push, persistSession],
  )

  // --- Demo booking --------------------------------------------------------
  const openDemoSlots = useCallback(async () => {
    if (sending) return
    setVoiceSlotPanel(null)
    setSending(true)
    push(mkMsg("user", "I'd like to book a free demo."))
    try {
      const slots = await getDemoSlots()
      if (Array.isArray(slots) && slots.length) {
        push(
          mkMsg(
            "assistant",
            "Great! Pick a time that works for you and I'll grab your details:",
            { type: "slots", slots },
          ),
        )
      } else {
        push(
          mkMsg(
            "assistant",
            "No demo slots are open right now — leave it with me and the team will reach out, or try again a little later.",
          ),
        )
      }
    } catch (err) {
      push(mkMsg("assistant", err?.message || "Couldn't load demo slots.", { type: "error" }))
    } finally {
      setSending(false)
    }
  }, [sending, push])

  const chooseSlot = useCallback(
    (slot) => {
      // During a voice call, hand the pick back to the agent (per the WS
      // protocol) and let it collect name/email by voice — no typed form.
      if (voice.isActive) {
        setVoiceSlotPanel(null)
        voice.sendText(
          `The user selected slot_id=${slot.id} (${slot.label}). ` +
            `Ask for their full name and email to confirm the demo.`,
        )
        setBooking({ slot, voice: true })
        push(
          mkMsg(
            "system",
            `Selected ${slot.label} — tell JuriNex your name and email by voice to confirm.`,
            { type: "system" },
          ),
        )
        return
      }
      setBooking({
        slot,
        name: "",
        email: "",
        company: "",
        submitting: false,
        error: null,
      })
    },
    [voice, push],
  )

  const submitBooking = useCallback(
    async (e) => {
      e.preventDefault()
      if (!booking || booking.submitting) return
      const { slot, name, email, company } = booking
      if (!name.trim() || !email.trim()) {
        setBooking((b) => ({ ...b, error: "Please enter your name and email." }))
        return
      }
      setBooking((b) => ({ ...b, submitting: true, error: null }))
      try {
        const res = await bookDemo({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          slotId: slot.id,
        })
        if (res?.success) {
          push(
            mkMsg(
              "assistant",
              res.message ||
                `Your demo is confirmed for ${slot.label}. We'll email the details shortly!`,
              { type: "confirmation" },
            ),
          )
          setBooking(null)
        } else {
          setBooking((b) => ({
            ...b,
            submitting: false,
            error: res?.error || "Couldn't confirm that slot. Please pick another.",
          }))
        }
      } catch (err) {
        setBooking((b) => ({
          ...b,
          submitting: false,
          error: err?.message || "Booking failed. Please try again.",
        }))
      }
    },
    [booking, push],
  )

  // --- Effects -------------------------------------------------------------
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, sending, booking, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const voiceLabel = {
    connecting: "Connecting…",
    listening: "Listening…",
    speaking: "Speaking…",
    error: voice.error || "Voice error",
  }[voice.status]

  // --- Render --------------------------------------------------------------
  if (!open) {
    return (
      <button
        type="button"
        className="jx-chat-launcher"
        aria-label="Open JuriNex AI assistant"
        onClick={() => setOpen(true)}
      >
        <IconBot width="26" height="26" />
      </button>
    )
  }

  return (
    <div className="jx-chat" role="dialog" aria-label="JuriNex Customer Support">
      <header className="jx-chat-head">
        <div className="jx-chat-head-top">
          <div className="jx-chat-id">
            <span className="jx-chat-mark">
              <IconBot width="20" height="20" />
            </span>
            <div className="jx-chat-id-text">
              <div className="jx-chat-title">
                JuriNex <sup>™</sup> <span>Customer Support</span>
              </div>
              <div className="jx-chat-status">
                <span className="jx-dot" />
                {voiceLabel ? voiceLabel : "Online"}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="jx-chat-x"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            <IconClose width="18" height="18" />
          </button>
        </div>
      </header>

      <div className="jx-chat-body" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`jx-row jx-row-${m.role}`}>
            {m.role === "assistant" && (
              <span className="jx-avatar">
                <IconBot width="15" height="15" />
              </span>
            )}
            <div className="jx-bubble-wrap">
              <div
                className={`jx-bubble jx-bubble-${m.role}${
                  m.type === "error" ? " jx-bubble-error" : ""
                }${m.type === "confirmation" ? " jx-bubble-ok" : ""}${
                  m.type === "system" ? " jx-bubble-sys" : ""
                }`}
              >
                {renderMessageContent(m.content)}
              </div>

              {m.type === "slots" && !m.voice && (
                <div className="jx-slots">
                  {m.slots.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="jx-slot"
                      onClick={() => chooseSlot(s)}
                      disabled={!!booking}
                    >
                      <IconCalendar width="14" height="14" />
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {m.type === "greeting" && !hasUserMessage && (
                <div className="jx-quick">
                  <div className="jx-quick-label">Quick questions</div>
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="jx-quick-chip"
                      onClick={() => handleSend(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {booking && !booking.voice && (
          <div className="jx-row jx-row-assistant">
            <span className="jx-avatar">
              <IconCalendar width="15" height="15" />
            </span>
            <form className="jx-bookform" onSubmit={submitBooking}>
              <div className="jx-bookform-slot">{booking.slot.label}</div>
              <input
                className="jx-field"
                placeholder="Full name"
                value={booking.name}
                onChange={(e) =>
                  setBooking((b) => ({ ...b, name: e.target.value }))
                }
                autoFocus
              />
              <input
                className="jx-field"
                type="email"
                placeholder="Work email"
                value={booking.email}
                onChange={(e) =>
                  setBooking((b) => ({ ...b, email: e.target.value }))
                }
              />
              <input
                className="jx-field"
                placeholder="Company / firm (optional)"
                value={booking.company}
                onChange={(e) =>
                  setBooking((b) => ({ ...b, company: e.target.value }))
                }
              />
              {booking.error && (
                <div className="jx-bookform-err">{booking.error}</div>
              )}
              <div className="jx-bookform-actions">
                <button
                  type="button"
                  className="jx-btn-text"
                  onClick={() => setBooking(null)}
                  disabled={booking.submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="jx-btn-confirm"
                  disabled={booking.submitting}
                >
                  {booking.submitting ? "Booking…" : "Confirm demo"}
                </button>
              </div>
            </form>
          </div>
        )}

        {sending && (
          <div className="jx-row jx-row-assistant">
            <span className="jx-avatar">
              <IconBot width="15" height="15" />
            </span>
            <div className="jx-bubble jx-bubble-assistant jx-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {voiceSlotPanel && (
        <section className="jx-voice-slots" aria-label="Book a demo slots">
          <div className="jx-voice-slots-head">
            <div className="jx-voice-slots-title">Book a Demo</div>
            <button
              type="button"
              className="jx-voice-slots-close"
              onClick={() => setVoiceSlotPanel(null)}
              aria-label="Close demo slots"
            >
              <IconClose width="14" height="14" />
            </button>
          </div>
          <div className="jx-voice-slots-sub">Select an available time slot:</div>
          <div className="jx-voice-slots-list">
            {voiceSlotPanel.map((s) => (
              <button
                key={s.id}
                type="button"
                className="jx-slot"
                onClick={() => chooseSlot(s)}
                disabled={!!booking}
              >
                <IconCalendar width="14" height="14" />
                {s.label}
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="jx-chat-foot">
        <div className="jx-composer">
          <button
            type="button"
            className={`jx-mic${voice.isActive ? " jx-mic-on" : ""}`}
            onClick={toggleVoice}
            aria-label={voice.isActive ? "Stop voice" : "Start voice"}
            title={voice.isActive ? "Stop voice" : "Talk to JuriNex AI"}
          >
            {voice.isActive ? (
              <IconStop width="17" height="17" />
            ) : (
              <IconMic width="18" height="18" />
            )}
          </button>
          <input
            ref={inputRef}
            className="jx-input"
            placeholder="Ask a legal question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button
            type="button"
            className="jx-send"
            onClick={() => handleSend()}
            disabled={!input.trim() || sending}
            aria-label="Send message"
          >
            <IconSend width="17" height="17" />
          </button>
        </div>
        <div className="jx-secure">
          <IconLock width="11" height="11" />
          End-to-end secured · Answers sourced from official JuriNex docs
        </div>
      </div>
    </div>
  )
}
