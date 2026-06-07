import type { TimelineEvent } from '@/data/types'

export function EventExhibitImage({ event }: { event: TimelineEvent }) {
  const img = event.exhibitImage
  const label = img?.placeholderLabel ?? event.title

  if (img?.src) {
    return (
      <figure className="overflow-hidden rounded-sm border border-[var(--color-deep)]">
        <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
        {img.alt && <figcaption className="px-2 py-1.5 text-label-meta">{img.alt}</figcaption>}
      </figure>
    )
  }

  return (
    <figure
      className="flex aspect-[4/3] flex-col items-center justify-center rounded-sm border border-[var(--color-deep)] bg-gradient-to-br from-[#0a1628] via-[#061018] to-[#020508] p-4"
      aria-label={img?.alt ?? label}
    >
      <span className="text-label opacity-60">Exhibit Archive</span>
      <span className="mt-2 text-center text-label-meta">{label}</span>
      <span className="mt-3 text-label-meta tabular-nums">AA {event.aa ?? '—'}</span>
    </figure>
  )
}
