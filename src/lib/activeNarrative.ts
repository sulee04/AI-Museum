import { NARRATIVE_LANDMARKS } from '@/content/landmarks.data'
import { getAllEcosystemEvents } from '@/data/timelineData'
import { getActiveLandmark } from '@/lib/landmarkVisibility'
import { getActiveIntroEvent, getNearestIntroEvent } from '@/lib/prologueTimeline'
import { getActiveTimelineEvent, getNearestTimelineEvent } from '@/lib/sectionVisibility'
import type { MuseumZone } from '@/stores/narrativeStore'

export interface ActiveNarrative {
  id: string
  /** Level 1 — section label (optional, single meta line) */
  meta?: string
  /** Level 2 — headline */
  headline: string
  /** Level 3 — supporting copy (center, short) */
  body?: string
  /** Prologue sector — extended detail below center */
  detail?: string
  opacity: number
  eventId?: string
}

const HERO_NARRATIVE: ActiveNarrative = {
  id: 'hero',
  meta: 'Pre-AI Chronicle',
  headline: '컴퓨팅의 기원',
  body: '스크롤하면 시간이 흐릅니다.',
  detail:
    'AD 1936년부터 컴퓨터, 인터넷, 딥러닝까지 — AI 이전의 역사를 따라갑니다. 각 시점의 사건을 눌러 아카이브에서 더 깊은 기록을 볼 수 있습니다.',
  opacity: 1,
}

const HANDOFF_NARRATIVES: ActiveNarrative[] = [
  {
    id: 'gate-title',
    meta: 'Museum',
    headline: 'AI Natural History Museum',
    body: '인공지능의 등장과 멸종을 기록하는 디지털 자연사 박물관.',
    detail: '서론을 지나면 After AI(AA) 연대기와 생태계 레인이 열립니다.',
    opacity: 1,
  },
  {
    id: 'gate-aa',
    meta: 'After AI',
    headline: 'AA 0',
    body: '인류가 AI 이후의 시간을 셀기 시작한 순간.',
    detail: '하단 레인에서 AI 표본의 등장과 소멸을 관찰할 수 있습니다.',
    opacity: 1,
  },
]

export function getActiveNarrative(input: {
  museumZone: MuseumZone
  prologueProgress: number
  adYearSmooth: number
  aaYearSmooth: number
  handoffProgress: number
  humanGuiOpacity: number
}): ActiveNarrative | null {
  const { museumZone, prologueProgress, adYearSmooth, aaYearSmooth, handoffProgress, humanGuiOpacity } =
    input

  if (humanGuiOpacity <= 0.05) return null

  if (prologueProgress < 0.015 && handoffProgress < 0.05) {
    return HERO_NARRATIVE
  }

  if (handoffProgress > 0.05 && handoffProgress < 0.98 && museumZone === 'prologue') {
    const idx = handoffProgress < 0.55 ? 0 : 1
    return { ...HANDOFF_NARRATIVES[idx]!, opacity: Math.min(1, handoffProgress * 2) }
  }

  if (museumZone === 'prologue') {
    const active = getActiveIntroEvent(adYearSmooth) ?? getNearestIntroEvent(adYearSmooth)
    if (!active) return null

    return {
      id: active.event.id,
      meta: active.sectionLabel,
      headline: active.event.title,
      body: active.event.summary,
      detail: active.event.detail,
      opacity: active.opacity,
      eventId: active.event.id,
    }
  }

  const landmark = getActiveLandmark(NARRATIVE_LANDMARKS, aaYearSmooth)
  if (landmark) {
    return {
      id: landmark.landmark.id,
      meta: `AA ${landmark.landmark.aa}`,
      headline: '',
      body: landmark.landmark.text,
      opacity: landmark.opacity,
    }
  }

  const ecoEvent =
    getActiveTimelineEvent(getAllEcosystemEvents(), aaYearSmooth) ??
    getNearestTimelineEvent(getAllEcosystemEvents(), aaYearSmooth)

  if (ecoEvent) {
    return {
      id: ecoEvent.event.id,
      meta: ecoEvent.event.aa != null ? `AA ${ecoEvent.event.aa}` : undefined,
      headline: ecoEvent.event.title,
      body: ecoEvent.event.summary,
      detail: ecoEvent.event.detail,
      opacity: ecoEvent.opacity,
      eventId: ecoEvent.event.id,
    }
  }

  return null
}
