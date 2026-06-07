import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { lerp } from '@/lib/utils'

/** Deep-sea depth gradient — ecosystem only */
export function DepthFog() {
  const progress = useScrollProgress()
  const museumZone = useNarrativeStore((s) => s.museumZone)

  if (museumZone !== 'ecosystem') return null

  const descent = Math.min(1, Math.max(0, progress - 0.06) / 0.8)
  const opacity = lerp(0.04, 0.55, descent)

  return (
    <div
      className="pointer-events-none h-full w-full"
      aria-hidden
      style={{
        background: `linear-gradient(
          180deg,
          transparent 0%,
          rgba(1, 3, 8, ${opacity * 0.25}) 35%,
          rgba(1, 3, 8, ${opacity * 0.85}) 100%
        )`,
      }}
    />
  )
}
