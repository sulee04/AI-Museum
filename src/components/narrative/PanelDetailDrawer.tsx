import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { getSpecimenById } from '@/content/specimens'
import {
  ArchiveCloseIcon,
  ArchiveIconButton,
} from '@/components/archive/ArchivePanelChrome'
import { EventArchiveDrawerBody } from '@/components/narrative/EventArchiveDrawerBody'
import { SpecimenIcon } from '@/components/specimens/SpecimenIcon'
import { useLockBackgroundScroll } from '@/hooks/useLockBackgroundScroll'
import { resolveEventById } from '@/lib/eventLookup'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Right-side expanded detail — opaque, topmost layer via portal */
export function PanelDetailDrawer() {
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const museumZone = useNarrativeStore((s) => s.museumZone)

  const event = useMemo(
    () => (expandedPanel?.kind === 'event' ? resolveEventById(expandedPanel.id) : undefined),
    [expandedPanel],
  )

  const specimen = useMemo(
    () => (expandedPanel?.kind === 'specimen' ? getSpecimenById(expandedPanel.id) : undefined),
    [expandedPanel],
  )

  const showDrawer =
    expandedPanel &&
    (museumZone === 'prologue' || humanGuiOpacity > 0.01)

  useLockBackgroundScroll(Boolean(showDrawer))

  if (!showDrawer) return null

  const isPrologueEvent = event?.calendarYear != null && museumZone === 'prologue'

  return createPortal(
    <>
      <button
        type="button"
        className="archive-drawer-backdrop fixed inset-0 z-[100]"
        aria-label="Close detail view"
        onClick={() => setExpandedPanel(null)}
      />

      <AnimatePresence>
        <motion.aside
          key={expandedPanel.id}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.42, ease: [0.25, 1, 0.5, 1] }}
          className="archive-drawer fixed top-0 right-0 z-[101] flex h-full w-full max-w-md flex-col md:max-w-xl"
        >
          <header className="archive-drawer__header">
            <div>
              <p className="archive-kicker">
                {expandedPanel.kind === 'event'
                  ? isPrologueEvent
                    ? 'Historical Archive'
                    : 'Event Archive'
                  : 'Specimen Archive'}
              </p>
              {event?.isMajor && (
                <p className="archive-meta archive-meta--major mt-2">Major ecosystem event</p>
              )}
            </div>
            <ArchiveIconButton label="Close drawer" onClick={() => setExpandedPanel(null)}>
              <ArchiveCloseIcon />
            </ArchiveIconButton>
          </header>

          <div className="archive-drawer__scroll" data-lenis-prevent>
            {event && <EventArchiveDrawerBody event={event} />}

            {specimen && (
              <div className="archive-stack">
                <header className="archive-drawer__block">
                  <h2 className="archive-title">{specimen.name}</h2>
                  <p className="archive-meta mt-2">
                    {specimen.category} · {specimen.specimenType}
                  </p>
                </header>

                <figure
                  className="archive-vitrine archive-drawer__block aspect-[16/10]"
                  style={{
                    background: `linear-gradient(155deg, ${specimen.clusterColor}10 0%, rgba(6, 11, 20, 0.5) 100%)`,
                  }}
                >
                  <SpecimenIcon type={specimen.icon} color={specimen.clusterColor} className="h-11 w-11" />
                  <figcaption className="archive-kicker">Specimen visualization</figcaption>
                </figure>

                <section className="archive-drawer__block">
                  <h3 className="archive-kicker">Description</h3>
                  <p className="archive-prose mt-3">{specimen.description}</p>
                </section>

                <section className="archive-drawer__block">
                  <h3 className="archive-kicker">Extinction cause</h3>
                  <p className="archive-prose mt-3">{specimen.extinctionCause}</p>
                </section>

                <section className="archive-drawer__block">
                  <h3 className="archive-kicker">Lifespan</h3>
                  <p className="archive-meta mt-3 tabular-nums">
                    Born AA {specimen.bornAA} — Extinct AA {specimen.extinctAA}
                  </p>
                </section>

                <section className="archive-drawer__block">
                  <h3 className="archive-kicker">Chat log excerpt</h3>
                  <div className="mt-3">
                    {specimen.chatLog.map((line, index) => (
                      <p key={index} className="archive-chat-log__line">
                        {line}
                      </p>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </motion.aside>
      </AnimatePresence>
    </>,
    document.body,
  )
}
