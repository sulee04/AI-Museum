import { useGlitchIntensity } from '@/hooks/useGlitchIntensity'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { cn } from '@/lib/utils'
import { MACHINE_HANDOFF_START } from '@/constants/scroll'

export function GlitchOverlay() {
  const intensity = useGlitchIntensity()
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const machineBlend = useNarrativeStore((s) => s.machineModeBlend)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const museumZone = useNarrativeStore((s) => s.museumZone)

  if (museumZone !== 'ecosystem') return null

  const inHandoff = scrollProgress >= MACHINE_HANDOFF_START
  const handoffIntensity = inHandoff
    ? Math.max(intensity, machineBlend, (scrollProgress - MACHINE_HANDOFF_START) / 0.12)
    : intensity

  const overlayOpacity = Math.min(1, handoffIntensity * 0.55) * humanGuiOpacity

  if (reducedMotion || overlayOpacity < 0.02) return null

  return (
    <div
      className={cn(
        'pointer-events-none h-full w-full mix-blend-screen',
        inHandoff && handoffIntensity > 0.35 && 'animate-[glitch-shift_0.08s_steps(2)_infinite]',
        !inHandoff && handoffIntensity > 0.35 && 'animate-[glitch-shift_0.15s_steps(2)_infinite]',
      )}
      aria-hidden
      style={{
        opacity: overlayOpacity,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(180, 220, 200, 0.04) 2px,
            rgba(180, 220, 200, 0.04) 4px
          )
        `,
      }}
    />
  )
}
