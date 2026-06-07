/** Who drove the narrative beat — for future graph / viz coloring */
export type EventSubject = 'human_event' | 'ai_evolution'

/** Lineage outcome — for specimen-style interactive overlays */
export type EntityStatus = 'survived' | 'extinct' | 'mutated'

/** Hint for downstream D3 / WebGL node layouts */
export type VisualizationKind =
  | 'origin'
  | 'branch'
  | 'fork'
  | 'merge'
  | 'extinction'
  | 'symbiosis'
  | 'monopoly'

/** Which fixed overlay section owns this era */
export type TimelineSectionId = 'origins' | 'future-evolution'

/** In-flow prologue section ids */
export type IntroSectionId = 'turing-machine' | 'progression' | 'neural-origin'

/** Expanded detail view shown in the right drawer */
export type EventExpandedViewType = 'map' | 'timeline' | 'document'

export interface EventMapRegion {
  id: string
  label: string
  /** 0–100 percent on dummy map */
  x: number
  y: number
  intensity: number
}

export interface EventExpandedDetail {
  viewType: EventExpandedViewType
  headline: string
  sections: { title: string; body: string }[]
  mapRegions?: EventMapRegion[]
}

export interface EcosystemImpact {
  effect: 'survival' | 'extinction' | 'mutation' | 'competition'
  description: string
  affectedCategories?: string[]
}

export interface TimelineEvent {
  id: string
  /** Museum scroll anchor (AA year) — ecosystem timeline only */
  aa?: number
  /** Real-world calendar year (prologue & historical exhibits) */
  calendarYear?: number
  subject: EventSubject
  status: EntityStatus
  title: string
  summary: string
  detail?: string
  tags?: string[]
  visualization?: VisualizationKind
  /** AA years visible before anchor (scroll-synced fade) */
  dwellBefore?: number
  /** AA years visible after anchor */
  dwellAfter?: number
  /** Major human–AI narrative beat — center scroll + bottom panel priority */
  isMajor?: boolean
  /** How this event reshapes the AI ecosystem */
  ecosystemImpact?: EcosystemImpact
  /** Bottom exhibit panel — optional photo / placeholder */
  exhibitImage?: {
    alt: string
    src?: string
    placeholderLabel?: string
  }
  /** Right drawer expanded content */
  expandedDetail?: EventExpandedDetail
}

export interface MuseumEra {
  id: string
  sectionId: TimelineSectionId
  label: string
  title: string
  subtitle?: string
  curatorNote?: string
  aaStart: number
  aaEnd: number
  events: TimelineEvent[]
}

export interface MuseumTimeline {
  version: string
  eras: MuseumEra[]
}

export type ExpandedPanelKind = 'event' | 'specimen'

export interface ExpandedPanelState {
  kind: ExpandedPanelKind
  id: string
}

/** Vertical-scroll prologue chapter — data only, no UI copy */
export interface IntroSection {
  id: IntroSectionId
  label: string
  title: string
  subtitle?: string
  preamble?: string
  events: TimelineEvent[]
}
