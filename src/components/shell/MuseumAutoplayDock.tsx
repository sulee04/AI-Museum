import { useLenis } from '@/app/providers/SmoothScrollProvider'
import { MuseumAutoplayControls } from '@/components/layout/MuseumAutoplayControls'
import { scrollToStart } from '@/lib/autoplayScroll'
import type { AutoplaySpeed } from '@/constants/autoplay'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { useState } from 'react'

/** Floating autoplay controls — top-right dock */
export function MuseumAutoplayDock() {
  const lenis = useLenis()
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const [playing, setPlaying] = useState(false)
  const [autoplaySpeed, setAutoplaySpeed] = useState<AutoplaySpeed>(1)
  const atEnd = museumZone === 'ecosystem' && scrollProgress >= 0.999

  if (humanGuiOpacity <= 0.05) return null

  const toggleAutoplay = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (atEnd) scrollToStart(lenis)
    setPlaying(true)
  }

  return (
    <MuseumAutoplayControls
      playing={playing}
      speed={autoplaySpeed}
      onPlayingChange={setPlaying}
      onSpeedChange={setAutoplaySpeed}
      onToggle={toggleAutoplay}
    />
  )
}
