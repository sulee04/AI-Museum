import { useNarrativeStore } from '@/stores/narrativeStore'

export function useNarrativePhase() {
  return useNarrativeStore((s) => s.phase)
}
