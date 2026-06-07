import { useLenis } from '@/app/providers/SmoothScrollProvider'
import { MuseumAutoplayControls } from '@/components/layout/MuseumAutoplayControls'
import { scrollToStart } from '@/lib/autoplayScroll'
import type { AutoplaySpeed } from '@/constants/autoplay'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function Header() {
  const lenis = useLenis()
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const [playing, setPlaying] = useState(false)
  const [autoplaySpeed, setAutoplaySpeed] = useState<AutoplaySpeed>(1)
  const atEnd = museumZone === 'ecosystem' && scrollProgress >= 0.999

  const headerOpacity =
    museumZone === 'prologue' ? 1 : Math.max(0.35, 1 - scrollProgress * 3)

  const toggleAutoplay = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (atEnd) scrollToStart(lenis)
    setPlaying(true)
  }

  return (
    <header
      className={cn(
        'flex w-full items-center justify-end gap-3 bg-[var(--color-abyss)]/80 px-[var(--space-gutter)] py-4 backdrop-blur-sm',
        'chrome-header-fade',
      )}
      style={{ opacity: headerOpacity }}
    >
      <MuseumAutoplayControls
        playing={playing}
        speed={autoplaySpeed}
        onPlayingChange={setPlaying}
        onSpeedChange={setAutoplaySpeed}
        onToggle={toggleAutoplay}
      />
    </header>
  )
}
