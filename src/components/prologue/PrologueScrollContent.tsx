import { INTRO_SECTIONS } from '@/data/introTimeline'
import { PROLOGUE_BEAT_VH } from '@/constants/prologue'

/** Invisible scroll height markers — one uniform beat per event */
export function PrologueScrollContent() {
  return (
    <div className="relative w-full">
      {INTRO_SECTIONS.flatMap((section) => section.events).map((event) => (
        <div
          key={event.id}
          aria-hidden
          data-prologue-event={event.id}
          data-prologue-year={event.calendarYear}
          style={{ minHeight: `${PROLOGUE_BEAT_VH}vh` }}
        />
      ))}
    </div>
  )
}
