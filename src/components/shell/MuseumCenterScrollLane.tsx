import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import {
  getCurrentLaneAnchor,
  getVisibleCenterLaneCards,
} from '@/lib/centerLaneLayout'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Top-center quadrant — Deep Sea–style scroll conveyor (events rise / exit) */
export function MuseumCenterScrollLane() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportHeight, setViewportHeight] = useState(320)

  const museumZone = useNarrativeStore((s) => s.museumZone)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const measure = () => setViewportHeight(el.clientHeight)
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const currentAnchor = useMemo(
    () =>
      getCurrentLaneAnchor({
        museumZone,
        prologueProgress,
        adYearSmooth,
        handoffProgress,
        aaYearSmooth,
      }),
    [museumZone, prologueProgress, adYearSmooth, handoffProgress, aaYearSmooth],
  )

  const effectiveViewport =
    viewportHeight > 64 ? viewportHeight : Math.round(window.innerHeight * 0.46)

  const cards = useMemo(
    () =>
      getVisibleCenterLaneCards({
        currentAnchor,
        viewportHeight: effectiveViewport,
      }),
    [currentAnchor, effectiveViewport],
  )

  if (humanGuiOpacity <= 0.05 || expandedPanel) return null

  const showScrollHint =
    prologueProgress < 0.02 && handoffProgress < 0.05 && museumZone === 'prologue'

  const openArchive = (eventId: string) => {
    setExpandedPanel({ kind: 'event', id: eventId })
  }

  const inHandoff =
    museumZone === 'prologue' && handoffProgress > 0.05 && handoffProgress < 0.98

  return (
    <div ref={viewportRef} className="museum-center-lane" style={{ opacity: humanGuiOpacity }}>
      <div className="museum-center-lane__viewport" aria-live="polite">
        {cards.map(({ beat, y, opacity }) => {
          const canOpen = Boolean(beat.eventId) && !inHandoff
          const isClickable = canOpen && opacity > 0.08

          const cardProps = isClickable
            ? {
                onClick: () => openArchive(beat.eventId!),
                onKeyDown: (e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openArchive(beat.eventId!)
                  }
                },
                role: 'button' as const,
                tabIndex: 0,
                'aria-label': `${beat.headline} — open archive`,
              }
            : {}

          return (
            <article
              key={beat.id}
              className={cn(
                'museum-center-lane__card',
                isClickable && 'museum-center-lane__card--clickable',
              )}
              style={
                {
                  '--lane-y': `${y}px`,
                  '--lane-opacity': opacity,
                  pointerEvents: opacity > 0.08 ? 'auto' : 'none',
                } as CSSProperties
              }
              {...cardProps}
            >
              {beat.meta && <p className="museum-text-meta">{beat.meta}</p>}
              {beat.headline ? (
                <h2 className="museum-text-lead">{beat.headline}</h2>
              ) : null}
              {beat.body && (
                <p className={cn('museum-text-body', beat.headline && 'mt-2')}>{beat.body}</p>
              )}
              {beat.detail && (
                <p className={cn('museum-text-body mt-2')}>{beat.detail}</p>
              )}
            </article>
          )
        })}
      </div>

      {showScrollHint && (
        <p className="museum-center-lane__hint museum-text-meta" aria-hidden>
          Scroll to descend ↓
        </p>
      )}
    </div>
  )
}
