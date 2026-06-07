import type { SpecimenEntry } from '@/content/specimens'
import { getSpecimenVisualState } from '@/content/specimens'
import type { SpecimenCategory } from '@/content/specimens.data'

export interface CategoryStat {
  category: SpecimenCategory
  count: number
  avgLifespan: number
}

export interface EcosystemStats {
  hasSignal: boolean
  aliveCount: number
  globalAvgLifespan: number | null
  categories: CategoryStat[]
}

const MIN_VISIBLE_OPACITY = 0.2

function potentialLifespan(specimen: SpecimenEntry): number {
  return specimen.extinctAA - specimen.bornAA
}

/** Specimens visibly present in the viewport band (not pre-born / fully faded) */
export function getVisibleAliveSpecimens(
  specimens: SpecimenEntry[],
  aa: number,
): SpecimenEntry[] {
  return specimens.filter((specimen) => {
    const state = getSpecimenVisualState(aa, specimen)
    if (!state) return false
    return state.alive && state.opacity >= MIN_VISIBLE_OPACITY
  })
}

/** @deprecated — use getVisibleAliveSpecimens for HUD */
export function getAliveSpecimens(specimens: SpecimenEntry[], aa: number): SpecimenEntry[] {
  return getVisibleAliveSpecimens(specimens, aa)
}

export function computeEcosystemStats(
  specimens: SpecimenEntry[],
  aa: number,
  scrollProgress = 0,
): EcosystemStats {
  if (scrollProgress <= 0.001 || aa < 0.05) {
    return { hasSignal: false, aliveCount: 0, globalAvgLifespan: null, categories: [] }
  }

  const alive = getVisibleAliveSpecimens(specimens, aa)

  if (alive.length === 0) {
    return { hasSignal: false, aliveCount: 0, globalAvgLifespan: null, categories: [] }
  }

  const lifespans = alive.map(potentialLifespan)
  const globalAvgLifespan = lifespans.reduce((a, b) => a + b, 0) / alive.length

  const byCategory = new Map<SpecimenCategory, { total: number; count: number }>()
  for (const s of alive) {
    const span = potentialLifespan(s)
    const bucket = byCategory.get(s.category) ?? { total: 0, count: 0 }
    bucket.total += span
    bucket.count += 1
    byCategory.set(s.category, bucket)
  }

  const categories: CategoryStat[] = [...byCategory.entries()]
    .map(([category, { total, count }]) => ({
      category,
      count,
      avgLifespan: total / count,
    }))
    .sort((a, b) => b.count - a.count)

  return {
    hasSignal: true,
    aliveCount: alive.length,
    globalAvgLifespan,
    categories,
  }
}
