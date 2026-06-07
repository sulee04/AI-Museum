import { useEffect } from 'react'
import { useNarrativeStore } from '@/stores/narrativeStore'

/**
 * Applies machine-mode CSS variables to document root — strips GUI styling gradually.
 */
export function MachineModeStyles() {
  const machineBlend = useNarrativeStore((s) => s.machineModeBlend)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--machine-blend', String(machineBlend))
    root.dataset.mode = machineBlend > 0.15 ? 'machine' : 'human'
  }, [machineBlend])

  return null
}
