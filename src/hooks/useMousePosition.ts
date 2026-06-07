import { useEffect } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'

export function useMousePosition() {
  const setMouse = useNarrativeStore((s) => s.setMouse)

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
        screenX: event.clientX,
        screenY: event.clientY,
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [setMouse])
}
