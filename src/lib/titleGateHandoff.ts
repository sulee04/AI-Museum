import { ScrollTrigger } from '@/animations/registerGSAP'
import { clamp } from '@/lib/utils'

export const TITLE_GATE_SCROLL_TRIGGER_ID = 'title-gate-handoff'

export function getTitleGateScrollTrigger(): ScrollTrigger | undefined {
  return ScrollTrigger.getById(TITLE_GATE_SCROLL_TRIGGER_ID)
}

export function resolveTitleGateScrollY(progress: number): number | null {
  const st = getTitleGateScrollTrigger()
  if (!st) return null
  const p = clamp(progress, 0, 1)
  return st.start + (st.end - st.start) * p
}
