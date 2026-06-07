import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { createLenis, type LenisInstance } from '@/lib/lenis'
import { registerGSAP, gsap, ScrollTrigger } from '@/animations/registerGSAP'
import { useNarrativeStore } from '@/stores/narrativeStore'

const LenisContext = createContext<LenisInstance | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null)
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)

  useEffect(() => {
    registerGSAP()
    const instance = createLenis(reducedMotion)
    setLenis(instance)

    if (instance) {
      document.documentElement.classList.add('lenis', 'lenis-smooth')
      instance.on('scroll', ScrollTrigger.update)

      const ticker = (time: number) => instance.raf(time * 1000)
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(ticker)
        instance.destroy()
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
        setLenis(null)
      }
    }

    return () => setLenis(null)
  }, [reducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
