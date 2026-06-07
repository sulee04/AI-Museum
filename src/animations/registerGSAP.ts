import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Register synchronously on import — child effects run before parent useEffect */
gsap.registerPlugin(ScrollTrigger)

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
