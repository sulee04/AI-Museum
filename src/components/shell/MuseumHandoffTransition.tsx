import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { useDocumentScrollY } from '@/hooks/useDocumentScrollY'
import {
  getEcoRevealFromTimeline,
  getHandoffBurstIntensity,
  getTimelineRailProgress,
} from '@/lib/timelineRailProgress'
import { useNarrativeStore } from '@/stores/narrativeStore'

function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

/** Gradual wash from timeline head — mid-tone bridge between prologue and ecosystem UI */
export function MuseumHandoffTransition() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const scrollY = useDocumentScrollY()

  const timelineP = useMemo(
    () => getTimelineRailProgress({ scrollY }),
    [scrollY],
  )

  const ecoReveal = useMemo(
    () => getEcoRevealFromTimeline({ museumZone, handoffProgress, timelineP }),
    [museumZone, handoffProgress, timelineP],
  )

  const burstWave = useMemo(
    () => getHandoffBurstIntensity(handoffProgress),
    [handoffProgress],
  )

  const inHandoff =
    museumZone === 'prologue' && handoffProgress > 0.08 && handoffProgress < 0.96

  if (museumZone === 'ecosystem' || !inHandoff) return null

  const envelope = smoothstep(Math.sin(((handoffProgress - 0.08) / 0.88) * Math.PI))
  const revealEase = ecoReveal * envelope
  const flash = revealEase * 0.22 + burstWave * 0.2
  const burstOpacity = revealEase * 0.26 + burstWave * 0.18
  const burstScale = 0.42 + revealEase * 1.1 + burstWave * 0.35
  const washOpacity = revealEase * 0.38 + burstWave * 0.12

  const headLeft = `${timelineP * 100}%`

  return (
    <div
      className="museum-handoff"
      aria-hidden
      style={
        {
          '--timeline-head-x': headLeft,
          '--handoff-reveal': revealEase,
          '--handoff-burst': burstWave,
        } as CSSProperties
      }
    >
      {(washOpacity > 0.02 || flash > 0.02 || burstOpacity > 0.02) && (
        <>
          <div className="museum-handoff__wash" style={{ opacity: washOpacity }} />
          <div className="museum-handoff__flash" style={{ opacity: flash }} />
          <div
            className="museum-handoff__burst"
            style={{
              opacity: burstOpacity,
              transform: `translate(-50%, -50%) scale(${burstScale})`,
            }}
          />
        </>
      )}
    </div>
  )
}
