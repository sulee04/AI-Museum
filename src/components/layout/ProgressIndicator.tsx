import { useNarrativeStore } from '@/stores/narrativeStore'
import { AADisplay } from '@/components/ui/AADisplay'
import { ADDisplay } from '@/components/ui/ADDisplay'
import { ECOSYSTEM_AA_MAX, MACHINE_AA_SPAN } from '@/constants/timeline'
import { PROLOGUE_AD_MAX, PROLOGUE_AD_MIN } from '@/constants/prologue'
import { cn } from '@/lib/utils'

export function ProgressIndicator() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)

  const isPrologue = museumZone === 'prologue'
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const showHandoff = isPrologue && handoffProgress > 0.15
  const heightPercent = isPrologue && !showHandoff
    ? prologueProgress * 100
    : showHandoff
      ? handoffProgress * 100
      : Math.min(100, scrollProgress * 100)

  if (!isPrologue && humanGuiOpacity < 0.05) return null

  return (
    <aside
      className={cn(
        'pointer-events-none fixed bottom-6 right-[var(--space-gutter)] z-20 flex items-end gap-4',
        isPrologue ? 'prologue-hud' : 'ecosystem-hud',
      )}
      style={{ opacity: isPrologue && !showHandoff ? 1 : humanGuiOpacity }}
      aria-label={
        isPrologue
          ? `Historical timeline: AD ${Math.round(adYearSmooth)}`
          : `After AI timeline: ${Math.round(aaYearSmooth)}`
      }
    >
      <div className="relative h-28 w-px bg-[var(--color-deep)]">
        <div
          className={cn(
            'absolute bottom-0 w-full',
            isPrologue
              ? 'bg-[var(--color-muted)]'
              : 'bg-gradient-to-t from-[var(--color-biolum)] to-[var(--color-phosphor)]',
          )}
          style={{ height: `${heightPercent}%` }}
        />
      </div>

      <div className="flex flex-col items-start gap-1 pb-0.5">
        {isPrologue && !showHandoff ? (
          <>
            <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
              Historical
            </span>
            <ADDisplay value={adYearSmooth} size="lg" variant="plain" />
            <span className="font-mono text-[9px] tabular-nums text-[var(--color-text-ghost)]">
              {PROLOGUE_AD_MIN} — {PROLOGUE_AD_MAX}
            </span>
          </>
        ) : showHandoff ? (
          <>
            <span className="text-hud-kicker">Entering</span>
            <AADisplay value={handoffProgress * 3} size="lg" />
            <span className="text-hud-meta tabular-nums">AA ecosystem</span>
          </>
        ) : (
          <>
            <span className="text-hud-kicker">After AI</span>
            <AADisplay value={aaYearSmooth} size="lg" />
            <span className="text-hud-meta tabular-nums">
              0 — {ECOSYSTEM_AA_MAX + MACHINE_AA_SPAN}
            </span>
          </>
        )}
      </div>
    </aside>
  )
}
