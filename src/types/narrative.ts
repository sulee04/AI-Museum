export type NarrativePhase =
  | 'surface'
  | 'descent'
  | 'extinction'
  | 'evolution'
  | 'terminal'

export interface NarrativeSection {
  id: NarrativePhase
  act: number
  label: string
  title: string
  subtitle?: string
  body: string
  depthStart: number
  depthEnd: number
  scrollStart: number
  scrollEnd: number
  glitchIntensity: number
}

export interface NarrativeState {
  scrollProgress: number
  depth: number
  phase: NarrativePhase
  glitchIntensity: number
  soundEnabled: boolean
  reducedMotion: boolean
  machineModeBlend: number
}
