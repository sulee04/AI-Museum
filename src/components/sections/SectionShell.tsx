import type { ReactNode } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'
import { cn } from '@/lib/utils'

interface SectionShellProps {
  id: string
  section: string
  label: string
  title: string
  subtitle?: string
  body: string
  className?: string
  introFootnote?: ReactNode
  children?: ReactNode
}

export function SectionShell({
  id,
  section,
  label,
  title,
  subtitle,
  body,
  className,
  introFootnote,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-section={section}
      className={cn(
        'section-pad relative flex min-h-screen items-center',
        className,
      )}
    >
      <div className="content-max w-full">
        <div data-animate="label">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <Typography
          variant="displayHero"
          as="h2"
          className="mt-6 max-w-4xl text-balance"
          data-animate="title"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="bodyLg"
            as="p"
            className="mt-4 italic text-[var(--color-phosphor)]"
            data-animate="subtitle"
          >
            {subtitle}
          </Typography>
        )}
        {introFootnote}
        <Typography variant="bodyLg" as="p" className="mt-8 max-w-2xl" data-animate="body">
          {body}
        </Typography>
        {children}
      </div>
    </section>
  )
}
