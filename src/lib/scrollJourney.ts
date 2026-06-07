import { PROLOGUE_SCROLL_VH } from '@/constants/prologue'
import { SCROLL_HEIGHT_VH } from '@/constants/timeline'
import { clamp } from '@/lib/utils'

/** Document scroll sections — keep in sync with ghost scroll layout */
export const HERO_SCROLL_VH = 100
export const TITLE_GATE_SCROLL_VH = 200

export const TOTAL_JOURNEY_VH =
  HERO_SCROLL_VH + PROLOGUE_SCROLL_VH + TITLE_GATE_SCROLL_VH + SCROLL_HEIGHT_VH

export function getViewportHeight(): number {
  return window.innerHeight || 1
}

/** Timeline rail position 0→1 proportional to document scroll distance */
export function getTimelinePFromScrollY(scrollY: number): number {
  const vh = getViewportHeight()
  const scrollVh = (scrollY / vh) * 100
  return clamp(scrollVh / TOTAL_JOURNEY_VH, 0, 1)
}

/** Inverse — seek rail position to document scroll Y */
export function resolveScrollYFromTimelineP(timelineP: number): number {
  const vh = getViewportHeight()
  const targetScrollVh = clamp(timelineP, 0, 1) * TOTAL_JOURNEY_VH
  return (targetScrollVh / 100) * vh
}

export function getHandoffTimelineStart(): number {
  return (HERO_SCROLL_VH + PROLOGUE_SCROLL_VH) / TOTAL_JOURNEY_VH
}

export function getHandoffTimelineSpan(): number {
  return TITLE_GATE_SCROLL_VH / TOTAL_JOURNEY_VH
}
