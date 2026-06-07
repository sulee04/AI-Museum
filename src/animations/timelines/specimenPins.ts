import { ScrollTrigger, registerGSAP } from '@/animations/registerGSAP'
import type { CSSProperties } from 'react'
import { SPECIMENS, getSpecimenPinMeta, type SpecimenEntry } from '@/content/specimens'
import { mapAAToScrollVh } from '@/lib/aaTimeline'

export function getPinAnchorStyle(specimen: SpecimenEntry): CSSProperties {
  const bornVh = mapAAToScrollVh(specimen.bornAA)
  const extinctVh = mapAAToScrollVh(specimen.extinctAA)
  const { sinkVh } = getSpecimenPinMeta(specimen)
  return {
    top: `${bornVh}vh`,
    height: `${Math.max(extinctVh - bornVh + sinkVh, 8)}vh`,
  }
}

/**
 * GSAP pin markers — each specimen's lifespan section in the scroll track.
 * Visual position is driven by SpecimenOcean; pins extend scroll dwell time per era.
 */
export function initSpecimenPinTimeline(container: HTMLElement) {
  registerGSAP()
  const triggers: ScrollTrigger[] = []

  SPECIMENS.forEach((specimen) => {
    const anchor = container.querySelector(`[data-pin-id="${specimen.id}"]`)
    if (!(anchor instanceof HTMLElement)) return

    const st = ScrollTrigger.create({
      trigger: anchor,
      start: 'top bottom',
      end: 'bottom top',
      pin: false,
      scrub: 0.4,
      onUpdate: (self) => {
        anchor.style.setProperty('--pin-progress', String(self.progress))
      },
    })
    triggers.push(st)
  })

  return () => triggers.forEach((t) => t.kill())
}
