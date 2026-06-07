import type { ReactNode } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface MuseumLayoutProps {
  background: ReactNode
  effects?: ReactNode
  specimens?: ReactNode
  chrome: ReactNode
  children: ReactNode
}

export function MuseumLayout({
  background,
  effects,
  specimens,
  chrome,
  children,
}: MuseumLayoutProps) {
  const museumZone = useNarrativeStore((s) => s.museumZone)

  return (
    <div className="museum-root relative flex min-h-screen flex-col" data-zone={museumZone}>
      <div className="layer-background" aria-hidden>
        {background}
      </div>

      {effects && (
        <div className="layer-effects" aria-hidden>
          {effects}
        </div>
      )}

      <div className="layer-chrome w-full shrink-0">{chrome}</div>

      <main className="layer-content relative flex flex-col">{children}</main>

      {specimens && <div className="layer-specimens">{specimens}</div>}
    </div>
  )
}
