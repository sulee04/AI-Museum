import type { ReactNode } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface GuiLayerProps {
  children: ReactNode
}

/**
 * Human GUI — scroll-linked fade (never unmounted).
 */
export function GuiLayer({ children }: GuiLayerProps) {
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const machineBlend = useNarrativeStore((s) => s.machineModeBlend)

  return (
    <div
      className="fixed inset-0 z-[30]"
      style={{
        opacity: humanGuiOpacity,
        filter:
          machineBlend > 0
            ? `saturate(${humanGuiOpacity}) brightness(${0.65 + humanGuiOpacity * 0.35})`
            : undefined,
        pointerEvents: humanGuiOpacity < 0.08 ? 'none' : undefined,
      }}
    >
      {children}
    </div>
  )
}
