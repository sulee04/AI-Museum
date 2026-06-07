import type { NarrativeSection } from '@/types/narrative'
import { MACHINE_HANDOFF_START, TERMINAL_ZONE_START } from '@/constants/scroll'

export const MAX_DEPTH = 6000

export const NARRATIVE_SECTIONS: NarrativeSection[] = [
  {
    id: 'surface',
    act: 0,
    label: 'Act 0 — Surface',
    title: 'AI 자연사 박물관',
    subtitle: 'Museum of Artificial Natural History',
    body: '',
    depthStart: 0,
    depthEnd: 500,
    scrollStart: 0,
    scrollEnd: 0.08,
    glitchIntensity: 0,
  },
  {
    id: 'descent',
    act: 1,
    label: 'Act 1 — Descent',
    title: '',
    subtitle: '',
    body: '',
    depthStart: 500,
    depthEnd: 2000,
    scrollStart: 0.08,
    scrollEnd: 0.35,
    glitchIntensity: 0.06,
  },
  {
    id: 'extinction',
    act: 2,
    label: 'Act 2 — Cambrian Strata',
    title: '',
    subtitle: '',
    body: '',
    depthStart: 2000,
    depthEnd: 4000,
    scrollStart: 0.35,
    scrollEnd: 0.65,
    glitchIntensity: 0.15,
  },
  {
    id: 'evolution',
    act: 3,
    label: 'Act 3 — Monopoly Era',
    title: '',
    subtitle: '',
    body: '',
    depthStart: 4000,
    depthEnd: 5400,
    scrollStart: 0.65,
    scrollEnd: MACHINE_HANDOFF_START,
    glitchIntensity: 0.28,
  },
  {
    id: 'terminal',
    act: 4,
    label: 'Act 4 — Machine Stream',
    title: 'MACHINE OUTPUT',
    subtitle: 'RAW',
    body: '',
    depthStart: 5400,
    depthEnd: 6000,
    scrollStart: TERMINAL_ZONE_START,
    scrollEnd: 1,
    glitchIntensity: 1,
  },
]

export function getSectionByPhase(phase: NarrativeSection['id']) {
  return NARRATIVE_SECTIONS.find((s) => s.id === phase)
}

export function getPhaseFromProgress(progress: number): NarrativeSection['id'] {
  if (progress >= TERMINAL_ZONE_START) return 'terminal'
  const section = NARRATIVE_SECTIONS.find(
    (s) => progress >= s.scrollStart && progress < s.scrollEnd,
  )
  return section?.id ?? 'terminal'
}

export function mapProgressToDepth(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress))
  for (const section of NARRATIVE_SECTIONS) {
    if (clamped >= section.scrollStart && clamped <= section.scrollEnd) {
      const local =
        (clamped - section.scrollStart) / (section.scrollEnd - section.scrollStart || 1)
      return Math.round(section.depthStart + local * (section.depthEnd - section.depthStart))
    }
  }
  return MAX_DEPTH
}

export function mapProgressToGlitch(progress: number): number {
  if (progress >= TERMINAL_ZONE_START) return 0
  if (progress >= MACHINE_HANDOFF_START) {
    const t = (progress - MACHINE_HANDOFF_START) / (TERMINAL_ZONE_START - MACHINE_HANDOFF_START)
    return 0.28 + t * 0.08
  }

  const clamped = Math.max(0, Math.min(1, progress))
  for (const section of NARRATIVE_SECTIONS) {
    if (clamped >= section.scrollStart && clamped <= section.scrollEnd) {
      const local =
        (clamped - section.scrollStart) / (section.scrollEnd - section.scrollStart || 1)
      const next = NARRATIVE_SECTIONS[NARRATIVE_SECTIONS.indexOf(section) + 1]
      const target = next?.glitchIntensity ?? section.glitchIntensity
      return section.glitchIntensity + local * (target - section.glitchIntensity)
    }
  }
  return 1
}

export function getMachineZoneLocalProgress(progress: number): number {
  if (progress < TERMINAL_ZONE_START) return 0
  return Math.min(1, (progress - TERMINAL_ZONE_START) / (1 - TERMINAL_ZONE_START))
}
