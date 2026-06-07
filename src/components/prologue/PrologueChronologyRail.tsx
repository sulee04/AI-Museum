import { useCallback, useMemo } from 'react'
import { useLenis } from '@/app/providers/SmoothScrollProvider'
import { ChronologyNav } from '@/components/museum/ChronologyNav'
import type { TimelineEvent } from '@/data/types'
import { getAllIntroEventsChronological, scrollToPrologueAD } from '@/lib/prologueTimeline'
import { clamp } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Fixed left chronology — scrollable within viewport, click-to-jump */
export function PrologueChronologyRail() {
  const lenis = useLenis()
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)

  const allEvents = useMemo(() => getAllIntroEventsChronological(), [])

  const handleEventSelect = useCallback(
    (event: TimelineEvent) => {
      if (event.calendarYear == null) return
      scrollToPrologueAD(event.calendarYear, lenis)
    },
    [lenis],
  )

  const inTrack = prologueProgress >= 0 && prologueProgress < 0.94
  const fadeOut = clamp((0.94 - prologueProgress) / 0.08, 0, 1)

  if (museumZone !== 'prologue' || !inTrack) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-24 bottom-0 z-20 hidden lg:flex flex-col px-[var(--space-gutter)]"
      style={{ opacity: fadeOut }}
    >
      <div className="content-max grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
        <div
          data-lenis-prevent
          className="pointer-events-auto min-h-0 overflow-y-auto overscroll-contain pl-3 pb-24 pr-2 [scrollbar-width:thin]"
        >
          <ChronologyNav
            theme="prologue"
            embedMode="fixed"
            sectionLabel="Chronology"
            events={allEvents}
            activeYear={adYearSmooth}
            onEventSelect={handleEventSelect}
          />
        </div>
        <div className="min-w-0" aria-hidden />
      </div>
    </div>
  )
}
