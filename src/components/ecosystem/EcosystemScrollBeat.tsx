import { useRef } from 'react'
import type { TimelineEvent } from '@/data/types'
import { ECOSYSTEM_EVENT_BEAT_VH, ECOSYSTEM_SCROLL_VH } from '@/constants/ecosystemScroll'
import { cn } from '@/lib/utils'
import { useViewportReadableOpacity } from '@/hooks/useViewportReadableOpacity'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface EcosystemScrollBeatProps {
  event: TimelineEvent
  side: 'left' | 'right'
}

/** Deep Sea–style margin fact — small text, AA-anchored, fades before top third */
export function EcosystemScrollBeat({ event, side }: EcosystemScrollBeatProps) {
  const ref = useRef<HTMLElement>(null)
  const opacity = useViewportReadableOpacity(ref)
  const selectedEventId = useNarrativeStore((s) => s.selectedEventId)
  const setSelectedEventId = useNarrativeStore((s) => s.setSelectedEventId)
  const isSelected = selectedEventId === event.id

  const anchorTop = ((event.aa ?? 0) / 100) * ECOSYSTEM_SCROLL_VH

  return (
    <article
      ref={ref}
      className="pointer-events-none absolute inset-x-0 flex px-[var(--space-gutter)]"
      style={{
        top: `${anchorTop}vh`,
        minHeight: `${ECOSYSTEM_EVENT_BEAT_VH}vh`,
        transform: 'translateY(-30%)',
        opacity,
      }}
      data-ecosystem-event={event.id}
      data-ecosystem-aa={event.aa}
    >
      <div
        className={cn(
          'content-max flex w-full',
          side === 'left' ? 'justify-start' : 'justify-end',
        )}
      >
        <button
          type="button"
          onClick={() => setSelectedEventId(isSelected ? null : event.id, side)}
          style={{ pointerEvents: opacity > 0.08 ? 'auto' : 'none' }}
          className={cn(
            'max-w-[min(100%,18rem)] text-left transition-colors md:max-w-xs',
            side === 'right' && 'text-right',
            isSelected ? 'text-[var(--color-biolum)]' : 'text-[var(--color-text)] hover:text-[var(--color-biolum)]',
          )}
        >
          {event.aa != null && (
            <span className="text-label-meta tabular-nums text-[var(--color-muted)]">
              AA {event.aa}
            </span>
          )}
          <p className="mt-1 text-body-lg font-medium leading-snug">{event.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
            {event.summary}
          </p>
        </button>
      </div>
    </article>
  )
}
