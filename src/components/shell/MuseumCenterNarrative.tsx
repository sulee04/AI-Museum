import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPrologueExhibitImageSrc } from '@/data/prologueExhibits'
import { resolveEventById } from '@/lib/eventLookup'
import { getActiveNarrative } from '@/lib/activeNarrative'
import { cn } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

const NARRATIVE_TRANSITION = { duration: 0.14, ease: [0.4, 0, 0.2, 1] as const }

function useActiveNarrative() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)

  return useMemo(
    () =>
      getActiveNarrative({
        museumZone,
        prologueProgress,
        adYearSmooth,
        aaYearSmooth,
        handoffProgress,
        humanGuiOpacity,
      }),
    [museumZone, prologueProgress, adYearSmooth, aaYearSmooth, handoffProgress, humanGuiOpacity],
  )
}

/** Top-center quadrant — headline + short description; brief fade on swap only */
export function MuseumCenterNarrative() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)
  const narrative = useActiveNarrative()

  if (!narrative || expandedPanel || narrative.opacity < 0.02) return null

  const handoffScale = 1 + Math.sin(handoffProgress * Math.PI) * 0.04
  const canOpenArchive = Boolean(narrative.eventId) && museumZone === 'ecosystem'

  const openArchive = () => {
    if (!narrative.eventId) return
    setExpandedPanel({ kind: 'event', id: narrative.eventId })
  }

  return (
    <div
      className="museum-shell__center-narrative"
      style={{
        opacity: humanGuiOpacity,
        transform: handoffProgress > 0.05 ? `scale(${handoffScale})` : undefined,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={narrative.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={NARRATIVE_TRANSITION}
        >
          {narrative.meta && <p className="museum-text-meta">{narrative.meta}</p>}
          {narrative.headline ? (
            <h2 className="museum-text-lead">{narrative.headline}</h2>
          ) : null}
          {narrative.body && (
            <p className={cn('museum-text-body', narrative.headline && 'mt-2')}>
              {narrative.body}
            </p>
          )}
          {canOpenArchive && narrative.detail && (
            <p
              className={cn('museum-text-body mt-3 museum-center-detail--interactive')}
              onClick={openArchive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openArchive()
                }
              }}
              role="button"
              tabIndex={0}
            >
              {narrative.detail}
            </p>
          )}
          {canOpenArchive && (
            <p
              className="museum-text-meta mt-3 museum-center-detail--interactive"
              onClick={openArchive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openArchive()
                }
              }}
              role="button"
              tabIndex={0}
            >
              Open full archive →
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Bottom quadrant — prologue exhibit with image + extended copy */
export function MuseumBottomDetail() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)
  const narrative = useActiveNarrative()

  const inPrologueSector =
    museumZone === 'prologue' || (handoffProgress > 0.05 && handoffProgress < 0.98)

  if (!inPrologueSector || !narrative?.detail || expandedPanel || humanGuiOpacity <= 0.05) {
    return null
  }

  if (narrative.opacity < 0.02) return null

  const handoffFade =
    handoffProgress > 0.3 ? 1 - Math.min(1, (handoffProgress - 0.3) / 0.45) : 1
  const combinedOpacity = humanGuiOpacity * handoffFade
  const canOpenArchive = Boolean(narrative.eventId)
  const event = narrative.eventId ? resolveEventById(narrative.eventId) : undefined

  const imageSrc = narrative.eventId ? getPrologueExhibitImageSrc(narrative.eventId) : null
  const imageAlt = event?.exhibitImage?.alt ?? narrative.headline
  const sections = event?.expandedDetail?.sections ?? []
  const panelHeadline = event?.expandedDetail?.headline ?? narrative.headline

  const openArchive = () => {
    if (!narrative.eventId) return
    setExpandedPanel({ kind: 'event', id: narrative.eventId })
  }

  return (
    <div className="museum-shell__bottom-detail" style={{ opacity: combinedOpacity }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={narrative.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={NARRATIVE_TRANSITION}
          className="museum-prologue-panel"
        >
          {imageSrc && (
            <figure className="museum-prologue-panel__media">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="museum-prologue-panel__img"
                loading="lazy"
                decoding="async"
              />
              {event?.exhibitImage?.placeholderLabel && (
                <figcaption className="museum-prologue-panel__caption museum-text-meta">
                  {event.exhibitImage.placeholderLabel}
                </figcaption>
              )}
            </figure>
          )}

          <div className="museum-prologue-panel__copy">
            {panelHeadline && (
              <h3 className="museum-prologue-panel__title museum-text-lead">{panelHeadline}</h3>
            )}
            <p className="museum-text-body">{narrative.detail}</p>
            {sections.slice(0, 2).map((section) => (
              <div key={section.title} className="museum-prologue-panel__section">
                <p className="museum-text-meta">{section.title}</p>
                <p className="museum-text-body mt-1">{section.body}</p>
              </div>
            ))}
            {canOpenArchive && (
              <button
                type="button"
                className="museum-prologue-panel__archive museum-text-meta"
                onClick={openArchive}
              >
                Open full archive →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
