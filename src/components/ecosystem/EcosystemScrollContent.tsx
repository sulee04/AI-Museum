import { useMemo } from 'react'
import { getEcosystemScrollEvents } from '@/data/timelineData'
import { EcosystemScrollBeat } from '@/components/ecosystem/EcosystemScrollBeat'
import { ECOSYSTEM_SCROLL_VH } from '@/constants/ecosystemScroll'

/** Sparse AA-anchored archive facts — left/right margins, no chapter blocks */
export function EcosystemScrollContent() {
  const events = useMemo(() => getEcosystemScrollEvents(), [])

  return (
    <div
      className="pointer-events-none relative w-full"
      style={{ minHeight: `${ECOSYSTEM_SCROLL_VH}vh` }}
    >
      {events.map((event, index) => (
        <EcosystemScrollBeat
          key={event.id}
          event={event}
          side={index % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  )
}
