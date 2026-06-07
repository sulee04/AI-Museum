import type { MuseumZone } from '@/stores/narrativeStore'
import { clamp } from '@/lib/utils'
import {
  getHandoffTimelineSpan,
  getHandoffTimelineStart,
  getTimelinePFromScrollY,
} from '@/lib/scrollJourney'

/** Timeline rail position — proportional to total document scroll */
export function getTimelineRailProgress(input: { scrollY: number }): number {
  return getTimelinePFromScrollY(input.scrollY)
}

function smoothstep(t: number): number {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

/** 0→1 blend prologue (light) → ecosystem (archival navy) */
export function getEcoRevealFromTimeline(input: {
  museumZone: MuseumZone
  handoffProgress: number
  timelineP: number
}): number {
  const { museumZone, handoffProgress, timelineP } = input

  if (museumZone === 'ecosystem') return 1

  const handoffStart = getHandoffTimelineStart()
  const handoffSpan = getHandoffTimelineSpan()
  const fromTimeline = clamp((timelineP - handoffStart) / handoffSpan, 0, 1)
  const fromScroll = clamp((handoffProgress - 0.22) / 0.72, 0, 1)

  const raw = Math.max(fromTimeline, fromScroll)
  return smoothstep(raw)
}

/** Soft bell curve for handoff burst */
export function getHandoffBurstIntensity(handoffProgress: number): number {
  if (handoffProgress <= 0.08 || handoffProgress >= 0.96) return 0
  const wave = Math.sin(((handoffProgress - 0.08) / 0.88) * Math.PI)
  return wave
}
