import { create } from 'zustand'
import type { ExpandedPanelState } from '@/data/types'
import { mapProgressToAASmooth, mapProgressToEcosystemAA } from '@/lib/aaTimeline'
import { mapPrologueProgressToAD } from '@/lib/prologueTimeline'
import { getHumanGuiOpacity, getMachineBlend } from '@/constants/scroll'
import { mapProgressToGlitch, getPhaseFromProgress, mapProgressToDepth } from '@/content/narrative'
import { getActiveSpecimenId } from '@/content/specimens'

export type MuseumZone = 'prologue' | 'ecosystem'

export interface MouseState {
  x: number
  y: number
  screenX: number
  screenY: number
}

export type EventPanelSide = 'left' | 'right'

interface NarrativeStore {
  museumZone: MuseumZone
  prologueProgress: number
  adYear: number
  adYearSmooth: number
  scrollProgress: number
  aaYear: number
  aaYearSmooth: number
  depth: number
  phase: ReturnType<typeof getPhaseFromProgress>
  glitchIntensity: number
  machineModeBlend: number
  humanGuiOpacity: number
  activeSpecimenId: string | null
  hoveredSpecimenId: string | null
  selectedSpecimenId: string | null
  selectedEventId: string | null
  /** Which margin the selected scroll beat sits on — drives bottom panel placement */
  selectedEventSide: EventPanelSide | null
  expandedPanel: ExpandedPanelState | null
  /** 0→1 scroll blend through title gate (prologue → ecosystem) */
  handoffProgress: number
  mouse: MouseState
  soundEnabled: boolean
  reducedMotion: boolean
  ghostSignalReacted: boolean
  setPrologueProgress: (progress: number) => void
  setScrollProgress: (progress: number) => void
  /** Autoplay-only — timeline fields without clearing selections */
  syncPrologueAutoplay: (progress: number) => void
  syncEcosystemAutoplay: (progress: number) => void
  setHoveredSpecimenId: (id: string | null) => void
  setSelectedSpecimenId: (id: string | null) => void
  setSelectedEventId: (id: string | null, side?: EventPanelSide) => void
  setExpandedPanel: (panel: ExpandedPanelState | null) => void
  setHandoffProgress: (progress: number) => void
  setMouse: (mouse: MouseState) => void
  setSoundEnabled: (enabled: boolean) => void
  setReducedMotion: (reduced: boolean) => void
  triggerGhostSignalReaction: () => void
}

const defaultMouse: MouseState = { x: 0, y: 0, screenX: 0, screenY: 0 }

export const useNarrativeStore = create<NarrativeStore>((set) => ({
  museumZone: 'prologue',
  prologueProgress: 0,
  adYear: 1936,
  adYearSmooth: 1936,
  scrollProgress: 0,
  aaYear: 0,
  aaYearSmooth: 0,
  depth: 0,
  phase: 'surface',
  glitchIntensity: 0,
  machineModeBlend: 0,
  humanGuiOpacity: 1,
  activeSpecimenId: null,
  hoveredSpecimenId: null,
  selectedSpecimenId: null,
  selectedEventId: null,
  selectedEventSide: null,
  expandedPanel: null,
  handoffProgress: 0,
  mouse: defaultMouse,
  soundEnabled: false,
  reducedMotion: false,
  ghostSignalReacted: false,
  setPrologueProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress))
    const adYearSmooth = mapPrologueProgressToAD(clamped)
    set({
      museumZone: 'prologue',
      prologueProgress: clamped,
      adYearSmooth,
      adYear: Math.round(adYearSmooth),
      humanGuiOpacity: 1,
      glitchIntensity: 0,
      machineModeBlend: 0,
      selectedSpecimenId: null,
      selectedEventId: null,
      selectedEventSide: null,
      handoffProgress: 0,
    })
  },
  setScrollProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress))
    const aaYearSmooth = mapProgressToAASmooth(clamped)
    const aaYear = Math.round(aaYearSmooth)
    const ecosystemAA = mapProgressToEcosystemAA(clamped)
    set((state) => ({
      museumZone: 'ecosystem',
      scrollProgress: clamped,
      aaYear,
      aaYearSmooth,
      depth: mapProgressToDepth(clamped),
      phase: getPhaseFromProgress(clamped),
      glitchIntensity: mapProgressToGlitch(clamped),
      humanGuiOpacity: getHumanGuiOpacity(clamped),
      machineModeBlend: getMachineBlend(clamped),
      activeSpecimenId: getActiveSpecimenId(ecosystemAA),
      ...(state.museumZone === 'prologue' ? { expandedPanel: null } : {}),
      ...(clamped > 0.02 ? { handoffProgress: 1 } : {}),
    }))
  },
  syncPrologueAutoplay: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress))
    const adYearSmooth = mapPrologueProgressToAD(clamped)
    set({
      prologueProgress: clamped,
      adYearSmooth,
      adYear: Math.round(adYearSmooth),
    })
  },
  syncEcosystemAutoplay: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress))
    const aaYearSmooth = mapProgressToAASmooth(clamped)
    const aaYear = Math.round(aaYearSmooth)
    const ecosystemAA = mapProgressToEcosystemAA(clamped)
    set((state) => ({
      museumZone: 'ecosystem',
      scrollProgress: clamped,
      aaYear,
      aaYearSmooth,
      depth: mapProgressToDepth(clamped),
      phase: getPhaseFromProgress(clamped),
      glitchIntensity: mapProgressToGlitch(clamped),
      humanGuiOpacity: getHumanGuiOpacity(clamped),
      machineModeBlend: getMachineBlend(clamped),
      activeSpecimenId: getActiveSpecimenId(ecosystemAA),
      handoffProgress: clamped > 0.02 ? 1 : state.handoffProgress,
    }))
  },
  setHoveredSpecimenId: (id) => set({ hoveredSpecimenId: id }),
  setSelectedSpecimenId: (id) =>
    set((state) => ({
      selectedSpecimenId: id,
      selectedEventId: id ? null : state.selectedEventId,
      expandedPanel: id ? null : state.expandedPanel,
    })),
  setSelectedEventId: (id, side) =>
    set((state) => ({
      selectedEventId: id,
      selectedEventSide: id ? (side ?? state.selectedEventSide) : null,
      selectedSpecimenId: id ? null : state.selectedSpecimenId,
      expandedPanel: id ? null : state.expandedPanel,
    })),
  setExpandedPanel: (panel) =>
    set({
      expandedPanel: panel,
      ...(panel?.kind === 'specimen' ? { selectedEventId: null } : {}),
      ...(panel?.kind === 'event' ? { selectedSpecimenId: null } : {}),
    }),
  setHandoffProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress))
    set({ handoffProgress: clamped })
  },
  setMouse: (mouse) => set({ mouse }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  triggerGhostSignalReaction: () =>
    set((state) => (state.ghostSignalReacted ? state : { ghostSignalReacted: true })),
}))
