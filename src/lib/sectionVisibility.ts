import type { TimelineEvent } from '@/data/types'
import { clamp } from '@/lib/utils'

const DEFAULT_DWELL_BEFORE = 2
const DEFAULT_DWELL_AFTER = 4
/** Only fade at window edges — stay fully visible through the dwell core */
const SHARP_FADE_AA = 0.35

export interface SectionVisibility {
  opacity: number
  isVisible: boolean
}

export interface ActiveTimelineEvent {
  event: TimelineEvent
  opacity: number
  driftY: number
}

/** Fade a fixed overlay section in/out across its AA window */
export function getSectionVisibility(
  aaStart: number,
  aaEnd: number,
  currentAA: number,
  fadeEdge = 2,
): SectionVisibility {
  if (currentAA < aaStart || currentAA > aaEnd) {
    return { opacity: 0, isVisible: false }
  }

  const fadeIn = clamp((currentAA - aaStart) / fadeEdge, 0, 1)
  const fadeOut = clamp((aaEnd - currentAA) / fadeEdge, 0, 1)
  const opacity = Math.min(fadeIn, fadeOut)

  return { opacity, isVisible: opacity > 0.01 }
}

function getEventOpacity(currentAA: number, event: TimelineEvent): number {
  const anchor = event.aa
  if (anchor == null) return 0

  const before = event.dwellBefore ?? DEFAULT_DWELL_BEFORE
  const after = event.dwellAfter ?? DEFAULT_DWELL_AFTER

  const start = anchor - before
  const end = anchor + after

  if (currentAA < start || currentAA > end) return 0

  const edge = Math.min(currentAA - start, end - currentAA)
  if (edge >= SHARP_FADE_AA) return 1
  return clamp(edge / SHARP_FADE_AA, 0, 1)
}

/** Pick the most visible event in a section at the current AA position */
export function getActiveTimelineEvent(
  events: TimelineEvent[],
  currentAA: number,
): ActiveTimelineEvent | null {
  let best: ActiveTimelineEvent | null = null

  for (const event of events) {
    const opacity = getEventOpacity(currentAA, event)
    if (opacity <= 0 || event.aa == null) continue

    const driftY = (currentAA - event.aa) * 0.28
    if (!best || opacity > best.opacity || (event.isMajor && opacity >= best.opacity * 0.85)) {
      best = { event, opacity, driftY }
    }
  }

  return best
}

/** Closest ecosystem event by AA when none is in the active dwell window */
export function getNearestTimelineEvent(
  events: TimelineEvent[],
  currentAA: number,
): ActiveTimelineEvent | null {
  const withAA = events.filter((e) => e.aa != null)
  if (withAA.length === 0) return null

  let nearest = withAA[0]!
  let minDist = Infinity

  for (const event of withAA) {
    const dist = Math.abs(currentAA - event.aa!)
    if (dist < minDist) {
      minDist = dist
      nearest = event
    }
  }

  const opacity = 1
  const driftY = (currentAA - nearest.aa!) * 0.28

  return { event: nearest, opacity, driftY }
}

export function getMajorEcosystemEvents(events: TimelineEvent[]): TimelineEvent[] {
  return events.filter((event) => event.isMajor)
}

/** Opacity for timeline rail markers (always-on hints within section) */
export function getMarkerOpacity(
  event: TimelineEvent,
  currentAA: number,
  sectionOpacity: number,
): number {
  const eventOpacity = getEventOpacity(currentAA, event)
  if (event.aa == null) return 0
  const proximity = clamp(1 - Math.abs(currentAA - event.aa) / 6, 0.15, 1)
  return sectionOpacity * Math.max(eventOpacity, proximity * 0.45)
}
