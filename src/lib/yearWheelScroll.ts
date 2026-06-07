import {
  MAX_TIMELINE_YEARS_PER_SECOND,
  WHEEL_PIXELS_PER_NOTCH,
  WHEEL_YEARS_PER_NOTCH,
} from '@/constants/scrollInput'
import {
  PROLOGUE_SCROLL_VH,
  WHEEL_PROLOGUE_PROGRESS_PER_NOTCH,
} from '@/constants/prologue'
import { VH_PER_AA_YEAR } from '@/constants/timeline'
import { AA_EPOCH } from '@/constants/timeline'
import { mapAAToProgress, mapProgressToAASmooth } from '@/lib/aaTimeline'
import {
  getAutoplayZone,
  getMuseumTrackScrollTrigger,
  resolveScrollY,
} from '@/lib/autoplayScroll'
import type { LenisInstance } from '@/lib/lenis'
import {
  getPrologueScrollTrigger,
  resolvePrologueScrollYFromProgress,
} from '@/lib/prologueTimeline'
import { clamp } from '@/lib/utils'

type WheelScrollMode = 'hero' | 'prologue-years' | 'gate' | 'ecosystem-years'

const wheelBudget = {
  lastTime: 0,
  remainingYears: MAX_TIMELINE_YEARS_PER_SECOND,
}

/** Max prologue progress rate — same vh/sec cap as ecosystem year wheel */
const MAX_PROLOGUE_PROGRESS_PER_SECOND =
  (MAX_TIMELINE_YEARS_PER_SECOND * VH_PER_AA_YEAR) / PROLOGUE_SCROLL_VH

const prologueWheelBudget = {
  lastTime: 0,
  remainingProgress: MAX_PROLOGUE_PROGRESS_PER_SECOND,
}

function getWheelScrollMode(scrollY: number): WheelScrollMode {
  const prologueSt = getPrologueScrollTrigger()
  const ecosystemSt = getMuseumTrackScrollTrigger()

  if (prologueSt && scrollY < prologueSt.start - 8) return 'hero'
  if (prologueSt && scrollY >= prologueSt.start && scrollY < prologueSt.end - 8) {
    return 'prologue-years'
  }
  if (ecosystemSt && scrollY >= ecosystemSt.start + 8) return 'ecosystem-years'
  return 'gate'
}

function wheelDeltaToNotch(deltaY: number): number {
  const sign = Math.sign(deltaY)
  if (sign === 0) return 0
  const abs = Math.abs(deltaY)
  if (abs >= 48) return sign
  return sign * clamp(abs / 48, 0.08, 1)
}

function consumePrologueProgressBudget(progress: number, now: number): number {
  const dt = prologueWheelBudget.lastTime
    ? Math.min((now - prologueWheelBudget.lastTime) / 1000, 0.05)
    : 0.016
  prologueWheelBudget.lastTime = now
  prologueWheelBudget.remainingProgress = Math.min(
    MAX_PROLOGUE_PROGRESS_PER_SECOND,
    prologueWheelBudget.remainingProgress + MAX_PROLOGUE_PROGRESS_PER_SECOND * dt,
  )

  const allowed = Math.min(Math.abs(progress), prologueWheelBudget.remainingProgress)
  prologueWheelBudget.remainingProgress -= allowed
  return Math.sign(progress) * allowed
}

function consumeYearBudget(years: number, now: number): number {
  const dt = wheelBudget.lastTime ? Math.min((now - wheelBudget.lastTime) / 1000, 0.05) : 0.016
  wheelBudget.lastTime = now
  wheelBudget.remainingYears = Math.min(
    MAX_TIMELINE_YEARS_PER_SECOND,
    wheelBudget.remainingYears + MAX_TIMELINE_YEARS_PER_SECOND * dt,
  )

  const allowed = Math.min(Math.abs(years), wheelBudget.remainingYears)
  wheelBudget.remainingYears -= allowed
  return Math.sign(years) * allowed
}

function resolveYearScrollDelta(
  yearDelta: number,
  scrollY: number,
  mode: 'prologue-years' | 'ecosystem-years',
): number {
  if (mode === 'prologue-years') {
    const prologueSt = getPrologueScrollTrigger()
    if (!prologueSt) return 0

    const nextProgress = clamp(
      prologueSt.progress + yearDelta,
      0,
      1,
    )
    const nextY = resolvePrologueScrollYFromProgress(nextProgress)
    if (nextY == null) return 0
    return nextY - scrollY
  }

  const ecosystemSt = getMuseumTrackScrollTrigger()
  if (!ecosystemSt) return 0

  const currentAA = mapProgressToAASmooth(ecosystemSt.progress)
  const nextAA = clamp(currentAA + yearDelta, AA_EPOCH.min, AA_EPOCH.max)
  const nextY = resolveScrollY(mapAAToProgress(nextAA))
  if (nextY == null) return 0
  return nextY - scrollY
}

/** Convert wheel delta to document scroll delta — ~1 year/notch in timeline zones */
export function resolveWheelScrollDelta(
  deltaY: number,
  lenis: LenisInstance | null,
): number {
  const scrollY = lenis?.scroll ?? window.scrollY
  const mode = getWheelScrollMode(scrollY)
  const notch = wheelDeltaToNotch(deltaY)

  if (mode === 'hero' || mode === 'gate') {
    return notch * WHEEL_PIXELS_PER_NOTCH
  }

  const zone = getAutoplayZone(lenis)
  if (zone === 'prologue') {
    const rawProgress = notch * WHEEL_PROLOGUE_PROGRESS_PER_NOTCH
    const progress = consumePrologueProgressBudget(rawProgress, performance.now())
    return resolveYearScrollDelta(progress, scrollY, 'prologue-years')
  }

  const rawYears = notch * WHEEL_YEARS_PER_NOTCH
  const years = consumeYearBudget(rawYears, performance.now())

  return resolveYearScrollDelta(years, scrollY, 'ecosystem-years')
}

/** Cap autoplay rate — 3× speed cannot exceed MAX_TIMELINE_YEARS_PER_SECOND */
export function capAutoplayYearsPerSecond(baseRate: number, speedMultiplier: number): number {
  return Math.min(baseRate * speedMultiplier, MAX_TIMELINE_YEARS_PER_SECOND)
}
