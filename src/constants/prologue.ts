/** Prologue scroll = AD calendar years (pre-AA era) */
export const PROLOGUE_AD_MIN = 1936
export const PROLOGUE_AD_MAX = 2017
export const PROLOGUE_AD_SPAN = PROLOGUE_AD_MAX - PROLOGUE_AD_MIN

/** ~10vh per AD year — museum-paced prologue descent */
export const VH_PER_AD_YEAR = 10
export const PROLOGUE_SCROLL_VH = PROLOGUE_AD_SPAN * VH_PER_AD_YEAR

/** Autoplay: 0.5 AD year per second at 1× (ecosystem AA uses AUTOPLAY_AA_YEARS_PER_SECOND) */
export const AUTOPLAY_AD_YEARS_PER_SECOND = 0.5

/** In-flow chapter opener height (Deep Sea–style vertical beats) */
export const PROLOGUE_CHAPTER_INTRO_VH = 28

/** Total intro events across all chapters — keep in sync with introTimeline */
export const PROLOGUE_EVENT_COUNT = 12

export const PROLOGUE_EVENT_BEAT_VH =
  (PROLOGUE_SCROLL_VH - 3 * PROLOGUE_CHAPTER_INTRO_VH) / PROLOGUE_EVENT_COUNT

export const PROLOGUE_EPOCH = {
  min: PROLOGUE_AD_MIN,
  max: PROLOGUE_AD_MAX,
  span: PROLOGUE_AD_SPAN,
} as const
