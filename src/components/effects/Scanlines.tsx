import { useNarrativeStore } from '@/stores/narrativeStore'
import { TERMINAL_ZONE_START } from '@/constants/timeline'

export function Scanlines() {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const glitchIntensity = useNarrativeStore((s) => s.glitchIntensity)
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)

  if (reducedMotion || museumZone !== 'ecosystem' || scrollProgress >= TERMINAL_ZONE_START) {
    return null
  }

  return (
    <div
      className="pointer-events-none h-full w-full"
      aria-hidden
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)',
        opacity: 0.03 + glitchIntensity * 0.05,
      }}
    />
  )
}
