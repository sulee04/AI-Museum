import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SpecimenEntry } from '@/content/specimens'
import { layoutToWorld } from '@/content/specimens'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { clamp, lerp } from '@/lib/utils'

const COUNT = 72

interface SpecimenMicroClusterProps {
  specimen: SpecimenEntry
  opacity: number
  glitch: number
  positionX: number
  positionY: number
  sinking: boolean
}

export function SpecimenMicroCluster({
  specimen,
  opacity,
  glitch,
  positionX,
  positionY,
  sinking,
}: SpecimenMicroClusterProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useNarrativeStore((s) => s.mouse)
  const hoveredId = useNarrativeStore((s) => s.hoveredSpecimenId)
  const mutationRef = useRef(0)

  const isHovered = hoveredId === specimen.id
  const [wx, wy] = layoutToWorld(positionX, positionY)

  const { basePositions, colors, phases } = useMemo(() => {
    const basePositions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const phases = new Float32Array(COUNT)
    const baseColor = new THREE.Color('#737373')
    const corrupt = new THREE.Color('#525252')

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 0.05 + Math.random() * 0.1

      basePositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      basePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      basePositions[i3 + 2] = radius * Math.cos(phi)

      const mixed = baseColor.clone().lerp(corrupt, Math.random() * 0.15)
      colors[i3] = mixed.r
      colors[i3 + 1] = mixed.g
      colors[i3 + 2] = mixed.b
      phases[i] = Math.random() * Math.PI * 2
    }

    return { basePositions, colors, phases }
  }, [specimen.id])

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current || !groupRef.current || opacity < 0.02) return

    const t = clock.getElapsedTime()
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array

    const screenX = (positionX / 100) * 2 - 1
    const screenY = -(positionY / 100) * 2 + 1
    const cursorDist = Math.hypot(mouse.x - screenX, mouse.y - screenY)
    const hoverPull = isHovered ? 1 : clamp(1 - cursorDist / 0.45, 0, 1) * 0.85
    const targetMutation = sinking ? glitch * 0.5 : hoverPull * opacity * (1 + glitch * 0.4)

    mutationRef.current = lerp(mutationRef.current, targetMutation, delta * 6)
    const mutation = mutationRef.current
    const breaking = glitch * 1.2 + mutation * 0.5

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const phase = phases[i]!
      const bx = basePositions[i3]!
      const by = basePositions[i3 + 1]!
      const bz = basePositions[i3 + 2]!

      const pulse = 1 + mutation * 1.2 + Math.sin(t * 12 + phase * 4) * mutation * 0.2
      const gx = (Math.random() - 0.5) * breaking * 0.08
      const gy = (Math.random() - 0.5) * breaking * 0.08
      const towardX = (mouse.x - screenX) * mutation * 0.1
      const towardY = (mouse.y - screenY) * mutation * 0.1
      const sinkPull = sinking ? glitch * 0.04 * (i % 5) : 0

      pos[i3] = bx * pulse + towardX + gx
      pos[i3 + 1] = by * pulse + towardY + gy - sinkPull + Math.sin(t * 4 + i) * mutation * 0.015
      pos[i3 + 2] = bz * pulse + (Math.random() - 0.5) * breaking * 0.04
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    const material = pointsRef.current.material as THREE.PointsMaterial
    material.opacity = opacity * (0.4 + mutation * 0.45)
    material.size = 0.014 + mutation * 0.014 + glitch * 0.012
  })

  if (opacity < 0.01 || (!sinking && glitch < 0.05)) return null

  return (
    <group ref={groupRef} position={[wx, wy, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[basePositions.slice(), 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          vertexColors
          transparent
          opacity={opacity * 0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
