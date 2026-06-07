import { useNarrativeStore } from '@/stores/narrativeStore'

export function useDepthValue() {
  return useNarrativeStore((s) => s.depth)
}
