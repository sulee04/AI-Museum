import type { TimelineEvent } from '@/data/types'
import { cn } from '@/lib/utils'

interface EventExhibitThumbnailProps {
  event: TimelineEvent
  className?: string
}

/** Archival placeholder or photo — used in right drawer */
export function EventExhibitThumbnail({ event, className }: EventExhibitThumbnailProps) {
  const img = event.exhibitImage
  const label = img?.placeholderLabel ?? event.title

  if (img?.src) {
    return (
      <figure className={cn('archive-exhibit-thumb', className)}>
        <img src={img.src} alt={img.alt} className="archive-exhibit-thumb__photo" />
      </figure>
    )
  }

  return (
    <figure className={cn('archive-exhibit-thumb', className)} aria-label={img?.alt ?? label}>
      <div className="archive-exhibit-thumb__frame">
        <span className="archive-exhibit-thumb__glyph" aria-hidden />
        <span className="archive-exhibit-thumb__label">{label}</span>
        <span className="archive-exhibit-thumb__meta">
          Archival · {event.calendarYear != null ? `AD ${event.calendarYear}` : `AA ${event.aa ?? '—'}`}
        </span>
      </div>
    </figure>
  )
}
