import { useMemo } from 'react'
import { getEcosystemScrollEvents } from '@/data/timelineData'
import { ECOSYSTEM_SCROLL_VH } from '@/constants/ecosystemScroll'

const BEAT_VH = ECOSYSTEM_SCROLL_VH / 48

/** Invisible AA scroll markers — center lane renders narrative */
export function EcosystemScrollContent() {
  const events = useMemo(() => getEcosystemScrollEvents(), [])

  return (
    <div
      className="pointer-events-none relative w-full"
      style={{ minHeight: `${ECOSYSTEM_SCROLL_VH}vh` }}
    >
      {events.map((event) => (
        <div
          key={event.id}
          aria-hidden
          data-ecosystem-event={event.id}
          data-ecosystem-aa={event.aa}
          style={{ minHeight: `${BEAT_VH}vh` }}
        />
      ))}
    </div>
  )
}
