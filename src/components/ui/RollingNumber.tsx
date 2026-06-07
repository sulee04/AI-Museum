import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const

/** Cinematic odometer settle */
const ROLL_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1]
const ROLL_DURATION = 0.48

/** Right-aligned digit columns: index 0 = ones, 1 = tens, … */
function getDigitsFromOnesPlace(value: number): number[] {
  const abs = Math.abs(Math.round(value))
  if (abs === 0) return [0]
  return String(abs)
    .split('')
    .map(Number)
    .reverse()
}

interface DigitProps {
  digit: number
  shouldRoll: boolean
  className?: string
}

function Digit({ digit, shouldRoll, className }: DigitProps) {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const safeDigit = Math.max(0, Math.min(9, digit))

  if (reducedMotion) {
    return (
      <span className={cn('inline-block tabular-nums leading-none', className)}>{safeDigit}</span>
    )
  }

  return (
    <span
      className={cn(
        'relative inline-block overflow-hidden tabular-nums leading-none',
        className,
      )}
      style={{ height: '1em', width: '0.62em' }}
      aria-hidden
    >
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `-${safeDigit}em` }}
        transition={
          shouldRoll
            ? { duration: ROLL_DURATION, ease: ROLL_EASE }
            : { duration: 0 }
        }
      >
        {DIGITS.map((d) => (
          <span key={d} className="flex h-[1em] w-[0.62em] items-center justify-center">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

interface RollingNumberProps {
  value: number
  className?: string
  /** Static tabular digits — no odometer clip slots (museum year slot) */
  plain?: boolean
}

export function RollingNumber({ value, className, plain = false }: RollingNumberProps) {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const rounded = Math.round(value)
  const negative = rounded < 0
  const digits = getDigitsFromOnesPlace(rounded)

  const prevDigitsRef = useRef<number[] | null>(null)
  const prevDigits = prevDigitsRef.current

  useLayoutEffect(() => {
    prevDigitsRef.current = digits
  }, [digits.join(',')])

  if (plain || reducedMotion) {
    return (
      <span className={cn('tabular-nums leading-none', className)} aria-label={String(rounded)}>
        {negative && '−'}
        {Math.abs(rounded)}
      </span>
    )
  }

  const hasHistory = prevDigits !== null

  return (
    <span
      className={cn('inline-flex items-baseline leading-none', className)}
      aria-label={String(rounded)}
    >
      {negative && <span className="mr-px text-[0.85em]">−</span>}
      {[...digits].reverse().map((digit, displayIndex) => {
        const placeIndex = digits.length - 1 - displayIndex
        const prevDigit = prevDigits?.[placeIndex]
        const shouldRoll =
          hasHistory &&
          (prevDigit === undefined ? digit !== 0 : prevDigit !== digit)

        return (
          <Digit
            key={`place-${placeIndex}`}
            digit={digit}
            shouldRoll={shouldRoll}
          />
        )
      })}
    </span>
  )
}
