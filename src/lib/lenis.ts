import Lenis from 'lenis'

export type LenisInstance = Lenis

export function createLenis(reducedMotion: boolean) {
  if (reducedMotion) return null

  return new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: false,
    wheelMultiplier: 0.75,
    touchMultiplier: 1,
    lerp: 0.09,
  })
}
