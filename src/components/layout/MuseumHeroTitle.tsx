import { motion } from 'framer-motion'
import { AA_EPOCH } from '@/lib/aaTimeline'
import { getHeroTitleVisibility } from '@/lib/heroTitleVisibility'
import { useNarrativeStore } from '@/stores/narrativeStore'

/**
 * Fixed center hero — fades out AA 1→2, lifts upward, then unmounts.
 */
export function MuseumHeroTitle() {
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const { opacity, translateY, isGone } = getHeroTitleVisibility(aaYearSmooth)

  if (isGone || opacity <= 0.01) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center px-[var(--space-gutter)]"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        willChange: 'opacity, transform',
      }}
      aria-hidden={opacity < 0.35}
    >
      <div className="max-w-4xl text-center pointer-events-none">
        <p className="text-label">Surface — AA {AA_EPOCH.min}</p>
        <h1 className="text-display-hero mt-6 text-balance">
          AI 자연사 박물관
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: Math.min(1, opacity * 2) }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          className="mt-5 font-mono text-[10px] tracking-[0.14em] text-[var(--color-text-ghost)]"
        >
          * AA {AA_EPOCH.min} = AD {AA_EPOCH.anchorAD}
        </motion.p>
        <p className="mt-10 font-mono text-[10px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
          Scroll to descend
        </p>
      </div>
    </div>
  )
}
