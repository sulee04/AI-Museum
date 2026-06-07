import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MuseumExhibitShell } from '@/components/museum/MuseumExhibitShell'
import { ExhibitContentPanel } from '@/components/museum/ExhibitContentPanel'
import { NARRATIVE_LANDMARKS } from '@/content/landmarks.data'
import { getActiveLandmark } from '@/lib/landmarkVisibility'
import { useNarrativeStore } from '@/stores/narrativeStore'

/** Ecosystem curator notes — same shell as prologue, dramatic theme */
export function NarrativeLandmarks() {
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)

  const active = useMemo(
    () => getActiveLandmark(NARRATIVE_LANDMARKS, aaYearSmooth),
    [aaYearSmooth],
  )

  if (museumZone !== 'ecosystem' || !active || humanGuiOpacity <= 0.01) {
    return null
  }

  const { landmark, opacity, driftY } = active
  const combinedOpacity = opacity * humanGuiOpacity

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={landmark.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: combinedOpacity, y: driftY }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.62, ease: [0.25, 1, 0.5, 1] }}
          className="w-full"
        >
          <MuseumExhibitShell theme="ecosystem" chronology={<div aria-hidden />}>
            <ExhibitContentPanel
              theme="ecosystem"
              sectionLabel="Curator's Note"
              title={`AA ${landmark.aa}`}
              summary={landmark.text}
              footer={
                <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--color-text-ghost)]">
                  AA {landmark.aa}
                </p>
              }
            />
          </MuseumExhibitShell>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
