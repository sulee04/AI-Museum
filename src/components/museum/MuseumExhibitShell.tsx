import type { ReactNode } from 'react'
import type { ExhibitTheme } from '@/components/museum/exhibitTheme'
import { EXHIBIT_THEME_CLASS } from '@/components/museum/exhibitTheme'
import { cn } from '@/lib/utils'

interface MuseumExhibitShellProps {
  theme: ExhibitTheme
  chronology: ReactNode
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Unified exhibit layout — left chronology rail + main panel.
 * Theme controls color, glow, and typography weight.
 */
export function MuseumExhibitShell({
  theme,
  chronology,
  children,
  className,
  style,
}: MuseumExhibitShellProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center px-[var(--space-gutter)]',
        EXHIBIT_THEME_CLASS[theme],
        className,
      )}
      style={style}
      data-exhibit-theme={theme}
    >
      <div className="content-max grid w-full gap-10 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:items-center">
        <div className="hidden lg:block">{chronology}</div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
