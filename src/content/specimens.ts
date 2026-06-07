import { SPECIMEN_DATA, type SpecimenData } from '@/content/specimens.data'
import { clamp, lerp } from '@/lib/utils'

export type { SpecimenData, SpecimenIconType, SpecimenCategory } from '@/content/specimens.data'

/** Bottom ecosystem lane band (percent within lane container) */
export const PIN_Y_MIN = 22
export const PIN_Y_MAX = 68

export interface SpecimenLayout {
  /** Horizontal position 5–92% */
  x: number
  /** Sticky anchor in bottom lane band */
  pinY: number
}

export interface SpecimenEntry extends SpecimenData {
  layout: SpecimenLayout
  mutationSeed: number
}

const RISE_YEARS = 1.2
const SINK_YEARS = 1.8
const MIN_X_DIST = 10
const MIN_Y_DIST = 4

function seededRandom(seed: string, salt: number): number {
  let hash = salt
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)!
    hash |= 0
  }
  const x = Math.sin(hash) * 10000
  return x - Math.floor(x)
}

function intervalsOverlap(a0: number, a1: number, b0: number, b1: number): boolean {
  return a0 <= b1 && b0 <= a1
}

function assignLayout(
  specimen: SpecimenData,
  occupied: Array<SpecimenLayout & { born: number; extinct: number }>,
): SpecimenLayout {
  for (let attempt = 0; attempt < 80; attempt++) {
    const x = 5 + seededRandom(specimen.id, attempt) * 87
    const pinY = PIN_Y_MIN + seededRandom(specimen.id, attempt + 50) * (PIN_Y_MAX - PIN_Y_MIN)
    const collision = occupied.some(
      (slot) =>
        intervalsOverlap(specimen.bornAA, specimen.extinctAA, slot.born, slot.extinct) &&
        Math.abs(x - slot.x) < MIN_X_DIST &&
        Math.abs(pinY - slot.pinY) < MIN_Y_DIST,
    )
    if (!collision) return { x, pinY }
  }
  return {
    x: 5 + seededRandom(specimen.id, 99) * 87,
    pinY: PIN_Y_MIN + seededRandom(specimen.id, 100) * (PIN_Y_MAX - PIN_Y_MIN),
  }
}

function buildSpecimens(): SpecimenEntry[] {
  const occupiedSlots: Array<SpecimenLayout & { born: number; extinct: number }> = []
  return SPECIMEN_DATA.map((entry) => {
    const layout = assignLayout(entry, occupiedSlots)
    occupiedSlots.push({ ...layout, born: entry.bornAA, extinct: entry.extinctAA })
    return {
      ...entry,
      layout,
      mutationSeed: seededRandom(entry.id, 7),
    }
  })
}

export const SPECIMENS: SpecimenEntry[] = buildSpecimens()

export type SpecimenPhase = 'hidden' | 'rising' | 'pinned' | 'sinking' | 'gone'

export interface SpecimenVisualState {
  phase: SpecimenPhase
  x: number
  y: number
  opacity: number
  glitch: number
  pixelate: number
  scale: number
  rotation: number
  alive: boolean
  /** 0–1 sink acceleration curve */
  sinkT: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInCubic(t: number) {
  return t * t * t
}

export function getSpecimenVisualState(aa: number, specimen: SpecimenEntry): SpecimenVisualState | null {
  const { bornAA, extinctAA, layout } = specimen
  const { x, pinY } = layout
  const sinkEnd = extinctAA + SINK_YEARS

  if (aa < bornAA || aa > sinkEnd) return null

  const riseEnd = bornAA + RISE_YEARS

  // ── Born: ascend from abyss below viewport into top band ──
  if (aa < riseEnd) {
    const t = easeOutCubic(clamp((aa - bornAA) / RISE_YEARS, 0, 1))
    return {
      phase: 'rising',
      x,
      y: lerp(118, pinY, t),
      opacity: clamp(t * 1.1, 0, 1),
      glitch: 0,
      pixelate: 0,
      scale: lerp(0.7, 1, t),
      rotation: lerp(4, 0, t),
      alive: true,
      sinkT: 0,
    }
  }

  // ── Alive: sticky at top band, gentle drift while time scrolls ──
  if (aa <= extinctAA) {
    const bob = Math.sin(aa * 1.1 + specimen.mutationSeed * 12) * 0.8
    const drift = Math.sin(aa * 0.4 + specimen.mutationSeed * 5) * 0.4
    return {
      phase: 'pinned',
      x: x + drift,
      y: pinY + bob,
      opacity: 1,
      glitch: 0,
      pixelate: 0,
      scale: 1,
      rotation: 0,
      alive: true,
      sinkT: 0,
    }
  }

  // ── Extinct: unpin → whale-carcass sink with glitch / pixelate ──
  const rawT = clamp((aa - extinctAA) / SINK_YEARS, 0, 1)
  const sinkT = easeInCubic(rawT)
  const jitterX = (seededRandom(specimen.id, Math.floor(aa * 17)) - 0.5) * sinkT * 6

  return {
    phase: 'sinking',
    x: x + jitterX,
    y: lerp(pinY, 125, sinkT),
    opacity: clamp(1 - rawT * 0.85, 0, 1),
    glitch: clamp(rawT * 1.4, 0, 1),
    pixelate: clamp((rawT - 0.15) * 1.8, 0, 1),
    scale: lerp(1, 0.55, sinkT),
    rotation: (seededRandom(specimen.id, 3) - 0.5) * sinkT * 18,
    alive: false,
    sinkT,
  }
}

export function getActiveSpecimenId(aa: number): string | null {
  for (const specimen of SPECIMENS) {
    const state = getSpecimenVisualState(aa, specimen)
    if (state?.alive && state.opacity > 0.2) return specimen.id
  }
  return null
}

export function getSpecimenById(id: string): SpecimenEntry | undefined {
  return SPECIMENS.find((specimen) => specimen.id === id)
}

export function layoutToWorld(x: number, y: number): [number, number, number] {
  const wx = (x / 100 - 0.5) * 11
  const wy = -(y / 100 - 0.5) * 6.5
  return [wx, wy, 0]
}

export function getSpecimenPinMeta(specimen: SpecimenEntry) {
  return {
    bornVh: specimen.bornAA * 10,
    lifespanVh: (specimen.extinctAA - specimen.bornAA) * 10,
    sinkVh: SINK_YEARS * 10,
  }
}
