import { motion } from 'framer-motion'
import { getSectionByPhase } from '@/content/narrative'
import { SectionShell } from '@/components/sections/SectionShell'
import { AA_EPOCH } from '@/lib/aaTimeline'

const content = getSectionByPhase('surface')!

export function HeroSurface() {
  return (
    <SectionShell
      id="surface"
      section="surface"
      label={content.label}
      title={content.title}
      subtitle={content.subtitle}
      body={content.body}
      className="min-h-[110vh] pt-[20vh]"
      introFootnote={
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-mono text-[10px] tracking-wide text-[var(--color-muted)]"
          data-animate="aa-hint"
        >
          * AA {AA_EPOCH.min} = AD {AA_EPOCH.anchorAD}
        </motion.p>
      }
    >
      <p className="mt-16 font-mono text-xs tracking-[0.3em] text-[var(--color-muted)] uppercase">
        Scroll to descend ↓
      </p>
    </SectionShell>
  )
}
