import { useEffect } from 'react'
import { ScrollTrigger, registerGSAP } from '@/animations/registerGSAP'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Scroll-driven 0→1 blend while passing through the title gate */
export function useTitleGateHandoff() {
  useEffect(() => {
    registerGSAP()

    const trigger = ScrollTrigger.create({
      trigger: '#museum-title-gate',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.45,
      onUpdate: (self) => {
        useNarrativeStore.getState().setHandoffProgress(self.progress)
      },
    })

    return () => trigger.kill()
  }, [])
}
