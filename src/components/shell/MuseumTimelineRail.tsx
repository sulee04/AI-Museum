import { useCallback, useMemo, type PointerEvent } from 'react'
import type { CSSProperties } from 'react'
import { useLenis } from '@/app/providers/SmoothScrollProvider'
import { useDocumentScrollY } from '@/hooks/useDocumentScrollY'
import { scrollToTimelineP } from '@/lib/timelineRailNavigation'
import { getTimelineRailProgress } from '@/lib/timelineRailProgress'
import { clamp } from '@/lib/utils'

/** Horizontal sector divider — scroll-driven neon timeline (L → R), click to seek */
export function MuseumTimelineRail() {
  const lenis = useLenis()
  const scrollY = useDocumentScrollY()

  const timelineP = useMemo(
    () => getTimelineRailProgress({ scrollY }),
    [scrollY],
  )

  const handleSeek = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const fraction = clamp((e.clientX - rect.left) / rect.width, 0, 1)
      scrollToTimelineP(fraction, lenis)
    },
    [lenis],
  )

  return (
    <div
      className="museum-timeline-rail"
      role="slider"
      aria-label="Timeline position"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(timelineP * 100)}
      aria-valuetext={`${Math.round(timelineP * 100)}% through the museum timeline`}
      tabIndex={0}
      onPointerDown={handleSeek}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 0.05 : 0.012
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault()
          scrollToTimelineP(clamp(timelineP + step, 0, 1), lenis)
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault()
          scrollToTimelineP(clamp(timelineP - step, 0, 1), lenis)
        }
      }}
      style={{ '--timeline-p': timelineP } as CSSProperties}
    >
      <div className="museum-timeline-rail__track" />
      <div className="museum-timeline-rail__fill" />
      <div className="museum-timeline-rail__head" />
    </div>
  )
}
