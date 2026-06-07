export type SpecimenIconType =
  | 'spark'
  | 'skull'
  | 'heart'
  | 'scale'
  | 'code'
  | 'meme'
  | 'eye'
  | 'brain'
  | 'bot'
  | 'ghost'
  | 'chain'
  | 'fire'
  | 'droplet'
  | 'star'
  | 'warning'
  | 'smile'
  | 'lock'
  | 'wave'

export type SpecimenCategory =
  | 'LLM'
  | 'Agent'
  | 'Companion'
  | 'Vibe Coding'
  | 'Gaming'
  | 'Image'
  | 'Voice'
  | 'Search'
  | 'Hardware'

export interface SpecimenData {
  id: string
  name: string
  icon: SpecimenIconType
  category: SpecimenCategory
  bornAA: number
  extinctAA: number
  specimenType: string
  description: string
  extinctionCause: string
  chatLog: string[]
  clusterColor: string
}

export { SPECIMEN_CATEGORY_COLORS } from '@/content/specimens.colors'
export { SPECIMEN_DATA } from '@/content/specimens.generator'
