import type { EventMapRegion } from '@/data/types'
import { cn } from '@/lib/utils'

interface DummyWorldMapProps {
  regions: EventMapRegion[]
  className?: string
}

/** Placeholder world map — hotspot regions for expanded event drawer */
export function DummyWorldMap({ regions, className }: DummyWorldMapProps) {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden',
        'bg-gradient-to-b from-[#0a1424]/80 via-[#060b14]/90 to-[#020508]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(114, 242, 220, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(114, 242, 220, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full opacity-35" aria-hidden>
        <ellipse cx="50" cy="31" rx="46" ry="28" fill="none" stroke="rgba(114,242,220,0.12)" strokeWidth="0.35" />
        <path
          d="M12 28 Q28 18 42 24 T68 22 T88 30"
          fill="none"
          stroke="rgba(114,242,220,0.1)"
          strokeWidth="0.45"
        />
        <path
          d="M8 38 Q32 48 55 42 T92 36"
          fill="none"
          stroke="rgba(114,242,220,0.1)"
          strokeWidth="0.45"
        />
      </svg>

      {regions.map((region) => (
        <div
          key={region.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${region.x}%`, top: `${region.y}%` }}
        >
          <span
            className="relative block rounded-full bg-[rgba(0,217,194,0.14)]"
            style={{
              width: `${10 + region.intensity * 16}px`,
              height: `${10 + region.intensity * 16}px`,
              boxShadow: `0 0 ${6 + region.intensity * 14}px rgba(0,217,194,${0.12 + region.intensity * 0.28})`,
            }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[rgba(0,217,194,0.15)] opacity-40" />
          </span>
          <span className="mt-1.5 max-w-[5rem] text-center text-[0.5625rem] leading-tight tracking-wide text-[var(--color-text-ghost)]">
            {region.label}
          </span>
        </div>
      ))}

      <div className="absolute bottom-2.5 left-3 archive-kicker">
        Reconstruction · AA archive map
      </div>
    </div>
  )
}
