import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SPECIMENS } from '@/content/specimens'
import { computeEcosystemStats } from '@/lib/ecosystemStats'
import { mapProgressToEcosystemAA } from '@/lib/aaTimeline'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { RollingNumber } from '@/components/ui/RollingNumber'
import { cn } from '@/lib/utils'

function ZeroSignalDisplay() {
  return (
    <p className="text-hud-zero flex items-baseline gap-0.5 text-sm tabular-nums">
      <span>0</span>
      <span className="opacity-70">.</span>
      <span>0</span>
      <span className="text-hud-meta ml-1 text-[10px]">AA yr</span>
    </p>
  )
}

/** Collapsible top-left lifespan HUD — collapsed by default to avoid blocking specimens */
export function EcosystemHUD() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const storeProgress = useNarrativeStore((s) => s.scrollProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const [open, setOpen] = useState(false)

  const ecosystemAA = mapProgressToEcosystemAA(storeProgress)
  const stats = useMemo(
    () => computeEcosystemStats(SPECIMENS, ecosystemAA, storeProgress),
    [ecosystemAA, storeProgress],
  )

  const avg = stats.globalAvgLifespan ?? 0
  const whole = Math.floor(avg)
  const decimal = Math.round((avg - whole) * 10)

  if (museumZone !== 'ecosystem' || humanGuiOpacity <= 0.05) return null

  return (
    <div
      className="pointer-events-auto fixed top-20 left-[var(--space-gutter)] z-[30]"
      style={{ opacity: humanGuiOpacity, pointerEvents: humanGuiOpacity < 0.15 ? 'none' : 'auto' }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Collapse lifespan HUD' : 'Expand lifespan HUD'}
        className={cn(
          'flex items-center gap-2 rounded-sm border border-[var(--color-deep)] bg-[var(--color-abyss-pure)] px-2.5 py-1.5',
          'text-left transition-colors hover:border-[var(--color-biolum)]/35',
          open && 'border-[var(--color-biolum)]/30',
        )}
      >
        <span className="text-[10px] text-[var(--color-muted)]" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
        {stats.hasSignal ? (
          <span className="text-hud-value flex items-baseline gap-0.5 text-sm tabular-nums">
            <RollingNumber value={whole} className="text-sm" />
            <span className="opacity-55">.</span>
            <RollingNumber value={decimal} className="text-sm" />
            <span className="text-hud-meta ml-0.5 text-[10px]">AA avg</span>
          </span>
        ) : (
          <ZeroSignalDisplay />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-1.5 w-56 rounded-sm border border-[var(--color-deep)] bg-[var(--color-abyss-pure)] p-3"
              role="status"
            >
              <p className="text-hud-kicker">Global Avg. Lifespan</p>

              {stats.hasSignal ? (
                <p className="text-hud-value mt-1.5 flex items-baseline gap-0.5 text-lg tabular-nums">
                  <RollingNumber value={whole} className="text-lg" />
                  <span className="opacity-55">.</span>
                  <RollingNumber value={decimal} className="text-lg" />
                  <span className="text-hud-meta ml-1">AA yr</span>
                </p>
              ) : (
                <div className="mt-1">
                  <ZeroSignalDisplay />
                </div>
              )}

              <p className="text-hud-meta mt-1 tabular-nums">
                {stats.hasSignal ? `${stats.aliveCount} specimens alive` : '0 specimens alive'}
              </p>

              {stats.hasSignal && stats.categories.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-[var(--color-deep)] pt-3">
                  <p className="text-[9px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
                    Alive by Category
                  </p>
                  {stats.categories.map(({ category, count, avgLifespan }) => (
                    <div
                      key={category}
                      className="flex items-baseline justify-between gap-3 text-[10px]"
                    >
                      <span className="text-[var(--color-muted)]">{category}</span>
                      <span className="shrink-0 tabular-nums text-[var(--color-text-dim)]">
                        {avgLifespan.toFixed(1)} AA
                        <span className="ml-1 text-[var(--color-text-ghost)]">×{count}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
