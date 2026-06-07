import { useScrollTrackRef } from '@/animations/timelines/masterTimeline'
import { initSpecimenPinTimeline } from '@/animations/timelines/specimenPins'
import {
  ECOSYSTEM_SCROLL_VH,
  TERMINAL_SECTION_VH,
  SCROLL_HEIGHT_VH,
} from '@/constants/timeline'
import { SPECIMENS } from '@/content/specimens'
import { getPinAnchorStyle } from '@/animations/timelines/specimenPins'
import { EcosystemScrollContent } from '@/components/ecosystem/EcosystemScrollContent'
import { MachineOutputPanel } from '@/components/terminal/MachineOutputPanel'
import { useEffect } from 'react'
import { ScrollTrigger } from '@/animations/registerGSAP'

/** AA 0–100 ecosystem → fixed-height terminal floor (museum end) */
export function MuseumScrollTrack() {
  const trackRef = useScrollTrackRef()

  useEffect(() => {
    if (!trackRef.current) return
    const cleanup = initSpecimenPinTimeline(trackRef.current)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return cleanup
  }, [trackRef])

  return (
    <div
      ref={trackRef}
      data-museum-scroll-track
      data-museum-end
      className="relative w-full"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="Museum continuous scroll track"
    >
      <div
        className="relative w-full"
        style={{ height: `${ECOSYSTEM_SCROLL_VH}vh` }}
      >
        <EcosystemScrollContent />

        {SPECIMENS.map((specimen) => (
          <div
            key={specimen.id}
            data-pin-id={specimen.id}
            className="pointer-events-none absolute left-0 w-px opacity-0"
            style={getPinAnchorStyle(specimen)}
            aria-hidden
          />
        ))}
      </div>

      <section
        className="relative w-full overflow-hidden bg-[var(--color-abyss-pure)]"
        style={{ height: `${TERMINAL_SECTION_VH}vh` }}
        aria-label="Machine terminal output — museum terminus"
      >
        <MachineOutputPanel embedded />
      </section>
    </div>
  )
}
