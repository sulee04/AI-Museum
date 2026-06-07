import type { ReactNode } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { cn } from '@/lib/utils'

interface EcosystemGuiProps {
  children: ReactNode
}

/**
 * Ecosystem-phase GUI wrapper — no fixed positioning.
 * Opacity fades with scroll; children manage their own layer classes.
 */
export function EcosystemGui({ children }: EcosystemGuiProps) {
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const machineBlend = useNarrativeStore((s) => s.machineModeBlend)

  return (
    <div
      className={cn(
        'layer-content pointer-events-none w-full',
        humanGuiOpacity < 0.08 && 'invisible',
      )}
      style={{
        opacity: humanGuiOpacity,
        filter:
          machineBlend > 0
            ? `saturate(${humanGuiOpacity}) brightness(${0.65 + humanGuiOpacity * 0.35})`
            : undefined,
      }}
    >
      {children}
    </div>
  )
}
