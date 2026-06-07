import { useEffect } from 'react'
import { useLenis } from '@/app/providers/SmoothScrollProvider'

/** Stop Lenis + body overflow while a modal/drawer is open; inner scroll uses data-lenis-prevent */
export function useLockBackgroundScroll(locked: boolean) {
  const lenis = useLenis()

  useEffect(() => {
    if (!locked) return

    lenis?.stop()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
      lenis?.start()
    }
  }, [locked, lenis])
}
