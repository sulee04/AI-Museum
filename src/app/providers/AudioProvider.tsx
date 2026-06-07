import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { Howl } from 'howler'
import { useNarrativeStore } from '@/stores/narrativeStore'

interface AudioContextValue {
  enableSound: () => void
  disableSound: () => void
}

const AudioCtx = createContext<AudioContextValue | null>(null)

export function useAudio() {
  return useContext(AudioCtx)
}

interface AudioProviderProps {
  children: ReactNode
}

export function AudioProvider({ children }: AudioProviderProps) {
  const soundEnabled = useNarrativeStore((s) => s.soundEnabled)
  const depth = useNarrativeStore((s) => s.depth)
  const setSoundEnabled = useNarrativeStore((s) => s.setSoundEnabled)
  const ambientRef = useRef<Howl | null>(null)

  useEffect(() => {
    // Wire to /public/audio/*.mp3 when assets are added
    // Howl requires at least one src — skip until files exist
    return () => {
      ambientRef.current?.unload()
      ambientRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!ambientRef.current || !soundEnabled) return
    const volume = Math.min(0.35, depth / 6000 + 0.05)
    ambientRef.current.volume(volume)
  }, [depth, soundEnabled])

  const enableSound = useCallback(() => {
    setSoundEnabled(true)
    if (!ambientRef.current) {
      ambientRef.current = new Howl({
        src: ['/audio/ambient-deep.mp3'],
        volume: 0.15,
        loop: true,
        html5: true,
        onloaderror: () => {
          // Asset not yet added — silent fallback
        },
      })
    }
    ambientRef.current.play()
  }, [setSoundEnabled])

  const disableSound = useCallback(() => {
    setSoundEnabled(false)
    ambientRef.current?.pause()
  }, [setSoundEnabled])

  return (
    <AudioCtx.Provider value={{ enableSound, disableSound }}>
      {children}
    </AudioCtx.Provider>
  )
}
