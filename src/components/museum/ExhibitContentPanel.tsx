import type { ReactNode } from 'react'
import type { ExhibitTheme } from '@/components/museum/exhibitTheme'
import { EXHIBIT_THEME_CLASS } from '@/components/museum/exhibitTheme'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'
import { cn } from '@/lib/utils'

interface ExhibitContentPanelProps {
  theme: ExhibitTheme
  sectionLabel: string
  chapterTitle?: string
  title: string
  summary: string
  detail?: string
  footer?: ReactNode
  className?: string
  onOpenArchive?: () => void
  isArchiveOpen?: boolean
}

/** Scroll-linked exhibit card — same structure, theme-driven styling */
export function ExhibitContentPanel({
  theme,
  sectionLabel,
  chapterTitle,
  title,
  summary,
  detail,
  footer,
  className,
  onOpenArchive,
  isArchiveOpen,
}: ExhibitContentPanelProps) {
  const interactive = Boolean(onOpenArchive)

  return (
    <article
      className={cn(
        'exhibit-content-panel max-w-xl',
        EXHIBIT_THEME_CLASS[theme],
        interactive && 'exhibit-content-panel--interactive',
        isArchiveOpen && 'exhibit-content-panel--open',
        className,
      )}
    >
      {interactive ? (
        <button type="button" onClick={onOpenArchive} className="exhibit-content-panel__trigger">
          <SectionLabel>{sectionLabel}</SectionLabel>
          {chapterTitle && (
            <Typography
              variant="body"
              as="p"
              className={cn(
                'mt-2',
                theme === 'prologue' ? 'text-[var(--color-prologue-muted)]' : 'text-[var(--color-muted)]',
              )}
            >
              {chapterTitle}
            </Typography>
          )}
          <Typography
            variant={theme === 'ecosystem' ? 'displayHero' : 'display'}
            as="h2"
            className={cn('mt-4 text-balance', theme === 'ecosystem' && 'exhibit-ecosystem-title')}
          >
            {title}
          </Typography>
          <Typography
            variant="bodyLg"
            as="p"
            className={cn(
              'mt-3 max-w-prose',
              theme === 'prologue' ? 'text-[var(--color-prologue-muted)]' : 'text-[var(--color-muted)]',
            )}
          >
            {summary}
          </Typography>
          {detail && (
            <Typography variant="body" as="p" className="mt-3 max-w-prose italic opacity-85">
              {detail}
            </Typography>
          )}
          <span className="exhibit-content-panel__archive-hint">Open archive record</span>
        </button>
      ) : (
        <>
          <SectionLabel>{sectionLabel}</SectionLabel>
          {chapterTitle && (
            <Typography
              variant="body"
              as="p"
              className={cn(
                'mt-2',
                theme === 'prologue' ? 'text-[var(--color-prologue-muted)]' : 'text-[var(--color-muted)]',
              )}
            >
              {chapterTitle}
            </Typography>
          )}
          <Typography
            variant={theme === 'ecosystem' ? 'displayHero' : 'display'}
            as="h2"
            className={cn('mt-4 text-balance', theme === 'ecosystem' && 'exhibit-ecosystem-title')}
          >
            {title}
          </Typography>
          <Typography
            variant="bodyLg"
            as="p"
            className={cn(
              'mt-3 max-w-prose',
              theme === 'prologue' ? 'text-[var(--color-prologue-muted)]' : 'text-[var(--color-muted)]',
            )}
          >
            {summary}
          </Typography>
          {detail && (
            <Typography variant="body" as="p" className="mt-3 max-w-prose italic opacity-85">
              {detail}
            </Typography>
          )}
        </>
      )}
      {footer && (
        <footer className="exhibit-content-footer mt-5 border-t pt-4">{footer}</footer>
      )}
    </article>
  )
}
