import { formatDepth } from '@/lib/utils'
import { useNarrativeStore } from '@/stores/narrativeStore'

export function DepthMeter() {
  const depth = useNarrativeStore((s) => s.depth)
  const phase = useNarrativeStore((s) => s.phase)

  return (
    <div className="flex flex-col items-end gap-1 font-mono text-xs tracking-widest text-[var(--color-muted)]">
      <span className="text-[var(--color-biolum)]">{formatDepth(depth)}</span>
      <span className="uppercase opacity-60">{phase}</span>
    </div>
  )
}
