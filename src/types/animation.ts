export interface TimelineConfig {
  scrub: number | boolean
  pin: boolean
  anticipatePin: number
}

export interface AnimationRefs {
  container: HTMLElement | null
  sections: Record<string, HTMLElement | null>
}
