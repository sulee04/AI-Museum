import { RollingNumber } from '@/components/ui/RollingNumber'
import { cn } from '@/lib/utils'

interface AADisplayProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showPrefix?: boolean
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
}: AADisplayProps) {
  return (
    <span
      className={cn(
        'text-aa-counter inline-flex items-baseline gap-1.5',
        sizeClass[size],
        className,
      )}
    >
      {showPrefix && (
        <span className="text-aa-prefix">AA</span>
      )}
      <RollingNumber value={value} />
    </span>
  )
}
