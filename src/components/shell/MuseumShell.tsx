import type { CSSProperties, ReactNode } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { MuseumYearDisplay } from '@/components/shell/MuseumYearDisplay'
import { MuseumCenterNarrative, MuseumBottomDetail } from '@/components/shell/MuseumCenterNarrative'
import { MuseumThemeSwitcher } from '@/components/shell/MuseumThemeSwitcher'
import { MuseumGlobeButton } from '@/components/shell/MuseumGlobeButton'
import { MuseumHandoffTransition } from '@/components/shell/MuseumHandoffTransition'

interface MuseumShellProps {
  background?: ReactNode
  particles?: ReactNode
  specimens?: ReactNode
  autoplay?: ReactNode
  children: ReactNode
}

/** LD1-style 4-sector shell — TL year+theme, TC narrative, TR controls, bottom detail lane */
export function MuseumShell({
  background,
  particles,
  specimens,
  autoplay,
  children,
}: MuseumShellProps) {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)

  const handoffActive =
    museumZone === 'prologue' && handoffProgress > 0.08 && handoffProgress < 0.92

  const laneLabel =
    museumZone === 'ecosystem' || handoffProgress >= 0.98
      ? 'Ecosystem lane'
      : 'Historical timeline'

  return (
    <div
      className="museum-shell"
      data-zone={museumZone}
      data-handoff-active={handoffActive ? 'true' : 'false'}
      style={{ '--handoff-p': handoffProgress } as CSSProperties}
    >
      {background && <div className="museum-shell__stage-bg layer-background">{background}</div>}

      <div className="museum-shell__grid">
        <div className="museum-shell__quad museum-shell__quad--tl">
          <div className="museum-shell__tl-center">
            <MuseumYearDisplay />
          </div>
          <div className="museum-shell__tl-theme">
            <MuseumThemeSwitcher />
          </div>
        </div>

        <div className="museum-shell__quad museum-shell__quad--tc">
          <MuseumCenterNarrative />
        </div>

        <div className="museum-shell__quad museum-shell__quad--tr">
          <div className="museum-shell__tr-autoplay">{autoplay}</div>
          <div className="museum-shell__tr-center">
            <MuseumGlobeButton />
          </div>
        </div>

        <div className="museum-shell__quad museum-shell__quad--bottom" aria-label="Detail lane">
          <span className="museum-shell__lane-label">{laneLabel}</span>
          {particles && <div className="museum-shell__particles-zone">{particles}</div>}
          <MuseumBottomDetail />
          {specimens}
        </div>
      </div>

      <MuseumHandoffTransition />
      <main className="layer-content relative">{children}</main>
    </div>
  )
}
