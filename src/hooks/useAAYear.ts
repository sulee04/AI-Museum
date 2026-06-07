import { useNarrativeStore } from '@/stores/narrativeStore'

export function useAAYear() {
  return useNarrativeStore((s) => s.aaYearSmooth)
}
