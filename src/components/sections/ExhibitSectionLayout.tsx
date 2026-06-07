import type { IntroSection } from '@/data/types'
import { ChronologyNav } from '@/components/museum/ChronologyNav'
import { ExhibitPanel } from '@/components/museum/ExhibitPanel'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'

interface ExhibitSectionLayoutProps {
  section: IntroSection
}

/**
 * Shared in-flow layout: chronology nav (left) + exhibit stack (center).
 * All text comes from `section` data — no inline copy.
 */
export function ExhibitSectionLayout({ section }: ExhibitSectionLayoutProps) {
  return (
    <section
      id={section.id}
      data-section={section.id}
      className="section-pad layer-content flex min-h-screen w-full items-center"
      aria-labelledby={`${section.id}-heading`}
    >
      <div className="content-max grid w-full gap-10 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:items-start">
        <ChronologyNav
          sectionLabel={section.label}
          events={section.events}
          className="hidden lg:block"
        />

        <div className="flex min-w-0 flex-col gap-8">
          <header>
            <SectionLabel>{section.label}</SectionLabel>
            <Typography
              variant="displayHero"
              as="h2"
              id={`${section.id}-heading`}
              className="mt-4 text-balance"
            >
              {section.title}
            </Typography>
            {section.subtitle && (
              <Typography
                variant="bodyLg"
                as="p"
                className="mt-2 italic text-[var(--color-phosphor)]"
              >
                {section.subtitle}
              </Typography>
            )}
            {section.preamble && (
              <Typography variant="body" as="p" className="mt-4 max-w-prose text-[var(--color-muted)]">
                {section.preamble}
              </Typography>
            )}
          </header>

          <div className="flex flex-col gap-6">
            {section.events.map((event) => (
              <ExhibitPanel
                key={event.id}
                id={event.id}
                label={`Exhibit — ${event.id}`}
                title={event.title}
                summary={event.summary}
                detail={event.detail}
                subject={event.subject}
                status={event.status}
                aa={event.aa}
                calendarYear={event.calendarYear}
                tags={event.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
