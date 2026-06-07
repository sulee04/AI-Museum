import type { CSSProperties, ReactNode } from 'react'
import { useMemo } from 'react'
import { useDocumentScrollY } from '@/hooks/useDocumentScrollY'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { MuseumYearDisplay } from '@/components/shell/MuseumYearDisplay'
import { MuseumCenterScrollLane } from '@/components/shell/MuseumCenterScrollLane'
import { MuseumBottomDetail } from '@/components/shell/MuseumBottomDetail'
import { MuseumGlobeButton } from '@/components/shell/MuseumGlobeButton'
import { MuseumHandoffTransition } from '@/components/shell/MuseumHandoffTransition'
import { MuseumTimelineRail } from '@/components/shell/MuseumTimelineRail'
import { AccessDeniedOverlay } from '@/components/shell/AccessDeniedOverlay'
import { getTimelineRailProgress } from '@/lib/timelineRailProgress'

interface MuseumShellProps {
  background?: ReactNode
  particles?: ReactNode
  specimens?: ReactNode
  autoplay?: ReactNode
  children: ReactNode
}

/** LD1-style 4-sector shell — TL year, TC narrative, TR controls, bottom detail lane */
export function MuseumShell({
  background,
  particles,
  specimens,
  autoplay,
  children,
}: MuseumShellProps) {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const scrollY = useDocumentScrollY()

  const timelineP = useMemo(
    () => getTimelineRailProgress({ scrollY }),
    [scrollY],
  )

  const handoffActive =
    museumZone === 'prologue' && handoffProgress > 0.08 && handoffProgress < 0.92

  const showBottomParticles =
    museumZone === 'ecosystem' || handoffProgress >= 0.08

  const laneLabel =
    museumZone === 'ecosystem' || handoffProgress >= 0.98
      ? 'Ecosystem lane'
      : 'Historical timeline'

  return (
    <div
      className="museum-shell"
      data-zone={museumZone}
      data-handoff-active={handoffActive ? 'true' : 'false'}
      style={
        {
          '--handoff-p': handoffProgress,
          '--timeline-p': timelineP,
        } as CSSProperties
      }
    >
      {background && <div className="museum-shell__stage-bg layer-background">{background}</div>}

      <MuseumTimelineRail />

      <div className="museum-shell__grid">
        <div className="museum-shell__quad museum-shell__quad--tl">
          <MuseumYearDisplay />
        </div>

        <div className="museum-shell__quad museum-shell__quad--tc">
          <MuseumCenterScrollLane />
        </div>

        <div className="museum-shell__quad museum-shell__quad--tr">
          <div className="museum-shell__tr-autoplay">{autoplay}</div>
          <div className="museum-shell__tr-center">
            <MuseumGlobeButton />
          </div>
        </div>

        <div className="museum-shell__quad museum-shell__quad--bottom" aria-label="Detail lane">
          <span className="museum-shell__lane-label">{laneLabel}</span>
          {particles && showBottomParticles && (
            <div className="museum-shell__particles-zone">{particles}</div>
          )}
          <MuseumBottomDetail />
          {specimens}
        </div>
      </div>

      <MuseumHandoffTransition />
      <AccessDeniedOverlay />
      <main className="layer-content relative">{children}</main>
    </div>
  )
}
