import { useEffect, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface NarrativeProviderProps {
  children: ReactNode
}

export function NarrativeProvider({ children }: NarrativeProviderProps) {
  const reducedMotion = useReducedMotion()
  const setReducedMotion = useNarrativeStore((s) => s.setReducedMotion)

  useEffect(() => {
    setReducedMotion(reducedMotion)
  }, [reducedMotion, setReducedMotion])

  return <>{children}</>
}
