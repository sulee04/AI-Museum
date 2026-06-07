import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '@/components/canvas/ParticleField'
import { Bioluminescence } from '@/components/canvas/Bioluminescence'
import { PostProcessingStack } from '@/components/canvas/PostProcessingStack'
import { FloatingSpecimenScene } from '@/components/canvas/FloatingSpecimenScene'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { TERMINAL_ZONE_START } from '@/constants/timeline'

export function DeepSeaScene() {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)

  const inTerminal = scrollProgress >= TERMINAL_ZONE_START
  const fogNear = 4 - scrollProgress * 2
  const fogFar = 18 - scrollProgress * 6
  const particleIntensity = 1
  const showEffects = !inTerminal

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, reducedMotion ? 1 : 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        className="h-full w-full bg-transparent"
      >
        <color attach="background" args={['#010308']} />
        <fog attach="fog" args={['#010308', fogNear, fogFar]} />
        <ambientLight intensity={0.12} color="#0d2847" />
        <Suspense fallback={null}>
          {!reducedMotion && (
            <>
              <ParticleField intensity={particleIntensity} />
              {showEffects && (
                <>
                  <FloatingSpecimenScene />
                  <Bioluminescence />
                  <PostProcessingStack />
                </>
              )}
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
