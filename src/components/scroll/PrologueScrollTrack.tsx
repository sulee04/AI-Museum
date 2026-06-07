import { usePrologueTrackRef } from '@/animations/timelines/prologueTimeline'
import { PrologueScrollContent } from '@/components/prologue/PrologueScrollContent'
import { PROLOGUE_SCROLL_VH } from '@/constants/prologue'

/** AD scroll driver (1936→2017) with in-flow Deep Sea–style content beats */
export function PrologueScrollTrack() {
  const trackRef = usePrologueTrackRef()

  return (
    <div
      ref={trackRef}
      id="prologue-scroll-track"
      data-prologue-scroll-track
      className="relative w-full"
      style={{ minHeight: `${PROLOGUE_SCROLL_VH}vh` }}
    >
      <PrologueScrollContent />
    </div>
  )
}
