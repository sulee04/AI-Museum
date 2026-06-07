import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MuseumExhibitShell } from '@/components/museum/MuseumExhibitShell'
import { ExhibitContentPanel } from '@/components/museum/ExhibitContentPanel'
import { ChronologyNav } from '@/components/museum/ChronologyNav'
import { INTRO_SECTIONS } from '@/data/introTimeline'
import { getActiveIntroEvent, getAllIntroEventsChronological } from '@/lib/prologueTimeline'
import { clamp } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Prologue exhibit overlay — hidden during hero opener & title gate */
export function PrologueLayer() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)

  const active = useMemo(() => getActiveIntroEvent(adYearSmooth), [adYearSmooth])
  const allEvents = useMemo(() => getAllIntroEventsChronological(), [])

  const inTrack = prologueProgress > 0.03 && prologueProgress < 0.94
  const fadeOut = clamp((0.94 - prologueProgress) / 0.08, 0, 1)

  if (museumZone !== 'prologue' || !inTrack) return null

  const currentSection = INTRO_SECTIONS.find((section) =>
    section.events.some((e) => e.id === active?.event.id),
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      style={{ opacity: fadeOut }}
    >
      <MuseumExhibitShell
        theme="prologue"
        className="h-full"
        chronology={
          <ChronologyNav
            theme="prologue"
            sectionLabel="Chronology"
            events={allEvents}
            activeYear={adYearSmooth}
            className="pointer-events-auto"
          />
        }
      >
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: active.opacity, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            >
              <ExhibitContentPanel
                theme="prologue"
                sectionLabel={active.sectionLabel}
                chapterTitle={currentSection?.title}
                title={active.event.title}
                summary={active.event.summary}
                detail={active.event.detail}
                footer={
                  <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--color-prologue-dim)]">
                    AD {active.event.calendarYear}
                  </p>
                }
              />
            </motion.div>
          ) : (
            <motion.div
              key="prologue-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
            >
              <ExhibitContentPanel
                theme="prologue"
                sectionLabel="Prologue"
                title="연대기를 따라가세요"
                summary={`스크롤하면 AD ${Math.round(adYearSmooth)}년으로 이동합니다.`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MuseumExhibitShell>
    </div>
  )
}
