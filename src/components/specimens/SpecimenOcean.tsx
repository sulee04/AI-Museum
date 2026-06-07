import { useCallback, useMemo, useRef, useState } from 'react'
import { SPECIMENS, getSpecimenVisualState, type SpecimenEntry } from '@/content/specimens'
import { SpecimenFloat } from '@/components/specimens/SpecimenFloat'
import { SpecimenTooltip } from '@/components/specimens/SpecimenTooltip'
import { useNarrativeStore } from '@/stores/narrativeStore'
import { useViewportSize } from '@/hooks/useViewportSize'

/**
 * Bottom ecosystem lane — hover tooltip, click opens right drawer.
 */
export function SpecimenOcean() {
  const laneRef = useRef<HTMLDivElement>(null)
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const handoffProgress = useNarrativeStore((s) => s.handoffProgress)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const mouse = useNarrativeStore((s) => s.mouse)
  const setHovered = useNarrativeStore((s) => s.setHoveredSpecimenId)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)
  const { width, height } = useViewportSize()

  const [tooltipSpecimen, setTooltipSpecimen] = useState<SpecimenEntry | null>(null)

  const visible = useMemo(
    () =>
      SPECIMENS.map((specimen) => ({
        specimen,
        state: getSpecimenVisualState(aaYearSmooth, specimen),
      })).filter((entry) => entry.state !== null),
    [aaYearSmooth],
  )

  const onEnter = useCallback(
    (specimen: SpecimenEntry) => () => {
      setHovered(specimen.id)
      setTooltipSpecimen(specimen)
    },
    [setHovered],
  )

  const onLeave = useCallback(() => {
    setHovered(null)
    setTooltipSpecimen(null)
  }, [setHovered])

  const onSelect = useCallback(
    (specimen: SpecimenEntry) => () => {
      const isOpen =
        expandedPanel?.kind === 'specimen' && expandedPanel.id === specimen.id
      setExpandedPanel(isOpen ? null : { kind: 'specimen', id: specimen.id })
    },
    [expandedPanel, setExpandedPanel],
  )

  const inEcosystem = museumZone === 'ecosystem'
  const inHandoff = handoffProgress > 0.45
  if ((!inEcosystem && !inHandoff) || humanGuiOpacity < 0.05) {
    return null
  }

  const layerOpacity = inEcosystem ? humanGuiOpacity : handoffProgress * 0.65

  const drawerSpecimenId =
    expandedPanel?.kind === 'specimen' ? expandedPanel.id : null

  const showTooltip =
    tooltipSpecimen != null && tooltipSpecimen.id !== drawerSpecimenId

  return (
    <>
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="specimen-pixelate">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite width="8" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
          </filter>
        </defs>
      </svg>

      <div
        ref={laneRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: layerOpacity }}
      >
        {visible.map(({ specimen, state }) => {
          if (!state) return null
          const isHovered = tooltipSpecimen?.id === specimen.id
          const isSelected = drawerSpecimenId === specimen.id
          const rect = laneRef.current?.getBoundingClientRect()
          const screenX = rect
            ? rect.left + (state.x / 100) * rect.width
            : (state.x / 100) * width
          const screenY = rect
            ? rect.top + (state.y / 100) * rect.height
            : (state.y / 100) * height
          const cursorDist = Math.hypot(mouse.screenX - screenX, mouse.screenY - screenY)
          const nearCursor = cursorDist < 88 && state.alive

          return (
            <SpecimenFloat
              key={specimen.id}
              specimen={specimen}
              state={state}
              isHovered={isHovered}
              isSelected={isSelected}
              nearCursor={nearCursor}
              onEnter={onEnter(specimen)}
              onLeave={onLeave}
              onSelect={onSelect(specimen)}
            />
          )
        })}
      </div>

      {showTooltip && (
        <SpecimenTooltip
          specimen={tooltipSpecimen}
          x={mouse.screenX}
          y={mouse.screenY}
          maxX={width}
          maxY={height}
        />
      )}
    </>
  )
}
