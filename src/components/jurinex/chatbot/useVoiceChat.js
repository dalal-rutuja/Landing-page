
// Voice chat over WebSocket for the landing chatbot.
//
// Client -> server : { type:"audio", data:<base64 PCM-16 mono 16 kHz> }
//                     { type:"text",  content }
//                     { type:"end" }
// Server -> client : { type:"audio", data, mime_type }   (AI speech, PCM-16)
//                     { type:"text", content }            (AI transcript)
//                     { type:"input_transcript", content} (user speech)
//                     { type:"tool_call", tool, query }
//                     { type:"turn_complete" }
//                     { type:"error", message }
import { useCallback, useEffect, useRef, useState } from "react"
import { WS_BASE } from "./chatbotApi"

const INPUT_SAMPLE_RATE = 16000 // server expects 16 kHz mono PCM-16
const OUTPUT_SAMPLE_RATE = 24000 // Gemini Live native audio output

function floatToPcm16Base64(float32) {
  const buf = new ArrayBuffer(float32.length * 2)
  const view = new DataView(buf)
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]))
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  let binary = ""
  const bytes = new Uint8Array(buf)
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

function base64ToFloat32(b64) {
  const binary = atob(b64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
  const view = new DataView(bytes.buffer)
  const out = new Float32Array(len / 2)
  for (let i = 0; i < out.length; i++) out[i] = view.getInt16(i * 2, true) / 0x8000
  return out
}

// Linear-interpolation resample to INPUT_SAMPLE_RATE when the capture
// AudioContext can't honor the requested rate (Safari/Firefox often won't).
function downsample(float32, fromRate) {
  if (fromRate === INPUT_SAMPLE_RATE) return float32
  const ratio = fromRate / INPUT_SAMPLE_RATE
  const outLen = Math.round(float32.length / ratio)
  const out = new Float32Array(outLen)
  for (let i = 0; i < outLen; i++) {
    const pos = i * ratio
    const idx = Math.floor(pos)
    const frac = pos - idx
    out[i] = (float32[idx] || 0) * (1 - frac) + (float32[idx + 1] || 0) * frac
  }
  return out
}

// Glue streamed text fragments without doubling spaces / spacing punctuation.
function joinText(prev, next) {
  if (!prev) return next
  if (!next) return prev
  if (/\s$/.test(prev) || /^\s/.test(next) || /^[.,!?;:%)\]}'"]/.test(next)) {
    return prev + next
  }
  return `${prev} ${next}`
}

// The voice agent only *speaks* demo slots — it never sends them as data.
// These cues tell us a slot panel should be fetched (over REST) and shown.
const BOOKING_RE =
  /slot selection panel|slots? available|available slots?|pick a (?:time |demo )?slot|choose a (?:time |demo )?slot|here are (?:our |the )?(?:available )?(?:demo )?slots/i

export function useVoiceChat({
  onAssistantText,
  onUserQuestion,
  onToolCall,
  onTurnComplete,
  onBookingIntent,
} = {}) {
  const [status, setStatus] = useState("idle") // idle|connecting|listening|speaking|error
  const [error, setError] = useState(null)

  const wsRef = useRef(null)
  const streamRef = useRef(null)
  const inCtxRef = useRef(null)
  const outCtxRef = useRef(null)
  const processorRef = useRef(null)
  const sourceRef = useRef(null)
  const playheadRef = useRef(0)
  const playingCountRef = useRef(0)

  // Per-turn text reveal, paced to spoken-audio progress.
  const turnTextRef = useRef("") // full assistant answer accumulated so far
  const revealRef = useRef(0) // chars already shown
  const turnAudioStartRef = useRef(null) // outCtx time the turn's audio began
  const turnEndingRef = useRef(false) // server sent turn_complete
  const turnActiveRef = useRef(false) // a turn is in progress
  const tickRef = useRef(null) // pending requestAnimationFrame id
  const loopRef = useRef(null) // the per-frame reveal callback
  const bookingSignaledRef = useRef(false) // booking-intent fired this turn

  const cbRef = useRef({
    onAssistantText,
    onUserQuestion,
    onToolCall,
    onTurnComplete,
    onBookingIntent,
  })
  useEffect(() => {
    cbRef.current = {
      onAssistantText,
      onUserQuestion,
      onToolCall,
      onTurnComplete,
      onBookingIntent,
    }
  }, [onAssistantText, onUserQuestion, onToolCall, onTurnComplete, onBookingIntent])

  const resetTurn = useCallback(() => {
    if (tickRef.current) cancelAnimationFrame(tickRef.current)
    tickRef.current = null
    turnTextRef.current = ""
    revealRef.current = 0
    turnAudioStartRef.current = null
    turnEndingRef.current = false
    turnActiveRef.current = false
    bookingSignaledRef.current = false
  }, [])

  // Reveal-loop: advance visible text in step with audio playback so the
  // bubble fills in roughly as the voice speaks, instead of dumping the
  // whole answer up front. No per-word timing exists, so this interpolates
  // across the scheduled audio window [turnAudioStart, playhead]. Defined
  // in an effect (touches only refs) so it can self-schedule via rAF.
  useEffect(() => {
    loopRef.current = () => {
      const ctx = outCtxRef.current
      const full = turnTextRef.current
      let target = revealRef.current

      if (turnAudioStartRef.current != null && ctx) {
        const now = ctx.currentTime
        const start = turnAudioStartRef.current
        const end = playheadRef.current
        const span = end - start
        const frac =
          span > 0 ? Math.min(1, Math.max(0, (now - start) / span)) : 1
        target = Math.floor(frac * full.length)
        if (now >= end) target = full.length // audio done -> show the rest
      } else if (turnEndingRef.current) {
        target = full.length // text-only answer, turn finished
      }

      if (target > revealRef.current) {
        revealRef.current = target
        cbRef.current.onAssistantText?.(full.slice(0, target))
      }

      const audioDone =
        turnAudioStartRef.current == null ||
        !ctx ||
        ctx.currentTime >= playheadRef.current
      const textDone = revealRef.current >= full.length

      if (turnEndingRef.current && audioDone && textDone) {
        if (full.length) cbRef.current.onAssistantText?.(full)
        cbRef.current.onTurnComplete?.()
        tickRef.current = null
        turnActiveRef.current = false
        return
      }
      tickRef.current = requestAnimationFrame(loopRef.current)
    }
  }, [])

  const ensureTurn = useCallback(() => {
    if (!turnActiveRef.current) {
      resetTurn()
      turnActiveRef.current = true
    }
    if (tickRef.current == null) {
      tickRef.current = requestAnimationFrame(loopRef.current)
    }
  }, [resetTurn])

  const cleanup = useCallback(() => {
    try {
      processorRef.current?.disconnect()
      sourceRef.current?.disconnect()
    } catch { /* already torn down */ }
    streamRef.current?.getTracks().forEach((t) => t.stop())
    if (inCtxRef.current?.state !== "closed") inCtxRef.current?.close()
    if (outCtxRef.current?.state !== "closed") outCtxRef.current?.close()
    processorRef.current = null
    sourceRef.current = null
    streamRef.current = null
    inCtxRef.current = null
    outCtxRef.current = null
    playheadRef.current = 0
    playingCountRef.current = 0
    resetTurn()
  }, [resetTurn])

  const stop = useCallback(() => {
    const ws = wsRef.current
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ type: "end" }))
      } catch { /* socket closing */ }
    }
    wsRef.current = null
    if (ws) {
      ws.onmessage = ws.onerror = ws.onclose = null
      try { ws.close() } catch { /* noop */ }
    }
    cleanup()
    setStatus("idle")
  }, [cleanup])

  const playChunk = useCallback((float32) => {
    const ctx = outCtxRef.current
    if (!ctx) return
    const buffer = ctx.createBuffer(1, float32.length, OUTPUT_SAMPLE_RATE)
    buffer.copyToChannel(float32, 0)
    const node = ctx.createBufferSource()
    node.buffer = buffer
    node.connect(ctx.destination)
    const now = ctx.currentTime
    const startAt = Math.max(now, playheadRef.current)
    node.start(startAt)
    playheadRef.current = startAt + buffer.duration
    if (turnAudioStartRef.current == null) turnAudioStartRef.current = startAt
    playingCountRef.current += 1
    setStatus("speaking")
    node.onended = () => {
      playingCountRef.current -= 1
      if (playingCountRef.current <= 0 && wsRef.current) setStatus("listening")
    }
  }, [])

  const sendText = useCallback((content) => {
    const ws = wsRef.current
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "text", content }))
    }
  }, [])

  const start = useCallback(
    async (mode) => {
      setError(null)
      setStatus("connecting")
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
          },
        })
        streamRef.current = stream

        const AudioCtx = window.AudioContext || window.webkitAudioContext
        const inCtx = new AudioCtx({ sampleRate: INPUT_SAMPLE_RATE })
        const outCtx = new AudioCtx({ sampleRate: OUTPUT_SAMPLE_RATE })
        inCtxRef.current = inCtx
        outCtxRef.current = outCtx

        const url =
          `${WS_BASE}/ws/audio` + (mode === "booking" ? "?mode=booking" : "")
        const ws = new WebSocket(url)
        wsRef.current = ws

        ws.onopen = () => {
          const source = inCtx.createMediaStreamSource(stream)
          const processor = inCtx.createScriptProcessor(4096, 1, 1)
          sourceRef.current = source
          processorRef.current = processor

          processor.onaudioprocess = (e) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
            const input = e.inputBuffer.getChannelData(0)
            const pcm = downsample(input, inCtx.sampleRate)
            wsRef.current.send(
              JSON.stringify({ type: "audio", data: floatToPcm16Base64(pcm) }),
            )
          }

          // Mute the processor's own output so the mic isn't echoed back.
          const sink = inCtx.createGain()
          sink.gain.value = 0
          source.connect(processor)
          processor.connect(sink)
          sink.connect(inCtx.destination)
          setStatus("listening")
        }

        ws.onmessage = (evt) => {
          let msg
          try {
            msg = JSON.parse(evt.data)
          } catch {
            return
          }
          switch (msg.type) {
            case "audio":
              if (msg.data) {
                ensureTurn()
                playChunk(base64ToFloat32(msg.data))
              }
              break
            case "text":
              // Buffer the answer; the tick loop reveals it paced to audio.
              if (msg.content) {
                ensureTurn()
                turnTextRef.current = joinText(turnTextRef.current, msg.content)
                if (
                  !bookingSignaledRef.current &&
                  BOOKING_RE.test(turnTextRef.current)
                ) {
                  bookingSignaledRef.current = true
                  cbRef.current.onBookingIntent?.()
                }
              }
              break
            case "input_transcript":
              // Raw mic transcript is unreliable — the displayed question
              // comes from the model's own query (tool_call) instead.
              break
            case "tool_call":
              if (msg.query || msg.tool)
                cbRef.current.onUserQuestion?.(msg.query || msg.tool)
              cbRef.current.onToolCall?.(msg)
              if (
                !bookingSignaledRef.current &&
                /slot|demo|book/i.test(`${msg.tool || ""} ${msg.query || ""}`)
              ) {
                bookingSignaledRef.current = true
                cbRef.current.onBookingIntent?.()
              }
              break
            case "turn_complete":
              turnEndingRef.current = true
              if (tickRef.current == null)
                tickRef.current = requestAnimationFrame(loopRef.current)
              if (playingCountRef.current <= 0) setStatus("listening")
              break
            case "error":
              setError(msg.message || "Voice error")
              setStatus("error")
              break
            default:
              break
          }
        }

        ws.onerror = () => {
          setError("Voice connection failed.")
          setStatus("error")
        }
        ws.onclose = () => {
          if (wsRef.current === ws) {
            wsRef.current = null
            cleanup()
            setStatus((s) => (s === "error" ? s : "idle"))
          }
        }
      } catch (err) {
        cleanup()
        setError(
          err?.name === "NotAllowedError"
            ? "Microphone permission denied."
            : "Couldn't start voice. Check your mic and try again.",
        )
        setStatus("error")
      }
    },
    [cleanup, playChunk, ensureTurn],
  )

  useEffect(() => () => stop(), [stop])

  return { status, error, start, stop, sendText, isActive: status !== "idle" && status !== "error" }
}
