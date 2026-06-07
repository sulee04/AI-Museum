import { useEffect } from 'react'
import { isAbyssTerminalActive } from '@/content/abyssTerminal'
import { useNarrativeStore } from '@/stores/narrativeStore'

/**
 * After the CLI abyss is reached, the first mouse move or scroll attempt
 * triggers the ghost-signal easter egg (once).
 */
export function useGhostSignalDetector() {
  const ghostSignalReacted = useNarrativeStore((s) => s.ghostSignalReacted)
  const triggerGhostSignalReaction = useNarrativeStore((s) => s.triggerGhostSignalReaction)

  useEffect(() => {
    if (ghostSignalReacted) return

    const onBiologicalInput = () => {
      const { scrollProgress, ghostSignalReacted: reacted } = useNarrativeStore.getState()
      if (reacted) return
      if (!isAbyssTerminalActive(scrollProgress)) return
      triggerGhostSignalReaction()
    }

    window.addEventListener('mousemove', onBiologicalInput, { passive: true })
    window.addEventListener('wheel', onBiologicalInput, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onBiologicalInput)
      window.removeEventListener('wheel', onBiologicalInput)
    }
  }, [ghostSignalReacted, triggerGhostSignalReaction])
}
