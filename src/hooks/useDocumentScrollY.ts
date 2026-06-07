import { useEffect, useState } from 'react'
import { useLenis } from '@/app/providers/SmoothScrollProvider'

/** Reactive document scroll Y — Lenis or native fallback */
export function useDocumentScrollY(): number {
  const lenis = useLenis()
  const [scrollY, setScrollY] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY : 0,
  )

  useEffect(() => {
    if (lenis) {
      setScrollY(lenis.scroll)
      const onScroll = () => setScrollY(lenis.scroll)
      lenis.on('scroll', onScroll)
      return () => lenis.off('scroll', onScroll)
    }

    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenis])

  return scrollY
}
