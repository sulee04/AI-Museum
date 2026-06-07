import { scrollToY } from '@/lib/autoplayScroll'
import type { LenisInstance } from '@/lib/lenis'
import { resolveScrollYFromTimelineP as journeyScrollYFromP } from '@/lib/scrollJourney'
import { clamp } from '@/lib/utils'

/** Map timeline rail position (0→1) to document scroll Y — scroll-proportional */
export function resolveScrollYFromTimelineP(timelineP: number): number | null {
  return journeyScrollYFromP(timelineP)
}

/** Jump scroll to a point on the timeline rail */
export function scrollToTimelineP(timelineP: number, lenis: LenisInstance | null): void {
  const y = resolveScrollYFromTimelineP(timelineP)
  if (y == null) return

  if (lenis) {
    lenis.scrollTo(clamp(y, 0, lenis.limit), {
      duration: 1.05,
      force: true,
      programmatic: true,
    })
    return
  }

  scrollToY(y, lenis, false)
}
