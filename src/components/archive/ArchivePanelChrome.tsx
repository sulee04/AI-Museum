import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ArchivePanelFrame({
  active,
  children,
  className,
}: {
  active?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('archive-panel', active && 'archive-panel--active', className)}>
      {children}
    </div>
  )
}

export function ArchiveMetaChip({
  children,
  variant = 'default',
}: {
  children: ReactNode
  variant?: 'default' | 'accent' | 'major'
}) {
  return (
    <span
      className={cn(
        'archive-meta',
        variant === 'accent' && 'archive-meta--accent',
        variant === 'major' && 'archive-meta--major',
      )}
    >
      {children}
    </span>
  )
}

export function ArchiveIconButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string
  onClick: (event: React.MouseEvent) => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn('archive-btn', className)}
    >
      {children}
    </button>
  )
}

export function ArchiveChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArchiveChevronUp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden
    >
      <path d="M4 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArchiveCloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden
    >
      <path d="M4 4l8 8M12 4L4 12" strokeLinecap="round" />
    </svg>
  )
}

export function ArchiveArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={12}
      height={12}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
