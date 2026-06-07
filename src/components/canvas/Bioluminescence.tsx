import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useNarrativeStore } from '@/stores/narrativeStore'

const LIGHT_COUNT = 12

export function Bioluminescence() {
  const groupRef = useRef<THREE.Group>(null)
  const depth = useNarrativeStore((s) => s.depth)

  const lights = useRef(
    Array.from({ length: LIGHT_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10,
      ),
      phase: Math.random() * Math.PI * 2,
      intensity: 0.4 + Math.random() * 0.8,
    })),
  ).current

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const depthFactor = depth / 6000

    groupRef.current.children.forEach((child, i) => {
      const light = lights[i]
      if (!light || !(child instanceof THREE.PointLight)) return
      light.intensity =
        (0.2 + depthFactor * 1.5) *
        (0.5 + 0.5 * Math.sin(t * 1.2 + light.phase))
      child.intensity = light.intensity
    })
  })

  return (
    <group ref={groupRef}>
      {lights.map((light, i) => (
        <pointLight
          key={i}
          position={light.position}
          color="#7dffdb"
          intensity={light.intensity}
          distance={8}
          decay={2}
        />
      ))}
    </group>
  )
}
