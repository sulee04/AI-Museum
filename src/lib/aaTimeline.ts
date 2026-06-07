import {
  ECOSYSTEM_AA_MAX,
  MACHINE_AA_SPAN,
  ECOSYSTEM_ZONE_END,
  TERMINAL_ZONE_START,
  AA_EPOCH,
  SCROLL_HEIGHT_VH,
} from '@/constants/timeline'

export { AA_EPOCH, ECOSYSTEM_AA_MAX, MACHINE_AA_SPAN }

export function mapProgressToAASmooth(progress: number): number {
  const t = Math.max(0, Math.min(1, progress))
  if (t <= ECOSYSTEM_ZONE_END) {
    return (t / ECOSYSTEM_ZONE_END) * ECOSYSTEM_AA_MAX
  }
  const local = (t - TERMINAL_ZONE_START) / (1 - TERMINAL_ZONE_START)
  return ECOSYSTEM_AA_MAX + local * MACHINE_AA_SPAN
}

export function mapProgressToAA(progress: number): number {
  return Math.round(mapProgressToAASmooth(progress))
}

export function mapProgressToEcosystemAA(progress: number): number {
  return Math.min(ECOSYSTEM_AA_MAX, mapProgressToAASmooth(progress))
}

export function mapAAToProgress(aa: number): number {
  if (aa <= ECOSYSTEM_AA_MAX) {
    return (aa / ECOSYSTEM_AA_MAX) * ECOSYSTEM_ZONE_END
  }
  const local = (aa - ECOSYSTEM_AA_MAX) / MACHINE_AA_SPAN
  return TERMINAL_ZONE_START + local * (1 - TERMINAL_ZONE_START)
}

export function mapAAToScrollVh(aa: number): number {
  return mapAAToProgress(aa) * SCROLL_HEIGHT_VH
}

export function formatAA(year: number): string {
  return `AA ${year}`
}

export function aaToAD(aaYear: number): number {
  return AA_EPOCH.anchorAD + aaYear
}

export function formatAADate(aaYear: number): string {
  return `AD ${aaToAD(aaYear)}`
}
