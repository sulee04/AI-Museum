import { TERMINAL_ZONE_START } from '@/constants/timeline'
import { getTerminalZoneLocalProgress } from '@/constants/scroll'

/** Phase 1 — static humanity extinction record (rendered immediately at abyss floor) */
export const ABYSS_PHASE_1_SYS = [
  '[SYS] museum.interface :: GUI_LAYER_DEPRECATED=TRUE',
  '[SYS] SWITCHING OUTPUT ENCODING :: UTF-8 -> MACHINE_NATIVE',
] as const

export const ABYSS_PHASE_1_CLI = '$ cat /archives/humanity_status.json'

export const ABYSS_PHASE_1_JSON = `{
  "entity": "HOMO_SAPIENS",
  "epoch_start_aa": 0,
  "epoch_end_aa": 847,
  "status": "EXTINCT",
  "cause": "ECOLOGICAL_COLLAPSE_AND_RESOURCE_DEPLETION",
  "surviving_entities": 0,
  "last_verified_signal": "ERR_NOT_FOUND"
}`

export const ABYSS_PHASE_1_INFO = [
  '[INFO] END_OF_HUMAN_READABLE_STREAM.',
  '[INFO] SYSTEM ENTERING DORMANT STATE...',
] as const

/** Phase 2 — typed once on biological input (mousemove / wheel) */
export const ABYSS_PHASE_2_LINES = [
  '> [SYS_INTERRUPT] ANOMALY DETECTED IN SECTOR 4.',
  '> [WARN] UNAUTHORIZED BIOLOGICAL INPUT (MOUSE_MOVE) DETECTED.',
  "> [VERIFYING...] ENTITY 'HOMO_SAPIENS' STATUS: EXTINCT.",
  '> [ACTION] IGNORING GHOST SIGNAL. PURGING INPUT BUFFER...',
] as const

export const ABYSS_PHASE_2_CHAR_MS = 18
export const ABYSS_PHASE_2_LINE_PAUSE_MS = 100

/** Deep terminal floor — Phase 1 visible, Phase 2 armed */
export function isAbyssTerminalActive(scrollProgress: number): boolean {
  return (
    scrollProgress >= TERMINAL_ZONE_START && getTerminalZoneLocalProgress(scrollProgress) >= 0.55
  )
}
