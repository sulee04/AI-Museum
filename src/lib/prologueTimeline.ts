import {
  PROLOGUE_AD_MIN,
  PROLOGUE_AD_SPAN,
} from '@/constants/prologue'
import type { TimelineEvent } from '@/data/types'
import { INTRO_SECTIONS } from '@/data/introTimeline'
import { clamp } from '@/lib/utils'
import { ScrollTrigger } from '@/animations/registerGSAP'

export const PROLOGUE_TRACK_SCROLL_TRIGGER_ID = 'prologue-track'

export function mapPrologueProgressToAD(progress: number): number {
  const t = clamp(progress, 0, 1)
  return PROLOGUE_AD_MIN + t * PROLOGUE_AD_SPAN
}

export function mapADToPrologueProgress(ad: number): number {
  return clamp((ad - PROLOGUE_AD_MIN) / PROLOGUE_AD_SPAN, 0, 1)
}

export function getAllIntroEventsChronological(): TimelineEvent[] {
  return INTRO_SECTIONS.flatMap((section) => section.events)
    .filter((e) => e.calendarYear != null)
    .sort((a, b) => (a.calendarYear ?? 0) - (b.calendarYear ?? 0))
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

export function resolvePrologueScrollY(ad: number): number | null {
  const st = getPrologueScrollTrigger()
  if (!st) return null
  const p = mapADToPrologueProgress(ad)
  return st.start + (st.end - st.start) * p
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
