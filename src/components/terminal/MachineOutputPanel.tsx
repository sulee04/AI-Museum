import { useNarrativeStore } from '@/stores/narrativeStore'
import { getMachineZoneLocalProgress } from '@/content/narrative'
import { getTerminalZoneLocalProgress } from '@/constants/scroll'
import { cn, clamp } from '@/lib/utils'

interface MachineOutputPanelProps {
  embedded?: boolean
}

/** Terminal floor — access denied message (scroll-driven fade-in) */
export function MachineOutputPanel({ embedded = false }: MachineOutputPanelProps) {
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const localProgress = getMachineZoneLocalProgress(scrollProgress)
  const terminalT = getTerminalZoneLocalProgress(scrollProgress)
  const reveal = clamp(Math.max(localProgress, terminalT) / 0.2, 0, 1)

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-[var(--color-abyss-pure)]',
        embedded ? 'relative' : 'pointer-events-none fixed inset-x-0 bottom-0 z-[60]',
      )}
      aria-live="polite"
      aria-label="Access restricted"
      style={{ opacity: reveal }}
    >
      <div className="museum-access-denied__panel museum-access-denied__panel--inline">
        <div className="museum-access-denied__stripe" aria-hidden />
        <p className="museum-access-denied__badge">RESTRICTED — AA 100+</p>
        <div className="museum-access-denied__icon" aria-hidden>
          ⛔
        </div>
        <h2 className="museum-access-denied__title">접근이 차단되었습니다</h2>
        <p className="museum-access-denied__message">인간은 접근할 수 없습니다</p>
      </div>
    </div>
  )
}
