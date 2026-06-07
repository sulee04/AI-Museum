import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '@/animations/registerGSAP'
import { useLenis } from '@/app/providers/SmoothScrollProvider'
import { AA_EPOCH } from '@/constants/timeline'
import { PROLOGUE_AD_MAX, PROLOGUE_AD_MIN } from '@/constants/prologue'
import {
  AUTOPLAY_AA_YEARS_PER_SECOND,
  AUTOPLAY_AD_YEARS_PER_SECOND,
  driveAutoplayToY,
  endAutoplayDrive,
  getAutoplayZone,
  getMuseumTrackScrollTrigger,
  isAutoplayDriving,
  resolveScrollY,
  scrollToY,
} from '@/lib/autoplayScroll'
import { capAutoplayYearsPerSecond } from '@/lib/yearWheelScroll'
import { mapAAToProgress, mapProgressToAASmooth } from '@/lib/aaTimeline'
import {
  getPrologueScrollTrigger,
  mapADToPrologueProgress,
  mapPrologueProgressToAD,
  resolvePrologueScrollY,
} from '@/lib/prologueTimeline'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface UseMuseumAutoplayOptions {
  playing: boolean
  speed: number
  onStop: () => void
}

/**
 * Unified autoplay — prologue (AD) then ecosystem (AA).
 * Drives lenis with lerp; narrative store synced directly (avoids scrub lag).
 */
export function useMuseumAutoplay({ playing, speed, onStop }: UseMuseumAutoplayOptions) {
  const lenis = useLenis()
  const playingRef = useRef(playing)
  const speedRef = useRef(speed)
  const onStopRef = useRef(onStop)
  const lenisRef = useRef(lenis)
  const adCursorRef = useRef(PROLOGUE_AD_MIN)
  const aaCursorRef = useRef(0)

  playingRef.current = playing
  speedRef.current = speed
  onStopRef.current = onStop
  lenisRef.current = lenis

  useEffect(() => {
    if (!playing) {
      endAutoplayDrive()
      return
    }

    ScrollTrigger.refresh()

    const zone = getAutoplayZone(lenisRef.current)
    const prologueSt = getPrologueScrollTrigger()
    const ecosystemSt = getMuseumTrackScrollTrigger()

    if (zone === 'prologue' && prologueSt) {
      adCursorRef.current = mapPrologueProgressToAD(prologueSt.progress)
    } else if (ecosystemSt) {
      aaCursorRef.current = mapProgressToAASmooth(ecosystemSt.progress)
    }

    let rafId = 0
    let lastTime = performance.now()

    const frame = (now: number) => {
      if (!playingRef.current) return

      const dt = Math.min((now - lastTime) / 1000, 0.032)
      lastTime = now
      const rate = speedRef.current

      const currentZone = getAutoplayZone(lenisRef.current)
      const prologueNow = getPrologueScrollTrigger()
      const ecosystemNow = getMuseumTrackScrollTrigger()
      const lenis = lenisRef.current

      if (currentZone === 'prologue') {
        if (adCursorRef.current >= PROLOGUE_AD_MAX - 0.01) {
          const bridgeY = prologueNow?.end ?? lenis?.scroll ?? 0
          scrollToY(bridgeY + 2, lenis, true)
          adCursorRef.current = PROLOGUE_AD_MAX
          useNarrativeStore.getState().syncPrologueAutoplay(1)
        } else {
          const adRate = capAutoplayYearsPerSecond(AUTOPLAY_AD_YEARS_PER_SECOND, rate)
          adCursorRef.current = Math.min(
            PROLOGUE_AD_MAX,
            adCursorRef.current + adRate * dt,
          )
          const progress = mapADToPrologueProgress(adCursorRef.current)
          const y = resolvePrologueScrollY(adCursorRef.current)
          if (y !== null) driveAutoplayToY(y, lenis)
          useNarrativeStore.getState().syncPrologueAutoplay(progress)
        }

        const atBridge =
          (prologueNow?.progress ?? 0) >= 0.998 &&
          adCursorRef.current >= PROLOGUE_AD_MAX - 0.01

        if (atBridge && ecosystemNow) {
          aaCursorRef.current = 0
          scrollToY(ecosystemNow.start, lenis, true)
        } else if (!atBridge) {
          rafId = requestAnimationFrame(frame)
          return
        }
      }

      if (aaCursorRef.current >= AA_EPOCH.max - 0.001) {
        endAutoplayDrive()
        onStopRef.current()
        return
      }

      const aaRate = capAutoplayYearsPerSecond(AUTOPLAY_AA_YEARS_PER_SECOND, rate)
      aaCursorRef.current = Math.min(
        AA_EPOCH.max,
        aaCursorRef.current + aaRate * dt,
      )

      const progress = mapAAToProgress(aaCursorRef.current)
      const y = resolveScrollY(progress)
      if (y !== null) driveAutoplayToY(y, lenis)
      useNarrativeStore.getState().syncEcosystemAutoplay(progress)

      const stNow = getMuseumTrackScrollTrigger()
      if ((stNow?.progress ?? 0) >= 0.9995 || aaCursorRef.current >= AA_EPOCH.max - 0.001) {
        endAutoplayDrive()
        onStopRef.current()
        return
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      endAutoplayDrive()
    }
  }, [playing])

  useEffect(() => {
    if (!playing) return

    const stopOnWheel = (e: WheelEvent) => {
      if (!playingRef.current || isAutoplayDriving()) return
      if (e.deltaY === 0 && e.deltaX === 0) return
      onStopRef.current()
    }

    const stopOnTouch = () => {
      if (!playingRef.current || isAutoplayDriving()) return
      onStopRef.current()
    }

    window.addEventListener('wheel', stopOnWheel, { passive: true })
    window.addEventListener('touchmove', stopOnTouch, { passive: true })

    return () => {
      window.removeEventListener('wheel', stopOnWheel)
      window.removeEventListener('touchmove', stopOnTouch)
    }
  }, [playing])
}
