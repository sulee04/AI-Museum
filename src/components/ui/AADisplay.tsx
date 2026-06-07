import { RollingNumber } from '@/components/ui/RollingNumber'
import { cn } from '@/lib/utils'

interface AADisplayProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showPrefix?: boolean
  variant?: 'plain' | 'hud'
}

const sizeClass = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
} as const

export function AADisplay({
  value,
  size = 'md',
  className,
  showPrefix = true,
  variant = 'hud',
}: AADisplayProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1.5',
        variant === 'plain' ? 'museum-year-counter' : 'text-aa-counter',
        sizeClass[size],
        className,
      )}
    >
      {showPrefix && (
        <span className={variant === 'plain' ? 'museum-year-counter__prefix' : 'text-aa-prefix'}>
          AA
        </span>
      )}
      <RollingNumber value={value} plain={variant === 'plain'} />
    </span>
  )
}
