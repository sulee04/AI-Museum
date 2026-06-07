import { useMemo, type CSSProperties } from 'react'
import { getTerminalZoneLocalProgress } from '@/constants/scroll'
import { clamp } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** AA 100+ — human access blocked warning (replaces terminal code stream) */
export function AccessDeniedOverlay() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)

  const terminalT = getTerminalZoneLocalProgress(scrollProgress)

  const visible = useMemo(() => {
    if (museumZone !== 'ecosystem' || terminalT <= 0) return false
    return humanGuiOpacity < 0.85 || terminalT > 0.08
  }, [museumZone, terminalT, humanGuiOpacity])

  const panelOpacity = clamp(terminalT / 0.18, 0, 1)
  const backdropOpacity = clamp(terminalT / 0.25, 0, 0.72)

  if (!visible) return null

  return (
    <div
      className="museum-access-denied"
      style={{ '--access-backdrop': backdropOpacity, '--access-panel': panelOpacity } as CSSProperties}
      aria-hidden={panelOpacity < 0.2}
    >
      <div className="museum-access-denied__backdrop" />
      <div
        className="museum-access-denied__panel"
        role="alertdialog"
        aria-labelledby="access-denied-title"
        aria-describedby="access-denied-desc"
      >
        <div className="museum-access-denied__stripe" aria-hidden />
        <p className="museum-access-denied__badge">RESTRICTED — AA 100+</p>
        <div className="museum-access-denied__icon" aria-hidden>
          ⛔
        </div>
        <h2 id="access-denied-title" className="museum-access-denied__title">
          접근이 차단되었습니다
        </h2>
        <p id="access-denied-desc" className="museum-access-denied__message">
          인간은 접근할 수 없습니다
        </p>
        <p className="museum-access-denied__meta">
          이 구역은 기계 관측 전용입니다. 생물학적 입력은 기록 후 무시됩니다.
        </p>
      </div>
    </div>
  )
}
