import type { TimelineEvent } from '@/data/types'
import type { ExhibitTheme } from '@/components/museum/exhibitTheme'
import { CHRONOLOGY_THEME_CLASS } from '@/components/museum/exhibitTheme'
import { TimelineMarker } from '@/components/museum/TimelineMarker'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

interface ChronologyNavProps {
  theme?: ExhibitTheme
  /** Fixed left rail — skip sticky chrome positioning */
  embedMode?: 'default' | 'fixed'
  sectionLabel: string
  events: TimelineEvent[]
  activeYear?: number
  onEventSelect?: (event: TimelineEvent) => void
  className?: string
}

export function ChronologyNav({
  theme = 'prologue',
  embedMode = 'default',
  sectionLabel,
  events,
  activeYear,
  onEventSelect,
  className,
}: ChronologyNavProps) {
  return (
    <nav
      className={cn(
        'w-fit max-w-[280px] self-start',
        embedMode === 'default' && 'layer-chrome top-24',
        CHRONOLOGY_THEME_CLASS[theme],
        className,
      )}
      aria-label={`${sectionLabel} chronology`}
    >
      <SectionLabel>{sectionLabel}</SectionLabel>
      <ol className="relative mt-4 w-fit list-none space-y-0 p-0">
        {events.map((event) => {
          const year = event.calendarYear ?? event.aa
          const isActive =
            activeYear != null &&
            year != null &&
            Math.abs(activeYear - year) <= (event.calendarYear != null ? 2 : 4)

          const item = (
            <TimelineMarker
              theme={theme}
              calendarYear={event.calendarYear}
              aa={event.aa}
              title={event.title}
              subject={event.subject}
              status={event.status}
              isActive={isActive}
              opacity={isActive || theme === 'prologue' ? 1 : 0.35}
            />
          )

          return (
            <li key={event.id} className="w-fit">
              {onEventSelect && event.calendarYear != null ? (
                <button
                  type="button"
                  onClick={() => onEventSelect(event)}
                  className="inline-flex w-fit max-w-[280px] rounded-sm text-left transition-colors hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-prologue-accent)]"
                >
                  {item}
                </button>
              ) : (
                item
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
