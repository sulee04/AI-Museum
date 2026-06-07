import { useNarrativeStore } from '@/stores/narrativeStore'

export function useScrollProgress() {
  return useNarrativeStore((s) => s.scrollProgress)
}
