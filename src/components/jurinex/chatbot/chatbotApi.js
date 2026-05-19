// REST + config layer for the landing-page chatbot (Backend/ai-chatbot).
// Endpoints mirror the Postman collection exactly:
//   POST /api/chat                       -> { answer, session_id }
//   GET  /api/chat/history/{session_id}  -> [{ role, content, created_at }]
//   GET  /api/demo-slots                 -> [{ id, start_time, end_time, label }]
//   POST /api/book-demo                  -> { success, booking_id, ... } | { success:false, error }

// Default to the deployed Cloud Run service; override per-env with VITE_CHATBOT_API.
const DEFAULT_API = "https://ai-chatbot-120280829617.asia-south1.run.app"

export const API_BASE = (
  import.meta.env.VITE_CHATBOT_API || DEFAULT_API
).replace(/\/+$/, "")

// Derive the WebSocket origin from the HTTP base unless explicitly overridden.
export const WS_BASE = (
  import.meta.env.VITE_CHATBOT_WS ||
  API_BASE.replace(/^http(s?):\/\//, (_, s) => (s ? "wss://" : "ws://"))
).replace(/\/+$/, "")

// Thrown for non-2xx responses so the UI can show a friendly message.
export class ChatApiError extends Error {
  constructor(message, status, detail) {
    super(message)
    this.name = "ChatApiError"
    this.status = status
    this.detail = detail
  }
}

async function parseJson(res) {
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : null
  } catch {
    return text
  }
}

function messageFromDetail(detail, fallback) {
  if (typeof detail === "string") return detail
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
  if (detail?.detail) return messageFromDetail(detail.detail, fallback)
  return fallback
}

async function request(path, { method = "GET", body, signal } = {}) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (err) {
    if (err?.name === "AbortError") throw err
    throw new ChatApiError(
      "Can't reach the assistant right now. Please check your connection.",
      0,
    )
  }

  const data = await parseJson(res)

  if (!res.ok) {
    if (res.status === 429) {
      throw new ChatApiError("Too many requests. Please slow down a moment.", 429)
    }
    throw new ChatApiError(
      messageFromDetail(data, "Something went wrong. Please try again."),
      res.status,
      data,
    )
  }
  return data
}

// A booking prompt may arrive as a JSON string inside `answer`:
//   {"type":"slot_selection","message":"...","slots":[{"id":12,"label":"..."}]}
function tryParse(str) {
  try {
    return JSON.parse(str)
  } catch {
    return undefined
  }
}

// The model frequently wraps the slot JSON in a ```json fence or surrounds
// it with prose ("Sure! {…}"). Pull the JSON object out wherever it sits.
function extractJsonObject(str) {
  let v = tryParse(str.trim())
  if (v !== undefined) return v

  const fence = str.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) {
    v = tryParse(fence[1].trim())
    if (v !== undefined) return v
  }

  const start = str.indexOf("{")
  if (start === -1) return undefined
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = start; i < str.length; i++) {
    const c = str[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === "\\") esc = true
      else if (c === '"') inStr = false
    } else if (c === '"') inStr = true
    else if (c === "{") depth++
    else if (c === "}" && --depth === 0) {
      return tryParse(str.slice(start, i + 1))
    }
  }
  return undefined
}

export function parseSlotSelection(answer) {
  const obj = typeof answer === "string" ? extractJsonObject(answer) : answer
  if (!obj || typeof obj !== "object") return null
  if (obj.type !== "slot_selection") return null
  const raw = obj.slots || obj.options || obj.available_slots
  if (!Array.isArray(raw)) return null
  const slots = raw
    .map((s) => ({
      id: s?.id ?? s?.slot_id,
      label: s?.label || s?.title || s?.text,
      start_time: s?.start_time,
      end_time: s?.end_time,
    }))
    .filter((s) => s.id != null)
    .map((s) => ({ ...s, label: s.label || `Slot ${s.id}` }))
  if (!slots.length) return null
  return { ...obj, slots }
}

// First message: pass sessionId = null. Reuse the returned session_id after that.
export function sendChat(message, sessionId, signal) {
  return request("/api/chat", {
    method: "POST",
    body: { message, session_id: sessionId || null },
    signal,
  })
}

export function getHistory(sessionId, limit = 20) {
  return request(
    `/api/chat/history/${encodeURIComponent(sessionId)}?limit=${limit}`,
  )
}

export function getDemoSlots(signal) {
  return request("/api/demo-slots", { signal })
}

export function bookDemo({ name, email, company, slotId }, signal) {
  return request("/api/book-demo", {
    method: "POST",
    body: { name, email, company: company || "", slot_id: Number(slotId) },
    signal,
  })
}
