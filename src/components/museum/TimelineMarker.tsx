import type { EntityStatus, EventSubject } from '@/data/types'
import type { ExhibitTheme } from '@/components/museum/exhibitTheme'
import { cn } from '@/lib/utils'

const STATUS_DOT: Record<EntityStatus, Record<ExhibitTheme, string>> = {
  survived: {
    prologue: 'bg-[var(--color-prologue-accent)]',
    ecosystem: 'bg-[var(--color-biolum)]',
  },
  extinct: {
    prologue: 'bg-[var(--color-prologue-muted)]',
    ecosystem: 'bg-[var(--color-muted)]',
  },
  mutated: {
    prologue: 'bg-[var(--color-prologue-warm)]',
    ecosystem: 'bg-[var(--color-phosphor)]',
  },
}

export interface TimelineMarkerProps {
  theme?: ExhibitTheme
  aa?: number
  calendarYear?: number
  title: string
  subject: EventSubject
  status: EntityStatus
  isActive?: boolean
  opacity?: number
  className?: string
}

export function TimelineMarker({
  theme = 'prologue',
  aa,
  calendarYear,
  title,
  subject,
  status,
  isActive = false,
  opacity = 1,
  className,
}: TimelineMarkerProps) {
  const yearLabel =
    calendarYear != null
      ? `AD ${calendarYear}`
      : aa != null
        ? `AA ${aa}`
        : null

  return (
    <div
      className={cn('flex items-start gap-3 transition-opacity duration-300', className)}
      style={{ opacity: opacity < 1 ? opacity : undefined }}
      data-subject={subject}
      data-status={status}
      data-marker-theme={theme}
      {...(aa != null ? { 'data-aa': aa } : {})}
      data-active={isActive || undefined}
      role="listitem"
    >
      <div className="flex flex-col items-center pt-1">
        <span
          className={cn(
            'size-2 shrink-0 rounded-full',
            STATUS_DOT[status][theme],
            isActive
              ? theme === 'prologue'
                ? 'shadow-[0_0_0_2px_var(--color-prologue-accent)]'
                : 'shadow-[0_0_0_2px_var(--color-biolum)]'
              : theme === 'prologue'
                ? 'shadow-[0_0_0_1px_var(--color-prologue-border)]'
                : 'shadow-[0_0_0_1px_var(--color-deep)]',
          )}
          aria-hidden
        />
        <span
          className={cn(
            'mt-2 h-8 w-px',
            theme === 'prologue' ? 'bg-[var(--color-prologue-border)]' : 'bg-[var(--color-deep)]',
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0 pb-2">
        {yearLabel && (
          <p
            className={cn(
              'font-mono text-[9px] tracking-[0.14em] uppercase',
              theme === 'prologue'
                ? 'text-[var(--color-prologue-dim)]'
                : 'text-[var(--color-text-ghost)]',
            )}
          >
            {yearLabel}
          </p>
        )}
        <p
          className={cn(
            'mt-0.5 truncate font-mono text-[11px] tracking-wide',
            isActive
              ? theme === 'prologue'
                ? 'text-[var(--color-prologue-text)]'
                : 'text-[var(--color-text)]'
              : theme === 'prologue'
                ? 'text-[var(--color-prologue-muted)]'
                : 'text-[var(--color-muted)]',
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}
