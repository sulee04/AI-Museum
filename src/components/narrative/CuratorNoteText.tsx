import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NARRATIVE_LANDMARKS } from '@/content/landmarks.data'
import { getActiveLandmark } from '@/lib/landmarkVisibility'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Ambient narrative text — hidden when drawer/specimen panel is active */
export function CuratorNoteText() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const selectedSpecimenId = useNarrativeStore((s) => s.selectedSpecimenId)
  const selectedEventId = useNarrativeStore((s) => s.selectedEventId)

  const activeLandmark = useMemo(
    () => getActiveLandmark(NARRATIVE_LANDMARKS, aaYearSmooth),
    [aaYearSmooth],
  )

  if (
    museumZone !== 'ecosystem' ||
    !activeLandmark ||
    humanGuiOpacity <= 0.01 ||
    expandedPanel ||
    selectedSpecimenId ||
    selectedEventId
  ) {
    return null
  }

  const { landmark, opacity, driftY } = activeLandmark
  const combinedOpacity = opacity * humanGuiOpacity

  return (
    <div className="layer-narrative flex items-end justify-center px-[var(--space-gutter)] pb-[42vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={landmark.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: combinedOpacity, y: driftY }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="curator-note-text max-w-md text-center md:max-w-lg"
        >
          <p className="text-body-lg leading-relaxed text-[var(--color-text)] md:text-xl">
            {landmark.text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
