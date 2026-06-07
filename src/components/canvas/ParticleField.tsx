import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SPECIMENS, getSpecimenVisualState } from '@/content/specimens'
import { getVisibleAliveSpecimens } from '@/lib/ecosystemStats'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { clamp } from '@/lib/utils'

const AMBIENT_COUNT = 1200
const MAX_SURVIVOR_PARTICLES = 520
const HIDDEN_Y = 999

interface ParticleFieldProps {
  intensity?: number
  /** Restrict motes to bottom-right lane (LD1-style) */
  laneMode?: boolean
}

const AMBIENT_COUNT_LANE = 320

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function wrapY(y: number, span = 20): number {
  return ((((y + span / 2) % span) + span) % span) - span / 2
}

/** More particles for longer-lived survivors; fades with emergence / extinction */
function survivorParticleCount(lifespan: number, visibility: number): number {
  const base = 3 + Math.sqrt(lifespan) * 1.6
  return Math.max(2, Math.min(22, Math.round(base * visibility)))
}

function buildAmbientField(positions: Float32Array, colors: Float32Array, laneMode: boolean) {
  const count = laneMode ? AMBIENT_COUNT_LANE : AMBIENT_COUNT
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    if (laneMode) {
      positions[i3] = 1 + Math.random() * 9
      positions[i3 + 1] = -4 - Math.random() * 7
      positions[i3 + 2] = (Math.random() - 0.5) * 8
    } else {
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 14
    }

    const deep = new THREE.Color('#0a2847')
    const cyan = new THREE.Color('#00c4ad')
    const mixed = deep.lerp(cyan, 0.22 + Math.random() * 0.28)
    colors[i3] = mixed.r
    colors[i3 + 1] = mixed.g
    colors[i3 + 2] = mixed.b
  }
}

function applySurvivorClusters(
  aa: number,
  positions: Float32Array,
  colors: Float32Array,
  basePositions: Float32Array,
): number {
  for (let i = 0; i < MAX_SURVIVOR_PARTICLES; i++) {
    const i3 = i * 3
    basePositions[i3] = HIDDEN_Y
    basePositions[i3 + 1] = HIDDEN_Y
    basePositions[i3 + 2] = HIDDEN_Y
    colors[i3] = 0
    colors[i3 + 1] = 0
    colors[i3 + 2] = 0
  }

  const alive = getVisibleAliveSpecimens(SPECIMENS, aa)
  let slot = 0

  alive.forEach((specimen, specimenIndex) => {
    const state = getSpecimenVisualState(aa, specimen)
    if (!state || state.opacity < 0.12) return

    const lifespan = specimen.extinctAA - specimen.bornAA
    const spread = 1.4 + Math.min(lifespan / 12, 4.5)
    const count = survivorParticleCount(lifespan, state.opacity)
    const color = new THREE.Color(specimen.clusterColor)
    const nx = specimen.layout.x / 100 - 0.5
    const ny = -(specimen.layout.pinY / 100 - 0.5) * 0.55 - 0.85
    const brightness = 0.75 + Math.min(lifespan / 40, 0.25)

    for (let p = 0; p < count && slot < MAX_SURVIVOR_PARTICLES; p++, slot++) {
      const seed = specimenIndex * 113 + p * 17
      const i3 = slot * 3
      basePositions[i3] = nx * 14 + (seededRandom(seed) - 0.5) * spread
      basePositions[i3 + 1] = ny * 8 + (seededRandom(seed + 1) - 0.5) * (spread * 0.7)
      basePositions[i3 + 2] = (seededRandom(seed + 2) - 0.5) * 7
      colors[i3] = color.r * brightness
      colors[i3 + 1] = color.g * brightness
      colors[i3 + 2] = color.b * brightness
    }
  })

  positions.set(basePositions)
  return alive.length
}

/**
 * Deep-sea motes — ambient field + survivor AI clusters (count · color · lifespan).
 */
export function ParticleField({ intensity = 1, laneMode = false }: ParticleFieldProps) {
  const ambientRef = useRef<THREE.Points>(null)
  const survivorRef = useRef<THREE.Points>(null)
  const aliveCountRef = useRef(0)

  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const prologueProgress = useNarrativeStore((s) => s.prologueProgress)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const depth = useNarrativeStore((s) => s.depth)

  const activity =
    museumZone === 'ecosystem'
      ? Math.max(0.4, scrollProgress)
      : Math.max(0.35, prologueProgress, handoffProgress)

  const ambientCount = laneMode ? AMBIENT_COUNT_LANE : AMBIENT_COUNT

  const ambient = useMemo(() => {
    const positions = new Float32Array(ambientCount * 3)
    const colors = new Float32Array(ambientCount * 3)
    const basePositions = new Float32Array(ambientCount * 3)
    buildAmbientField(basePositions, colors, laneMode)
    positions.set(basePositions)
    return { positions, colors, basePositions, count: ambientCount }
  }, [laneMode, ambientCount])

  const survivor = useMemo(() => {
    const positions = new Float32Array(MAX_SURVIVOR_PARTICLES * 3)
    const colors = new Float32Array(MAX_SURVIVOR_PARTICLES * 3)
    const basePositions = new Float32Array(MAX_SURVIVOR_PARTICLES * 3)
    return { positions, colors, basePositions }
  }, [])

  useLayoutEffect(() => {
    if (museumZone !== 'ecosystem') {
      aliveCountRef.current = 0
      for (let i = 0; i < MAX_SURVIVOR_PARTICLES; i++) {
        const i3 = i * 3
        survivor.basePositions[i3] = HIDDEN_Y
        survivor.basePositions[i3 + 1] = HIDDEN_Y
        survivor.basePositions[i3 + 2] = HIDDEN_Y
      }
      survivor.positions.set(survivor.basePositions)
      syncGeometry(survivorRef.current, survivor.positions, survivor.colors)
      return
    }

    aliveCountRef.current = applySurvivorClusters(
      aaYearSmooth,
      survivor.positions,
      survivor.colors,
      survivor.basePositions,
    )
    syncGeometry(survivorRef.current, survivor.positions, survivor.colors)
  }, [aaYearSmooth, museumZone, survivor])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const density = 0.45 + activity * 0.9
    const drift = depth / 6000
    const aliveBoost = clamp(aliveCountRef.current / 45, 0, 1)
    const ambientDim = 1 - aliveBoost * 0.35

    animateLayer(ambientRef.current, ambient.basePositions, ambient.count, {
      t,
      density,
      drift,
      wobble: 0.022,
      sink: 0.012,
      specimenLayer: false,
    })

    animateLayer(survivorRef.current, survivor.basePositions, MAX_SURVIVOR_PARTICLES, {
      t,
      density: density * (0.85 + aliveBoost * 0.3),
      drift,
      wobble: 0.028,
      sink: 0.006,
      specimenLayer: true,
    })

    const ambientMat = ambientRef.current?.material as THREE.PointsMaterial | undefined
    if (ambientMat) {
      ambientMat.size = 0.028 + activity * 0.014
      ambientMat.opacity = (0.42 + activity * 0.22) * intensity * ambientDim
    }

    const survivorMat = survivorRef.current?.material as THREE.PointsMaterial | undefined
    if (survivorMat) {
      survivorMat.size = 0.055 + aliveBoost * 0.035 + activity * 0.012
      survivorMat.opacity = (0.55 + aliveBoost * 0.35) * intensity
    }

    if (ambientRef.current) ambientRef.current.rotation.y = t * 0.018 * density
    if (survivorRef.current) survivorRef.current.rotation.y = t * 0.012 * density
  })

  return (
    <>
      <points ref={ambientRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ambient.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[ambient.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.034}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.5 * intensity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={survivorRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[survivor.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[survivor.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.72 * intensity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

function syncGeometry(
  points: THREE.Points | null,
  positions: Float32Array,
  colors: Float32Array,
) {
  if (!points) return
  const geometry = points.geometry
  const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
  const colAttr = geometry.getAttribute('color') as THREE.BufferAttribute
  posAttr.array.set(positions)
  colAttr.array.set(colors)
  posAttr.needsUpdate = true
  colAttr.needsUpdate = true
}

function animateLayer(
  points: THREE.Points | null,
  basePositions: Float32Array,
  count: number,
  opts: {
    t: number
    density: number
    drift: number
    wobble: number
    sink: number
    specimenLayer: boolean
  },
) {
  if (!points) return
  const pos = points.geometry.attributes.position.array as Float32Array

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const bx = basePositions[i3]!
    if (bx > HIDDEN_Y - 1) {
      pos[i3] = HIDDEN_Y
      pos[i3 + 1] = HIDDEN_Y
      pos[i3 + 2] = HIDDEN_Y
      continue
    }

    const wobbleScale = opts.specimenLayer ? 1.15 : 1
    pos[i3] = bx + Math.sin(opts.t * 0.3 + i) * opts.wobble * opts.density * wobbleScale
    pos[i3 + 1] = wrapY(
      basePositions[i3 + 1]! -
        opts.t * opts.sink * opts.density +
        Math.cos(opts.t * 0.2 + i * 0.5) * opts.wobble * wobbleScale,
      opts.specimenLayer ? 18 : 20,
    )
    pos[i3 + 2] =
      basePositions[i3 + 2]! +
      Math.sin(opts.t * 0.14 + i) * opts.wobble * wobbleScale -
      opts.drift * (opts.specimenLayer ? 0.4 : 1.2)
  }

  points.geometry.attributes.position.needsUpdate = true
}
