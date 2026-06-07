import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface TypingLogLineProps {
  text: string
  typeProgress: number
  type: 'log' | 'cli' | 'json' | 'error' | 'system'
  className?: string
  /** Keep line height even before reveal — prevents terminal block from growing while scrolling */
  reserveSpace?: boolean
}

const typeClass = {
  log: 'terminal-line-log',
  cli: 'terminal-line-cli',
  json: 'terminal-line-json',
  error: 'terminal-line-error',
  system: 'terminal-line-system',
} as const

export function TypingLogLine({
  text,
  typeProgress,
  type,
  className,
  reserveSpace = false,
}: TypingLogLineProps) {
  const visibleChars = useMemo(
    () => Math.min(text.length, Math.floor(text.length * typeProgress * 1.15)),
    [text, typeProgress],
  )

  const display = text.slice(0, visibleChars)
  const showCursor = typeProgress > 0 && typeProgress < 1 && visibleChars < text.length

  return (
    <pre
      className={cn(
        'm-0 whitespace-pre-wrap font-mono text-[11px] leading-[1.65] tracking-[0.02em]',
        typeClass[type],
        reserveSpace && typeProgress <= 0 && 'opacity-0',
        className,
      )}
      aria-hidden={reserveSpace && typeProgress <= 0 ? true : undefined}
    >
      {reserveSpace && typeProgress <= 0 ? (
        <span className="invisible select-none">{text}</span>
      ) : (
        <>
          {display}
          {showCursor && (
            <span className="ml-px inline-block w-[0.45em] animate-pulse bg-[var(--color-terminal)]/75" aria-hidden>
              {' '}
            </span>
          )}
        </>
      )}
    </pre>
  )
}
