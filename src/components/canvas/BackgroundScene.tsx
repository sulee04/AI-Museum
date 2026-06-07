import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { TERMINAL_ZONE_START } from '@/constants/timeline'

/** Subtle full-viewport backdrop — no lane particles */
export function BackgroundScene() {
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const inTerminal = scrollProgress >= TERMINAL_ZONE_START

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, reducedMotion ? 1 : 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        className="h-full w-full bg-transparent"
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#010308', 6, 22]} />
        <ambientLight intensity={0.08} color="#0d2847" />
        <Suspense fallback={null}>
          {!reducedMotion && !inTerminal && (
            <mesh position={[0, 0, -4]}>
              <planeGeometry args={[24, 16]} />
              <meshBasicMaterial color="#010308" transparent opacity={0.35} />
            </mesh>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
