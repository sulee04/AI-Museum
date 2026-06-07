import { useEffect, useMemo } from 'react'
import { useDocumentScrollY } from '@/hooks/useDocumentScrollY'
import {
  getEcoRevealFromTimeline,
  getHandoffBurstIntensity,
  getTimelineRailProgress,
} from '@/lib/timelineRailProgress'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Sync museum zone + handoff-driven palette reveal on document root */
export function ThemeProvider() {
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

  const ecoRevealBoosted = Math.min(1, ecoReveal + burstWave * 0.06)
  const ecoRevealing = ecoRevealBoosted > 0.02 && ecoRevealBoosted < 0.98

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-museum-zone', museumZone)
    root.style.setProperty('--eco-reveal', String(ecoRevealBoosted))
    root.style.setProperty('--handoff-burst', String(burstWave))
    root.style.setProperty('--timeline-p', String(timelineP))

    if (ecoRevealing) {
      root.setAttribute('data-eco-revealing', 'true')
    } else {
      root.removeAttribute('data-eco-revealing')
    }
  }, [museumZone, ecoRevealBoosted, ecoRevealing, burstWave, timelineP])

  return null
}
