import { useNarrativeStore } from '@/stores/narrativeStore'
import { ADDisplay } from '@/components/ui/ADDisplay'
import { AADisplay } from '@/components/ui/AADisplay'
import { ECOSYSTEM_AA_MAX, MACHINE_AA_SPAN } from '@/constants/timeline'
import { PROLOGUE_AD_MAX, PROLOGUE_AD_MIN } from '@/constants/prologue'

/** Top-left year — LD1-inspired, compact */
export function MuseumYearDisplay() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const adYearSmooth = useNarrativeStore((s) => s.adYearSmooth)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)

  if (humanGuiOpacity <= 0.05) return null

  const showHandoff = museumZone === 'prologue' && handoffProgress > 0.15
  const showHero = prologueProgress < 0.015 && handoffProgress < 0.05

  return (
    <div className="museum-year museum-year--centered" aria-live="polite">
      {showHero ? (
        <>
          <span className="museum-text-meta">Begin</span>
          <span className="museum-year__value">AD</span>
          <span className="museum-year__range">
            {PROLOGUE_AD_MIN} — {PROLOGUE_AD_MAX}
          </span>
        </>
      ) : showHandoff ? (
        <>
          <span className="museum-text-meta">Entering</span>
          <div className="museum-year__value">
            <AADisplay value={handoffProgress * 3} size="lg" variant="plain" />
          </div>
          <span className="museum-year__range">AA ecosystem</span>
        </>
      ) : museumZone === 'prologue' ? (
        <>
          <span className="museum-text-meta">Historical</span>
          <div className="museum-year__value">
            <ADDisplay value={adYearSmooth} size="lg" variant="plain" />
          </div>
          <span className="museum-year__range">
            {PROLOGUE_AD_MIN} — {PROLOGUE_AD_MAX}
          </span>
        </>
      ) : (
        <>
          <span className="museum-text-meta">After AI</span>
          <div className="museum-year__value">
            <AADisplay value={aaYearSmooth} size="lg" variant="plain" />
          </div>
          <span className="museum-year__range">
            0 — {ECOSYSTEM_AA_MAX + MACHINE_AA_SPAN}
          </span>
        </>
      )}
    </div>
  )
}
