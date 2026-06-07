import {
  PROLOGUE_AD_MIN,
  PROLOGUE_AD_MAX,
} from '@/constants/prologue'
import type { TimelineEvent } from '@/data/types'
import { INTRO_SECTIONS } from '@/data/introTimeline'
import { clamp } from '@/lib/utils'
import { ScrollTrigger } from '@/animations/registerGSAP'

export const PROLOGUE_TRACK_SCROLL_TRIGGER_ID = 'prologue-track'

export function getAllIntroEventsChronological(): TimelineEvent[] {
  return INTRO_SECTIONS.flatMap((section) => section.events)
    .filter((e) => e.calendarYear != null)
    .sort((a, b) => (a.calendarYear ?? 0) - (b.calendarYear ?? 0))
}

export function getPrologueBeatCount(): number {
  return getAllIntroEventsChronological().length
}

/** Scroll progress 0→1 maps evenly across intro event beats (not calendar years) */
export function mapPrologueProgressToBeatIndex(progress: number): number {
  const count = getPrologueBeatCount()
  if (count <= 1) return 0
  return clamp(progress, 0, 1) * (count - 1)
}

export function mapBeatIndexToAD(beatIndex: number): number {
  const events = getAllIntroEventsChronological()
  if (events.length === 0) return PROLOGUE_AD_MIN

  if (beatIndex <= 0) return events[0]!.calendarYear ?? PROLOGUE_AD_MIN

  const idx = Math.floor(beatIndex)
  const frac = beatIndex - idx

  if (idx >= events.length - 1) {
    return events[events.length - 1]!.calendarYear ?? PROLOGUE_AD_MAX
  }

  const a = events[idx]!.calendarYear!
  const b = events[idx + 1]!.calendarYear!
  return a + frac * (b - a)
}

export function mapPrologueProgressToAD(progress: number): number {
  return mapBeatIndexToAD(mapPrologueProgressToBeatIndex(progress))
}

export function mapADToPrologueProgress(ad: number): number {
  const events = getAllIntroEventsChronological()
  if (events.length <= 1) return 0

  const minYear = events[0]!.calendarYear ?? PROLOGUE_AD_MIN
  const maxYear = events[events.length - 1]!.calendarYear ?? PROLOGUE_AD_MAX
  const clampedAD = clamp(ad, minYear, maxYear)

  if (clampedAD <= minYear) return 0
  if (clampedAD >= maxYear) return 1

  for (let i = 0; i < events.length - 1; i++) {
    const a = events[i]!.calendarYear!
    const b = events[i + 1]!.calendarYear!
    if (clampedAD >= a && clampedAD <= b) {
      const span = b - a
      const t = span > 0 ? (clampedAD - a) / span : 0
      const beatIndex = i + t
      return beatIndex / (events.length - 1)
    }
  }

  return 1
}

export function getIntroSectionForYear(ad: number) {
  return INTRO_SECTIONS.find((section) =>
    section.events.some((e) => e.calendarYear === ad),
  )
}

const DEFAULT_DWELL_YEARS = 4
/** Only fade at the very edge of the dwell window (~0.3 AD years) */
const SHARP_FADE_YEARS = 0.3

function getSharpWindowOpacity(year: number, start: number, end: number): number {
  if (year < start || year > end) return 0
  const edge = Math.min(year - start, end - year)
  if (edge >= SHARP_FADE_YEARS) return 1
  return clamp(edge / SHARP_FADE_YEARS, 0, 1)
}

export interface ActiveIntroEvent {
  event: TimelineEvent
  sectionLabel: string
  opacity: number
}

export function getActiveIntroEvent(adYear: number): ActiveIntroEvent | null {
  const events = getAllIntroEventsChronological()
  let best: ActiveIntroEvent | null = null

  for (const event of events) {
    const anchor = event.calendarYear
    if (anchor == null) continue

    const dwell = DEFAULT_DWELL_YEARS
    const start = anchor - dwell * 0.4
    const end = anchor + dwell

    if (adYear < start || adYear > end) continue

    const opacity = getSharpWindowOpacity(adYear, start, end)

    if (opacity <= 0) continue

    const section = INTRO_SECTIONS.find((s) => s.events.some((e) => e.id === event.id))
    if (!best || opacity > best.opacity) {
      best = { event, sectionLabel: section?.label ?? 'Prologue', opacity }
    }
  }

  return best
}

/** Closest intro event by calendar year when none is in the active dwell window */
export function getNearestIntroEvent(adYear: number): ActiveIntroEvent | null {
  const events = getAllIntroEventsChronological()
  if (events.length === 0) return null

  let nearest = events[0]!
  let minDist = Infinity

  for (const event of events) {
    const anchor = event.calendarYear
    if (anchor == null) continue
    const dist = Math.abs(adYear - anchor)
    if (dist < minDist) {
      minDist = dist
      nearest = event
    }
  }

  const section = INTRO_SECTIONS.find((s) => s.events.some((e) => e.id === nearest.id))

  return { event: nearest, sectionLabel: section?.label ?? 'Prologue', opacity: 1 }
}

export function getPrologueScrollTrigger(): ScrollTrigger | undefined {
  return ScrollTrigger.getById(PROLOGUE_TRACK_SCROLL_TRIGGER_ID)
}

export function resolvePrologueScrollYFromProgress(progress: number): number | null {
  const st = getPrologueScrollTrigger()
  if (!st) return null
  const p = clamp(progress, 0, 1)
  return st.start + (st.end - st.start) * p
}

export function resolvePrologueScrollY(ad: number): number | null {
  return resolvePrologueScrollYFromProgress(mapADToPrologueProgress(ad))
}

export function scrollToPrologueAD(
  ad: number,
  lenis: { scrollTo: (target: number, opts?: { duration?: number }) => void } | null,
): void {
  const y = resolvePrologueScrollY(ad)
  if (y == null) return

  if (lenis) {
    lenis.scrollTo(y, { duration: 2.2 })
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function isBeforeEcosystemTrack(scrollY: number): boolean {
  const st = getPrologueScrollTrigger()
  if (!st) return true
  return scrollY < st.end - 1
}
