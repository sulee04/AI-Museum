import type { IntroSection } from '@/data/types'
import { PrologueContentShell } from '@/components/prologue/PrologueContentShell'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'
import { PROLOGUE_CHAPTER_INTRO_VH } from '@/constants/prologue'

interface PrologueChapterIntroProps {
  section: IntroSection
}

/** Chapter opener — scrolls in-flow with the left chronology rail */
export function PrologueChapterIntro({ section }: PrologueChapterIntroProps) {
  return (
    <div
      className="flex w-full items-center px-[var(--space-gutter)]"
      style={{ minHeight: `${PROLOGUE_CHAPTER_INTRO_VH}vh` }}
      data-prologue-chapter={section.id}
    >
      <PrologueContentShell>
        <div className="w-full max-w-2xl">
          <SectionLabel>{section.label}</SectionLabel>
          <Typography variant="display" as="h2" className="mt-4 text-balance text-[var(--color-prologue-text)]">
            {section.title}
          </Typography>
          {section.subtitle && (
            <Typography
              variant="bodyLg"
              as="p"
              className="mt-2 italic text-[var(--color-prologue-warm)]"
            >
              {section.subtitle}
            </Typography>
          )}
          {section.preamble && (
            <Typography variant="body" as="p" className="mt-4 max-w-prose text-[var(--color-prologue-muted)]">
              {section.preamble}
            </Typography>
          )}
        </div>
      </PrologueContentShell>
    </div>
  )
}
