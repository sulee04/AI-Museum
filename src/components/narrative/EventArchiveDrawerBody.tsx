import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TimelineEvent } from '@/data/types'
import { ArchiveMetaChip } from '@/components/archive/ArchivePanelChrome'
import { EventExhibitThumbnail } from '@/components/narrative/EventExhibitThumbnail'
import { DummyWorldMap } from '@/components/narrative/DummyWorldMap'
import { getTopicForKey } from '@/data/tagTopics'
import { cn } from '@/lib/utils'

interface EventArchiveDrawerBodyProps {
  event: TimelineEvent
}

function TopicTag({
  label,
  active,
  onClick,
  hash = true,
}: {
  label: string
  active: boolean
  onClick: () => void
  hash?: boolean
}) {
  const display = hash ? (label.startsWith('#') ? label : `#${label}`) : label

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn('archive-tag', active && 'archive-tag--active')}
    >
      {display}
    </button>
  )
}

/** Event sections in the right drawer — typography-led layout */
export function EventArchiveDrawerBody({ event }: EventArchiveDrawerBodyProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  useEffect(() => {
    setActiveTopic(null)
  }, [event.id])

  const toggleTopic = (key: string) => {
    setActiveTopic((current) => (current === key ? null : key))
  }

  const defaultSections =
    event.expandedDetail?.sections ?? [{ title: 'Summary', body: event.detail ?? event.summary }]

  const topicEntry = activeTopic ? getTopicForKey(activeTopic) : null

  return (
    <div className="archive-stack">
      <header className="archive-drawer__block">
        <h2 className="archive-title">{event.expandedDetail?.headline ?? event.title}</h2>
        <p className="archive-meta-row mt-3">
          {event.calendarYear != null && (
            <ArchiveMetaChip variant="accent">AD {event.calendarYear}</ArchiveMetaChip>
          )}
          {event.aa != null && <ArchiveMetaChip variant="accent">AA {event.aa}</ArchiveMetaChip>}
          {event.tags?.map((tag, index) => (
            <span key={tag} className="inline-flex items-center">
              {(index > 0 || event.calendarYear != null || event.aa != null) && (
                <span className="archive-meta-sep" aria-hidden>
                  ·
                </span>
              )}
              <TopicTag label={tag} active={activeTopic === tag} onClick={() => toggleTopic(tag)} />
            </span>
          ))}
        </p>
      </header>

      <figure className="archive-drawer__block">
        <EventExhibitThumbnail event={event} className="max-w-sm" />
      </figure>

      {event.expandedDetail?.mapRegions && !activeTopic && (
        <section className="archive-drawer__block">
          <h3 className="archive-kicker">Geographic footprint</h3>
          <DummyWorldMap regions={event.expandedDetail.mapRegions} className="mt-4" />
        </section>
      )}

      <AnimatePresence mode="wait">
        {topicEntry ? (
          <motion.section
            key={`topic-${activeTopic}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="archive-drawer__block"
          >
            <h3 className="archive-kicker">{topicEntry.title}</h3>
            <p className="archive-prose mt-3">{topicEntry.body}</p>
            <button type="button" onClick={() => setActiveTopic(null)} className="archive-link mt-5">
              Back to event record
            </button>
          </motion.section>
        ) : (
          <motion.div
            key="default-sections"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="archive-stack archive-stack--tight"
          >
            {defaultSections.map((section) => (
              <section key={section.title} className="archive-drawer__block">
                <h3 className="archive-kicker">{section.title}</h3>
                <p className="archive-prose mt-3">{section.body}</p>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {event.ecosystemImpact && (
        <section className="archive-drawer__block">
          <h3 className="archive-kicker">Ecosystem impact</h3>
          <p className="archive-prose archive-prose--accent mt-3">{event.ecosystemImpact.description}</p>
          {event.ecosystemImpact.affectedCategories && (
            <p className="archive-meta-row mt-4">
              {event.ecosystemImpact.affectedCategories.map((cat, index) => (
                <span key={cat} className="inline-flex items-center">
                  {index > 0 && (
                    <span className="archive-meta-sep" aria-hidden>
                      ·
                    </span>
                  )}
                  <TopicTag
                    label={cat}
                    hash={false}
                    active={activeTopic === cat}
                    onClick={() => toggleTopic(cat)}
                  />
                </span>
              ))}
            </p>
          )}
        </section>
      )}
    </div>
  )
}
