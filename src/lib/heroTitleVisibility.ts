import { clamp } from '@/lib/utils'

/** Title fully visible through AA 0; fades AA 1 → 2 (~10–20vh scroll) */
export const HERO_TITLE_FADE_AA_START = 1
export const HERO_TITLE_FADE_AA_END = 2
export const HERO_TITLE_EXIT_Y_PX = -80

export interface HeroTitleVisibility {
  opacity: number
  translateY: number
  isGone: boolean
}

export function getHeroTitleVisibility(aaYearSmooth: number): HeroTitleVisibility {
  if (aaYearSmooth < HERO_TITLE_FADE_AA_START) {
    return { opacity: 1, translateY: 0, isGone: false }
  }

  if (aaYearSmooth >= HERO_TITLE_FADE_AA_END) {
    return { opacity: 0, translateY: HERO_TITLE_EXIT_Y_PX, isGone: true }
  }

  const t = clamp(
    (aaYearSmooth - HERO_TITLE_FADE_AA_START) /
      (HERO_TITLE_FADE_AA_END - HERO_TITLE_FADE_AA_START),
    0,
    1,
  )

  return {
    opacity: 1 - t,
    translateY: t * HERO_TITLE_EXIT_Y_PX,
    isGone: false,
  }
}
