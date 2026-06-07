import type { EntityStatus, EventSubject } from '@/data/types'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'
import { cn } from '@/lib/utils'

const SUBJECT_LABEL: Record<EventSubject, string> = {
  human_event: 'Human Event',
  ai_evolution: 'AI Evolution',
}

const STATUS_LABEL: Record<EntityStatus, string> = {
  survived: 'Survived',
  extinct: 'Extinct',
  mutated: 'Mutated',
}

const SUBJECT_CLASS: Record<EventSubject, string> = {
  human_event: 'text-[var(--color-text)]',
  ai_evolution: 'text-[var(--color-biolum)]',
}

export interface MuseumPanelProps {
  id?: string
  label?: string
  title: string
  summary: string
  detail?: string
  subject: EventSubject
  status: EntityStatus
  aa?: number
  calendarYear?: number
  tags?: string[]
  className?: string
}

export function MuseumPanel({
  id,
  label,
  title,
  summary,
  detail,
  subject,
  status,
  aa,
  calendarYear,
  tags,
  className,
}: MuseumPanelProps) {
  return (
    <article
      id={id}
      className={cn(
        'tooltip-panel overflow-hidden rounded-sm border border-[rgba(11,21,38,0.95)]',
        'bg-gradient-to-b from-[rgba(11,21,38,0.88)] to-[rgba(1,3,8,0.94)] backdrop-blur-md',
        'px-6 py-5 md:px-8 md:py-6',
        className,
      )}
      data-subject={subject}
      data-status={status}
      {...(aa != null ? { 'data-aa': aa } : {})}
    >
      <div className="flex flex-wrap items-center gap-2">
        {label && <SectionLabel>{label}</SectionLabel>}
        <span
          className={cn(
            'archive-chip',
            status === 'survived' && 'archive-chip--accent',
            status === 'mutated' && 'border-[rgba(114,242,220,0.22)] text-[var(--color-phosphor)]',
          )}
        >
          {STATUS_LABEL[status]}
        </span>
        <span
          className={cn(
            'font-mono text-[9px] tracking-[0.12em] uppercase',
            SUBJECT_CLASS[subject],
          )}
        >
          {SUBJECT_LABEL[subject]}
        </span>
      </div>

      <Typography variant="display" as="h3" className="mt-4 text-balance">
        {title}
      </Typography>

      <Typography variant="bodyLg" as="p" className="mt-3 max-w-prose text-[var(--color-muted)]">
        {summary}
      </Typography>

      {detail && (
        <Typography variant="body" as="p" className="mt-3 max-w-prose italic opacity-80">
          {detail}
        </Typography>
      )}

      <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-deep)] pt-4">
        <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--color-text-ghost)]">
          {calendarYear != null && <span>AD {calendarYear}</span>}
          {calendarYear != null && aa != null && (
            <span className="mx-2 text-[var(--color-deep)]">·</span>
          )}
          {aa != null && <span>AA {aa}</span>}
        </p>
        {tags?.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-wider text-[var(--color-text-ghost)] uppercase"
          >
            #{tag}
          </span>
        ))}
      </footer>
    </article>
  )
}
