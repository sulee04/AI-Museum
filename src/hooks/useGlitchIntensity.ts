import { useNarrativeStore } from '@/stores/narrativeStore'

export function useGlitchIntensity() {
  return useNarrativeStore((s) => s.glitchIntensity)
}
