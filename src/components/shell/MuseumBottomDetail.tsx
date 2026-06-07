import { useMemo } from 'react'
import { getPrologueExhibitImageSrc } from '@/data/prologueExhibits'
import { getNearestIntroEvent } from '@/lib/prologueTimeline'
import { cn } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Bottom quadrant — prologue archive panel (image + extended copy) */
export function MuseumBottomDetail() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)

  const active = useMemo(() => getNearestIntroEvent(adYearSmooth), [adYearSmooth])

  const inPrologueSector = museumZone === 'prologue' && handoffProgress < 0.92

  if (
    !inPrologueSector ||
    !active ||
    expandedPanel ||
    humanGuiOpacity <= 0.05 ||
    active.opacity < 0.08
  ) {
    return null
  }

  const imageSrc = getPrologueExhibitImageSrc(active.event.id)
  const handoffFade =
    handoffProgress > 0.35 ? 1 - Math.min(1, (handoffProgress - 0.35) / 0.5) : 1

  return (
    <div
      className="museum-shell__bottom-detail"
      style={{ opacity: humanGuiOpacity * handoffFade * active.opacity }}
    >
      <div className="museum-prologue-panel">
        <figure className="museum-prologue-panel__media">
          <img
            src={imageSrc}
            alt={active.event.title}
            className="museum-prologue-panel__img"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="museum-prologue-panel__copy">
          <h3 className="museum-prologue-panel__title museum-text-lead">{active.event.title}</h3>
          <p className="museum-text-body">{active.event.detail ?? active.event.summary}</p>
          <button
            type="button"
            className={cn('museum-prologue-panel__archive museum-text-meta')}
            onClick={() => setExpandedPanel({ kind: 'event', id: active.event.id })}
          >
            Open full archive →
          </button>
        </div>
      </div>
    </div>
  )
}
