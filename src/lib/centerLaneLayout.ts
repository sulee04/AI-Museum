import { NARRATIVE_LANDMARKS } from '@/content/landmarks.data'
import { INTRO_SECTIONS } from '@/data/introTimeline'
import { getAllEcosystemEvents } from '@/data/timelineData'
import type { MuseumZone } from '@/stores/narrativeStore'
import { PROLOGUE_AD_MIN } from '@/constants/prologue'
import { getAllIntroEventsChronological } from '@/lib/prologueTimeline'
import { clamp } from '@/lib/utils'

/** Virtual timeline anchor for handoff / ecosystem mapping */
export const ECOSYSTEM_ANCHOR_OFFSET = 2035
export const HANDOFF_ANCHOR_START = 2017
export const HANDOFF_ANCHOR_SPAN = ECOSYSTEM_ANCHOR_OFFSET - HANDOFF_ANCHOR_START

export interface CenterLaneBeat {
  id: string
  laneIndex: number
  anchor: number
  meta?: string
  headline: string
  body?: string
  detail?: string
  eventId?: string
}

export interface CenterLaneCard {
  beat: CenterLaneBeat
  y: number
  opacity: number
}

const HERO_BEAT: Omit<CenterLaneBeat, 'laneIndex'> = {
  id: 'hero',
  anchor: PROLOGUE_AD_MIN - 1,
  meta: 'Pre-AI Chronicle',
  headline: '컴퓨팅의 기원',
  body: '아래로 스크롤하여 시간 속으로 내려갑니다.',
  detail:
    'AD 1936년부터 컴퓨터, 인터넷, 딥러닝까지 — AI 이전의 역사를 따라갑니다.',
}

const HANDOFF_BEATS: Omit<CenterLaneBeat, 'laneIndex'>[] = [
  {
    id: 'gate-title',
    anchor: HANDOFF_ANCHOR_START + 2,
    meta: 'Museum',
    headline: 'AI Natural History Museum',
    body: '인공지능의 등장과 멸종을 기록하는 디지털 자연사 박물관.',
  },
  {
    id: 'gate-enter',
    anchor: HANDOFF_ANCHOR_START + HANDOFF_ANCHOR_SPAN * 0.48,
    meta: 'Transition',
    headline: 'Entering the AA ecosystem',
    body: '서론이 닫히고 After AI(AA) 생태계 관측이 시작됩니다.',
  },
  {
    id: 'gate-aa',
    anchor: HANDOFF_ANCHOR_START + HANDOFF_ANCHOR_SPAN * 0.88,
    meta: 'After AI',
    headline: 'AA 0',
    body: '인류가 AI 이후의 시간을 셀기 시작한 순간.',
  },
]

let cachedBeats: CenterLaneBeat[] | null = null

export function getAllCenterLaneBeats(): CenterLaneBeat[] {
  if (cachedBeats) return cachedBeats

  const raw: Omit<CenterLaneBeat, 'laneIndex'>[] = [HERO_BEAT]

  for (const section of INTRO_SECTIONS) {
    for (const event of section.events) {
      if (event.calendarYear == null) continue
      raw.push({
        id: event.id,
        anchor: event.calendarYear,
        meta: section.label,
        headline: event.title,
        body: event.summary,
        detail: event.detail,
        eventId: event.id,
      })
    }
  }

  raw.push(...HANDOFF_BEATS)

  for (const lm of NARRATIVE_LANDMARKS) {
    raw.push({
      id: lm.id,
      anchor: ECOSYSTEM_ANCHOR_OFFSET + lm.aa,
      meta: `AA ${lm.aa}`,
      headline: '',
      body: lm.text,
    })
  }

  for (const event of getAllEcosystemEvents()) {
    if (event.aa == null) continue
    raw.push({
      id: event.id,
      anchor: ECOSYSTEM_ANCHOR_OFFSET + event.aa,
      meta: `AA ${event.aa}`,
      headline: event.title,
      body: event.summary,
      detail: event.detail,
      eventId: event.id,
    })
  }

  raw.sort((a, b) => a.anchor - b.anchor)

  cachedBeats = raw.map((beat, laneIndex) => ({ ...beat, laneIndex }))
  return cachedBeats
}

/** Anchor that yields the given fractional lane index (uniform beat pacing in prologue) */
function anchorFromLaneIndex(laneIndex: number): number {
  const beats = getAllCenterLaneBeats()
  if (beats.length === 0) return PROLOGUE_AD_MIN

  const clamped = clamp(laneIndex, 0, beats[beats.length - 1]!.laneIndex)
  const lo = Math.floor(clamped)
  const hi = Math.min(Math.ceil(clamped), beats.length - 1)
  const left = beats[lo]!
  const right = beats[hi]!

  if (lo === hi || left.laneIndex === right.laneIndex) return left.anchor

  const t = (clamped - left.laneIndex) / (right.laneIndex - left.laneIndex)
  return left.anchor + t * (right.anchor - left.anchor)
}

export function getCurrentLaneAnchor(input: {
  museumZone: MuseumZone
  prologueProgress: number
  adYearSmooth: number
  handoffProgress: number
  aaYearSmooth: number
}): number {
  const { museumZone, prologueProgress, adYearSmooth, handoffProgress, aaYearSmooth } = input

  if (museumZone === 'ecosystem') {
    return ECOSYSTEM_ANCHOR_OFFSET + aaYearSmooth
  }

  if (handoffProgress > 0.05) {
    return HANDOFF_ANCHOR_START + handoffProgress * HANDOFF_ANCHOR_SPAN
  }

  const introCount = getAllIntroEventsChronological().length
  if (introCount <= 0) return adYearSmooth

  const lastIntroLaneIndex = introCount
  const laneIndex = prologueProgress * lastIntroLaneIndex
  return anchorFromLaneIndex(laneIndex)
}

/** Fractional beat index — one card ≈ one viewport step (Deep Sea pacing) */
export function getCurrentLaneIndex(anchor: number): number {
  const beats = getAllCenterLaneBeats()
  if (beats.length === 0) return 0

  if (anchor <= beats[0]!.anchor) return beats[0]!.laneIndex

  for (let i = 0; i < beats.length - 1; i++) {
    const left = beats[i]!
    const right = beats[i + 1]!
    if (anchor >= left.anchor && anchor <= right.anchor) {
      const span = right.anchor - left.anchor
      const t = span > 0 ? (anchor - left.anchor) / span : 0
      return left.laneIndex + t * (right.laneIndex - left.laneIndex)
    }
  }

  return beats[beats.length - 1]!.laneIndex
}

function getLaneCardOpacity(yPx: number, viewportHeight: number): number {
  const cardCenter = viewportHeight * 0.5 + yPx
  const topFadeEnd = viewportHeight * 0.16
  const bottomFadeStart = viewportHeight * 0.84
  const fadeBand = viewportHeight * 0.14

  if (cardCenter < topFadeEnd - fadeBand * 0.4) return 0
  if (cardCenter > viewportHeight + fadeBand * 0.45) return 0

  let opacity = 1

  if (cardCenter < topFadeEnd) {
    opacity = (cardCenter - (topFadeEnd - fadeBand)) / fadeBand
  }

  if (cardCenter > bottomFadeStart) {
    opacity = Math.min(opacity, (viewportHeight + fadeBand * 0.4 - cardCenter) / fadeBand)
  }

  return clamp(opacity, 0, 1)
}

export function getLaneCardSpacing(viewportHeight: number): number {
  return Math.max(240, viewportHeight * 0.78)
}

export function getVisibleCenterLaneCards(input: {
  currentAnchor: number
  viewportHeight: number
}): CenterLaneCard[] {
  const { currentAnchor, viewportHeight } = input
  const effectiveHeight = viewportHeight > 64 ? viewportHeight : 360
  const spacing = getLaneCardSpacing(effectiveHeight)
  const currentIndex = getCurrentLaneIndex(currentAnchor)

  return getAllCenterLaneBeats()
    .map((beat) => {
      const delta = beat.laneIndex - currentIndex
      const y = delta * spacing
      const opacity = getLaneCardOpacity(y, effectiveHeight)
      return { beat, y, opacity }
    })
    .filter(({ opacity }) => opacity > 0.14)
    .slice(0, 4)
}
