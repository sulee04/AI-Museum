/** Opacity for scroll-linked margin facts — matches useViewportReadableOpacity */
export function getScrollBeatReadableOpacity(element: HTMLElement): number {
  const rect = element.getBoundingClientRect()
  const vh = window.innerHeight
  const topThird = vh / 3
  const centerY = rect.top + rect.height * 0.5

  if (centerY <= topThird) return 0

  const fadeBand = vh * 0.14
  let opacity = 1

  if (centerY < topThird + fadeBand) {
    opacity = (centerY - topThird) / fadeBand
  }

  const bottomFade = vh * 0.1
  if (centerY > vh - bottomFade) {
    opacity = Math.min(opacity, (vh - centerY) / bottomFade)
  }

  return Math.max(0, Math.min(1, opacity))
}

/** Beat is fully faded — panel should dismiss */
export function isScrollBeatFullyFaded(element: HTMLElement): boolean {
  return getScrollBeatReadableOpacity(element) <= 0
}
