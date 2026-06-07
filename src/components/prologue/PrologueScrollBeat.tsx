import { motion } from 'framer-motion'
import type { TimelineEvent } from '@/data/types'
import { ExhibitContentPanel } from '@/components/museum/ExhibitContentPanel'
import { PrologueContentShell } from '@/components/prologue/PrologueContentShell'
import { PROLOGUE_EVENT_BEAT_VH } from '@/constants/prologue'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface PrologueScrollBeatProps {
  event: TimelineEvent
  sectionLabel: string
  chapterTitle?: string
}

/** Single prologue event — tall scroll beat, content reveals on approach */
export function PrologueScrollBeat({ event, sectionLabel, chapterTitle }: PrologueScrollBeatProps) {
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)
  const isOpen = expandedPanel?.kind === 'event' && expandedPanel.id === event.id

  return (
    <div
      className="layer-content flex w-full items-center px-[var(--space-gutter)]"
      style={{ minHeight: `${PROLOGUE_EVENT_BEAT_VH}vh` }}
      data-prologue-event={event.id}
      data-prologue-year={event.calendarYear}
    >
      <PrologueContentShell>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
        >
          <ExhibitContentPanel
            theme="prologue"
            sectionLabel={sectionLabel}
            chapterTitle={chapterTitle}
            title={event.title}
            summary={event.summary}
            detail={event.detail}
            isArchiveOpen={isOpen}
            onOpenArchive={() =>
              setExpandedPanel(isOpen ? null : { kind: 'event', id: event.id })
            }
            footer={
              event.calendarYear != null ? (
                <p className="text-label-meta">
                  AD {event.calendarYear}
                </p>
              ) : undefined
            }
          />
        </motion.div>
      </PrologueContentShell>
    </div>
  )
}
