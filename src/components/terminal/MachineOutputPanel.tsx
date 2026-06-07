import { useMemo } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { getMachineZoneLocalProgress } from '@/content/narrative'
import {
  getLineTypeProgress,
  MACHINE_LOG_LINES,
} from '@/content/machineLogs'
import { TypingLogLine } from '@/components/terminal/TypingLogLine'
import { cn } from '@/lib/utils'

interface MachineOutputPanelProps {
  embedded?: boolean
}

/** Fixed-height terminal log — all lines reserved; reveal tied to scroll only */
export function MachineOutputPanel({ embedded = false }: MachineOutputPanelProps) {
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const localProgress = getMachineZoneLocalProgress(scrollProgress)

  const lines = useMemo(() => MACHINE_LOG_LINES, [])

  return (
    <div
      className={cn(
        'h-full w-full bg-[var(--color-abyss-pure)]',
        embedded ? 'relative' : 'pointer-events-none fixed inset-x-0 bottom-0 z-[60]',
      )}
      aria-live="polite"
      aria-label="Machine output stream"
    >
      <div
        className="flex h-full flex-col border-t border-[var(--color-deep)] bg-[var(--color-abyss-pure)]"
        style={{ fontFamily: "'Courier New', Courier, 'Liberation Mono', monospace" }}
      >
        <div className="shrink-0 border-b border-[var(--color-deep)] px-[var(--space-gutter)] py-2">
          <p className="terminal-header-label text-[9px] tracking-[0.32em] text-[var(--color-terminal-sys)] uppercase font-['Courier_New',Courier,monospace]">
            machine.output.stream — post_human_maintenance.log
          </p>
        </div>
        <div className="min-h-0 flex-1 px-[var(--space-gutter)] py-4">
          <div className="space-y-1.5">
            {lines.map((line, index) => {
              const nextAt = lines[index + 1]?.at ?? Math.min(1, line.at + 0.04)
              const typeProgress = getLineTypeProgress(localProgress, line.at, nextAt)

              return (
                <TypingLogLine
                  key={line.id}
                  text={line.content}
                  type={line.type}
                  typeProgress={typeProgress}
                  reserveSpace
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
