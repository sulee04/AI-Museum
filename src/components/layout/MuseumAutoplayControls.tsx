import { AnimatePresence, motion } from 'framer-motion'
import { useMuseumAutoplay } from '@/hooks/useMuseumAutoplay'
import {
  AUTOPLAY_SPEED_OPTIONS,
  formatAutoplaySpeed,
  type AutoplaySpeed,
} from '@/constants/autoplay'
import { cn } from '@/lib/utils'

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={13}
      height={13}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 1.5v11l9-5.5-9-5.5z" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={13}
      height={13}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 1.5h2.5v11H3V1.5zm5.5 0H11v11H8.5V1.5z" />
    </svg>
  )
}

interface MuseumAutoplayControlsProps {
  playing: boolean
  speed: AutoplaySpeed
  onPlayingChange: (playing: boolean) => void
  onSpeedChange: (speed: AutoplaySpeed) => void
  onToggle: () => void
}

export function MuseumAutoplayControls({
  playing,
  speed,
  onPlayingChange,
  onSpeedChange,
  onToggle,
}: MuseumAutoplayControlsProps) {
  useMuseumAutoplay({
    playing,
    speed,
    onStop: () => onPlayingChange(false),
  })

  return (
    <div className="museum-autoplay">
      <AnimatePresence initial={false}>
        {playing && (
          <motion.div
            key="autoplay-speed"
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="museum-autoplay__speed"
            role="group"
            aria-label="Autoplay speed"
          >
            {AUTOPLAY_SPEED_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSpeedChange(option)}
                aria-pressed={speed === option}
                className={cn(
                  'museum-autoplay__speed-btn',
                  speed === option && 'museum-autoplay__speed-btn--active',
                )}
              >
                {formatAutoplaySpeed(option)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? 'Pause timeline autoplay' : 'Play timeline autoplay'}
        aria-pressed={playing}
        className={cn('museum-autoplay__toggle', playing && 'museum-autoplay__toggle--active')}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  )
}
