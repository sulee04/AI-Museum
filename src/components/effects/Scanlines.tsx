import { useNarrativeStore } from '@/stores/narrativeStore'

export function Scanlines() {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const glitchIntensity = useNarrativeStore((s) => s.glitchIntensity)
  const museumZone = useNarrativeStore((s) => s.museumZone)

  if (reducedMotion || museumZone !== 'ecosystem') return null

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
