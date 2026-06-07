import type { TimelineEvent } from '@/data/types'

const IMPACT_LABEL: Record<
  NonNullable<TimelineEvent['ecosystemImpact']>['effect'],
  string
> = {
  survival: '생존 우위',
  extinction: '대량 멸종',
  mutation: '강제 변이',
  competition: '경쟁 도태',
}

/** Medium-depth copy for bottom panel — deeper than scroll summary, shorter than drawer */
export function getEventPanelBody(event: TimelineEvent): string {
  if (event.detail) return event.detail
  const first = event.expandedDetail?.sections[0]?.body
  if (first) return first
  return event.ecosystemImpact?.description ?? event.summary
}

export function getEventImpactLine(event: TimelineEvent): string | null {
  const impact = event.ecosystemImpact
  if (!impact) return null
  const label = IMPACT_LABEL[impact.effect]
  const cats = impact.affectedCategories?.join(' · ')
  return cats ? `${label} — ${cats}` : `${label} — ${impact.description}`
}
