import { AA_EPOCH, AUTOPLAY_AA_YEARS_PER_SECOND } from '@/constants/timeline'
import { AUTOPLAY_PROLOGUE_PROGRESS_PER_SECOND } from '@/constants/prologue'
import { mapAAToProgress, mapProgressToAASmooth } from '@/lib/aaTimeline'
import {
  getPrologueScrollTrigger,
  resolvePrologueScrollY,
} from '@/lib/prologueTimeline'
import { clamp } from '@/lib/utils'
import type { LenisInstance } from '@/lib/lenis'
import { ScrollTrigger } from '@/animations/registerGSAP'

export const MUSEUM_TRACK_SCROLL_TRIGGER_ID = 'museum-track'

export { AUTOPLAY_AA_YEARS_PER_SECOND, AUTOPLAY_PROLOGUE_PROGRESS_PER_SECOND }

let autoplayDriving = false

export function isAutoplayDriving(): boolean {
  return autoplayDriving
}

export function getMuseumTrackScrollTrigger(): ScrollTrigger | undefined {
  return ScrollTrigger.getById(MUSEUM_TRACK_SCROLL_TRIGGER_ID)
}

export function resolveScrollY(progress: number): number | null {
  const st = getMuseumTrackScrollTrigger()
  if (st) {
    const p = clamp(progress, 0, 1)
    return st.start + (st.end - st.start) * p
  }

  const track = document.querySelector<HTMLElement>('[data-museum-scroll-track]')
  if (!track) return null

  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  return clamp(progress, 0, 1) * max
}

export type AutoplayZone = 'prologue' | 'ecosystem'

export function getAutoplayZone(lenis: LenisInstance | null): AutoplayZone {
  const scrollY = lenis?.scroll ?? window.scrollY
  const prologueSt = getPrologueScrollTrigger()
  const ecosystemSt = getMuseumTrackScrollTrigger()

  if (prologueSt && scrollY < prologueSt.end - 2) {
    return 'prologue'
  }

  if (ecosystemSt && scrollY >= ecosystemSt.start - 2) {
    return 'ecosystem'
  }

  if (prologueSt && scrollY < (ecosystemSt?.start ?? Infinity)) {
    return 'prologue'
  }

  return 'ecosystem'
}

export function scrollToY(y: number, lenis: LenisInstance | null, immediate = true): void {
  autoplayDriving = true

  if (lenis) {
    lenis.scrollTo(clamp(y, 0, lenis.limit), { immediate, force: true, programmatic: true })
  } else {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo(0, clamp(y, 0, max))
  }

  ScrollTrigger.update()
  if (immediate) {
    requestAnimationFrame(() => {
      autoplayDriving = false
    })
  }
}

/** Smooth lenis chase for autoplay — lerp only, no duration easing restarts */
export function driveAutoplayToY(y: number, lenis: LenisInstance | null): void {
  if (!lenis) return

  autoplayDriving = true
  const target = clamp(y, 0, lenis.limit)

  lenis.scrollTo(target, {
    immediate: false,
    force: true,
    lerp: 0.14,
    duration: undefined,
    easing: undefined,
    programmatic: false,
  })

  ScrollTrigger.update()
}

export function endAutoplayDrive(): void {
  autoplayDriving = false
}

export function scrollToADYear(ad: number, lenis: LenisInstance | null): void {
  const y = resolvePrologueScrollY(ad)
  if (y === null) return
  scrollToY(y, lenis)
}

export function scrollToProgress(progress: number, lenis: LenisInstance | null): void {
  const y = resolveScrollY(progress)
  if (y === null) return
  scrollToY(y, lenis)
}

export function scrollToEnd(lenis: LenisInstance | null): void {
  scrollToProgress(1, lenis)
}

export function scrollToStart(lenis: LenisInstance | null): void {
  scrollToY(0, lenis)
}

/** Progress units per second at the current ecosystem scroll position */
export function getProgressPerSecond(progress: number): number {
  const aa = mapProgressToAASmooth(progress)
  if (aa >= AA_EPOCH.max) return 0

  const aaNext = Math.min(AA_EPOCH.max, aa + AUTOPLAY_AA_YEARS_PER_SECOND)
  const p0 = mapAAToProgress(aa)
  const p1 = mapAAToProgress(aaNext)

  return Math.max(p1 - p0, 0)
}

export function getPrologueProgressPerSecond(_progress: number): number {
  return AUTOPLAY_PROLOGUE_PROGRESS_PER_SECOND
}
