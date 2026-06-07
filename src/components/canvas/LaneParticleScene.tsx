import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '@/components/canvas/ParticleField'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Particles scoped to bottom-right ecosystem lane */
export function LaneParticleScene() {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)

  return (
    <Canvas
      camera={{ position: [0, -1.4, 5.2], fov: 52 }}
      dpr={[1, reducedMotion ? 1 : 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      className="h-full w-full bg-transparent"
    >
      <ambientLight intensity={0.14} color="#0d2847" />
      <Suspense fallback={null}>
        {!reducedMotion && <ParticleField intensity={1} laneMode />}
      </Suspense>
    </Canvas>
  )
}
