import { clamp } from '@/lib/utils'
import {
  SCROLL_HEIGHT_VH,
  ECOSYSTEM_ZONE_END,
  TERMINAL_ZONE_START,
} from '@/constants/timeline'

export {
  SCROLL_HEIGHT_VH,
  VH_PER_AA_YEAR,
  ECOSYSTEM_ZONE_END,
  BUFFER_ZONE_START,
  BUFFER_ZONE_END,
  TERMINAL_ZONE_START,
  MACHINE_ZONE_START,
  MACHINE_HANDOFF_START,
} from '@/constants/timeline'

export function progressToVh(progress: number): number {
  return progress * SCROLL_HEIGHT_VH
}

/**
 * Human GUI opacity (1 = visible, 0 = terminal takeover).
 * Fades during late ecosystem + early terminal scroll — no frozen AA-100 plateau.
 */
export function getHumanGuiOpacity(progress: number): number {
  const p = clamp(progress, 0, 1)

  if (p <= TERMINAL_ZONE_START) {
    const ecoT = p / ECOSYSTEM_ZONE_END
    if (ecoT < 0.9) return 1
    return clamp(1 - ((ecoT - 0.9) / 0.1) * 0.4, 0.6, 1)
  }

  const terminalT = (p - TERMINAL_ZONE_START) / (1 - TERMINAL_ZONE_START)
  if (terminalT >= 0.2) return 0
  return clamp(1 - terminalT / 0.2, 0, 1)
}

export function getMachineBlend(progress: number): number {
  return 1 - getHumanGuiOpacity(progress)
}

/** @deprecated — buffer zone removed; maps to early terminal fade */
export function getBufferLocalProgress(progress: number): number {
  if (progress < TERMINAL_ZONE_START) return 0
  const terminalT = (progress - TERMINAL_ZONE_START) / (1 - TERMINAL_ZONE_START)
  return clamp(terminalT / 0.2, 0, 1)
}

/** 0–1 within terminal section + machine tail */
export function getTerminalZoneLocalProgress(progress: number): number {
  if (progress < TERMINAL_ZONE_START) return 0
  return clamp((progress - TERMINAL_ZONE_START) / (1 - TERMINAL_ZONE_START), 0, 1)
}
