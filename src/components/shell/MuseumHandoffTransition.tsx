import { useNarrativeStore } from '@/stores/narrativeStore'

/** Full-screen flash + sweep while crossing the title gate (prologue → ecosystem) */
export function MuseumHandoffTransition() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)

  const inHandoff =
    museumZone === 'prologue' && handoffProgress > 0.06 && handoffProgress < 0.94

  if (!inHandoff) return null

  const p = handoffProgress
  const flash = Math.sin(p * Math.PI) * 0.72
  const sweep = Math.min(1, Math.max(0, (p - 0.12) / 0.76))
  const labelOpacity = Math.sin(p * Math.PI) * 0.95

  return (
    <div className="museum-handoff" aria-hidden>
      <div className="museum-handoff__flash" style={{ opacity: flash }} />
      <div
        className="museum-handoff__sweep"
        style={{ transform: `scaleX(${sweep})` }}
      />
      <p className="museum-handoff__label" style={{ opacity: labelOpacity }}>
        Entering the AA ecosystem
      </p>
    </div>
  )
}
