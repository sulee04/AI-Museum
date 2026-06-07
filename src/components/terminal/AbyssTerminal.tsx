import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  ABYSS_PHASE_1_CLI,
  ABYSS_PHASE_1_INFO,
  ABYSS_PHASE_1_JSON,
  ABYSS_PHASE_1_SYS,
  ABYSS_PHASE_2_CHAR_MS,
  ABYSS_PHASE_2_LINE_PAUSE_MS,
  ABYSS_PHASE_2_LINES,
} from '@/content/abyssTerminal'
import { useNarrativeStore } from '@/stores/narrativeStore'
import '@/styles/abyss-terminal.css'

type HighlightRule = { pattern: RegExp; className: string }

const HIGHLIGHT_RULES: HighlightRule[] = [
  { pattern: /\[SYS_INTERRUPT\]/g, className: 'terminal-accent-alert font-semibold' },
  { pattern: /\[WARN\]/g, className: 'terminal-accent-warn font-semibold' },
  { pattern: /\[VERIFYING\.\.\.\]/g, className: 'terminal-accent-ok' },
  { pattern: /\[ACTION\]/g, className: 'terminal-accent-warn font-semibold' },
  { pattern: /EXTINCT/g, className: 'terminal-accent-alert font-semibold' },
  { pattern: /UNAUTHORIZED BIOLOGICAL INPUT \(MOUSE_MOVE\)/g, className: 'terminal-accent-warn' },
  { pattern: /GHOST SIGNAL/g, className: 'terminal-accent-alert' },
  { pattern: /ANOMALY DETECTED/g, className: 'terminal-accent-alert' },
]

function renderPhase2Highlighted(text: string) {
  if (!text) return null

  const matches: Array<{ start: number; end: number; className: string }> = []
  for (const rule of HIGHLIGHT_RULES) {
    rule.pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = rule.pattern.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        className: rule.className,
      })
    }
  }

  matches.sort((a, b) => a.start - b.start)

  const parts: ReactNode[] = []
  let cursor = 0

  for (const m of matches) {
    if (m.start < cursor) continue
    if (m.start > cursor) {
      parts.push(
        <span key={`b-${cursor}`} className="terminal-line-log">
          {text.slice(cursor, m.start)}
        </span>,
      )
    }
    parts.push(
      <span key={`h-${m.start}`} className={m.className}>
        {text.slice(m.start, m.end)}
      </span>,
    )
    cursor = m.end
  }

  if (cursor < text.length) {
    parts.push(
      <span key={`t-${cursor}`} className="terminal-line-log">
        {text.slice(cursor)}
      </span>,
    )
  }

  return parts.length > 0 ? parts : <span className="terminal-line-log">{text}</span>
}

function JsonBlock({ json }: { json: string }) {
  return (
    <pre className="abyss-terminal-line terminal-line-json">
      {json.split(/("EXTINCT"|"ERR_NOT_FOUND")/g).map((segment, i) => {
        if (segment === '"EXTINCT"') {
          return (
            <span key={i} className="terminal-accent-alert font-semibold">
              {segment}
            </span>
          )
        }
        if (segment === '"ERR_NOT_FOUND"') {
          return (
            <span key={i} className="terminal-accent-warn">
              {segment}
            </span>
          )
        }
        return <span key={i}>{segment}</span>
      })}
    </pre>
  )
}

function TerminalCursor() {
  return (
    <span className="abyss-terminal-cursor" aria-hidden>
      █
    </span>
  )
}

interface AbyssTerminalProps {
  onTypingUpdate?: () => void
}

/** Unified abyss CLI — phase 1 static log + idle cursor + phase 2 ghost signal */
export function AbyssTerminal({ onTypingUpdate }: AbyssTerminalProps) {
  const ghostSignalReacted = useNarrativeStore((s) => s.ghostSignalReacted)
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)

  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    if (!ghostSignalReacted) {
      setLineIndex(0)
      setCharCount(0)
      setTypingDone(false)
      return
    }

    if (reducedMotion) {
      setLineIndex(ABYSS_PHASE_2_LINES.length - 1)
      setCharCount(ABYSS_PHASE_2_LINES[ABYSS_PHASE_2_LINES.length - 1]!.length)
      setTypingDone(true)
    } else {
      setLineIndex(0)
      setCharCount(0)
      setTypingDone(false)
    }
  }, [ghostSignalReacted, reducedMotion])

  useEffect(() => {
    if (!ghostSignalReacted || reducedMotion || typingDone) return

    const line = ABYSS_PHASE_2_LINES[lineIndex]
    if (!line) {
      setTypingDone(true)
      return
    }

    if (charCount < line.length) {
      const timer = window.setTimeout(() => {
        setCharCount((c) => c + 1)
        onTypingUpdate?.()
      }, ABYSS_PHASE_2_CHAR_MS)
      return () => window.clearTimeout(timer)
    }

    if (lineIndex < ABYSS_PHASE_2_LINES.length - 1) {
      const timer = window.setTimeout(() => {
        setLineIndex((i) => i + 1)
        setCharCount(0)
        onTypingUpdate?.()
      }, ABYSS_PHASE_2_LINE_PAUSE_MS)
      return () => window.clearTimeout(timer)
    }

    setTypingDone(true)
  }, [ghostSignalReacted, reducedMotion, typingDone, lineIndex, charCount, onTypingUpdate])

  const renderPhase2Line = (line: string, i: number) => {
    const isComplete =
      reducedMotion || i < lineIndex || (i === lineIndex && typingDone)
    const isActive = ghostSignalReacted && i === lineIndex && !isComplete

    if (isComplete) {
      return (
        <pre key={`p2-${i}`} className="abyss-terminal-line">
          {renderPhase2Highlighted(line)}
        </pre>
      )
    }

    if (isActive) {
      const visible = line.slice(0, charCount)
      const showCursor = !typingDone
      return (
        <pre key={`p2-${i}`} className="abyss-terminal-line">
          {visible ? renderPhase2Highlighted(visible) : null}
          {showCursor && <TerminalCursor />}
        </pre>
      )
    }

    return null
  }

  return (
    <div
      className="abyss-terminal-screen"
      role="log"
      aria-label="Humanity status archive and system response"
    >
      {ABYSS_PHASE_1_SYS.map((line) => (
        <pre key={line} className="abyss-terminal-line">
          <span className="text-[var(--color-terminal-sys)]">[SYS]</span>
          <span className="terminal-line-log">{line.slice(5)}</span>
        </pre>
      ))}

      <pre className="abyss-terminal-line terminal-line-cli">{ABYSS_PHASE_1_CLI}</pre>

      <JsonBlock json={ABYSS_PHASE_1_JSON} />

      {ABYSS_PHASE_1_INFO.map((line) => (
        <pre key={line} className="abyss-terminal-line">
          <span className="text-[var(--color-terminal-sys)]">[INFO]</span>
          <span
            className={cn(
              line.includes('DORMANT') ? 'text-[var(--color-terminal-sys)]' : 'terminal-line-log',
            )}
          >
            {line.slice(6)}
          </span>
        </pre>
      ))}

      {!ghostSignalReacted && (
        <pre className="abyss-terminal-line" aria-hidden>
          <TerminalCursor />
        </pre>
      )}

      {ghostSignalReacted &&
        ABYSS_PHASE_2_LINES.map((line, i) => renderPhase2Line(line, i))}
    </div>
  )
}
