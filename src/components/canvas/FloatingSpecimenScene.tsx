import { useMemo } from 'react'
import { SPECIMENS, getSpecimenVisualState } from '@/content/specimens'
import { SpecimenMicroCluster } from '@/components/canvas/SpecimenMicroCluster'
import { useNarrativeStore } from '@/stores/narrativeStore'

export function FloatingSpecimenScene() {
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const active = useMemo(
    () =>
      SPECIMENS.map((specimen) => ({
        specimen,
        state: getSpecimenVisualState(aaYearSmooth, specimen),
      })).filter((e) => e.state && e.state.opacity > 0.03),
    [aaYearSmooth],
  )

  return (
    <group>
      {active.map(({ specimen, state }) => (
        <SpecimenMicroCluster
          key={specimen.id}
          specimen={specimen}
          opacity={state!.opacity}
          glitch={state!.glitch}
          positionX={state!.x}
          positionY={state!.y}
          sinking={state!.phase === 'sinking'}
        />
      ))}
    </group>
  )
}
