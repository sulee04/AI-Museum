/** Supported autoplay speed multipliers */
export const AUTOPLAY_SPEED_OPTIONS = [0.5, 1, 2, 3] as const

export type AutoplaySpeed = (typeof AUTOPLAY_SPEED_OPTIONS)[number]

export function formatAutoplaySpeed(speed: AutoplaySpeed): string {
  return speed === 1 ? '1×' : `${speed}×`
}
