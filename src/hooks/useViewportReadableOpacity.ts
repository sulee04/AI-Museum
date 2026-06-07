import { useEffect, useState, type RefObject } from 'react'
import { getScrollBeatReadableOpacity } from '@/lib/scrollBeatOpacity'

/** Opacity for scroll facts — readable only in bottom 2/3; fully faded before top third */
export function useViewportReadableOpacity(ref: RefObject<HTMLElement | null>) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0

    const update = () => {
      setOpacity(getScrollBeatReadableOpacity(element))
    }

    const loop = () => {
      update()
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frame)
  }, [ref])

  return opacity
}
