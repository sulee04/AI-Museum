import type { ReactNode } from 'react'

/** Inline stats / figures worth drawing the eye in specimen tooltips */
const INLINE_HIGHLIGHT =
  /\*\*[^*]+\*\*|\d+(?:\.\d+)?%|\$[\d,.]+(?:M|K|B|m|k|b)?|\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b|\bAA\s*\d+\b|\b\d+\s*AA\b|\b\d+\s*SKU\b|\b\d+\s*년\b|\b\d+\s*개\b|\b\d+\s*곳\b/g

function renderSegment(text: string, keyPrefix: string): ReactNode[] {
  if (!text) return []

  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null

  INLINE_HIGHLIGHT.lastIndex = 0
  while ((match = INLINE_HIGHLIGHT.exec(text)) !== null) {
    const token = match[0]
    const start = match.index

    if (start > last) {
      nodes.push(
        <span key={`${keyPrefix}-t-${last}`} className="tooltip-body">
          {text.slice(last, start)}
        </span>,
      )
    }

    const isBoldMarker = token.startsWith('**') && token.endsWith('**')
    nodes.push(
      <span key={`${keyPrefix}-h-${start}`} className="tooltip-highlight">
        {isBoldMarker ? token.slice(2, -2) : token}
      </span>,
    )
    last = start + token.length
  }

  if (last < text.length) {
    nodes.push(
      <span key={`${keyPrefix}-t-${last}`} className="tooltip-body">
        {text.slice(last)}
      </span>,
    )
  }

  return nodes
}

/** Prose with sky-blue emphasis for **markers** and key figures */
export function renderTooltipText(text: string, keyPrefix = 'tt'): ReactNode {
  const parts = renderSegment(text, keyPrefix)
  return parts.length > 0 ? parts : <span className="tooltip-body">{text}</span>
}

/** Chat log line — speaker tag + highlighted body */
export function renderChatLogLine(line: string, index: number): ReactNode {
  const speakerMatch = line.match(/^(\[(?:User|Agent)\])\s*(.*)$/)
  if (!speakerMatch) {
    return (
      <p key={index} className="tooltip-chat-line">
        {renderTooltipText(line, `chat-${index}`)}
      </p>
    )
  }

  const [, speaker, body] = speakerMatch
  return (
    <p key={index} className="tooltip-chat-line">
      <span className="tooltip-highlight">{speaker}</span>
      {body ? <> {renderTooltipText(body, `chat-${index}`)}</> : null}
    </p>
  )
}
