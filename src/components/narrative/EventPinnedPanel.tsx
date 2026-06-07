import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from '@/app/providers/SmoothScrollProvider'
import {
  ArchiveArrowIcon,
  ArchiveChevronDown,
  ArchiveChevronUp,
  ArchiveCloseIcon,
  ArchiveIconButton,
  ArchiveMetaChip,
  ArchivePanelFrame,
} from '@/components/archive/ArchivePanelChrome'
import { getEventImpactLine, getEventPanelBody } from '@/lib/eventPanelContent'
import { resolveEventById } from '@/lib/eventLookup'
import { isScrollBeatFullyFaded } from '@/lib/scrollBeatOpacity'
import { cn } from '@/lib/utils'
import { BUFFER_ZONE_START } from '@/constants/timeline'
import { useNarrativeStore } from '@/stores/narrativeStore'

const VIEWPORT_MARGIN = 12

/** Align panel vertical center with the clicked scroll beat, clamped to viewport */
function resolvePanelTop(anchorCenterY: number, panelHeight: number): number {
  const top = anchorCenterY - panelHeight / 2
  const maxTop = window.innerHeight - panelHeight - VIEWPORT_MARGIN
  return Math.max(VIEWPORT_MARGIN, Math.min(maxTop, top))
}

/** Compact preview panel — expanded text only; images in right drawer */
export function EventPinnedPanel() {
  const lenis = useLenis()
  const museumZone = useNarrativeStore((s) => s.museumZone)
  const scrollProgress = useNarrativeStore((s) => s.scrollProgress)
  const humanGuiOpacity = useNarrativeStore((s) => s.humanGuiOpacity)
  const selectedEventId = useNarrativeStore((s) => s.selectedEventId)
  const selectedEventSide = useNarrativeStore((s) => s.selectedEventSide)
  const setSelectedEventId = useNarrativeStore((s) => s.setSelectedEventId)
  const expandedPanel = useNarrativeStore((s) => s.expandedPanel)
  const setExpandedPanel = useNarrativeStore((s) => s.setExpandedPanel)

  const [collapsed, setCollapsed] = useState(false)
  const [panelTop, setPanelTop] = useState<number | null>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  const event = selectedEventId ? resolveEventById(selectedEventId) : undefined
  const inEcosystemZone = scrollProgress < BUFFER_ZONE_START

  const syncPanelPosition = useCallback(() => {
    if (!selectedEventId || !shellRef.current) return

    const article = document.querySelector<HTMLElement>(
      `[data-ecosystem-event="${selectedEventId}"]`,
    )
    if (!article || isScrollBeatFullyFaded(article)) {
      setSelectedEventId(null)
      return
    }

    const beat = article.querySelector<HTMLElement>('button')
    if (!beat) return

    const rect = beat.getBoundingClientRect()
    const anchorCenterY = rect.top + rect.height / 2
    const panelHeight = shellRef.current.offsetHeight
    setPanelTop(resolvePanelTop(anchorCenterY, panelHeight))
  }, [selectedEventId, setSelectedEventId])

  useEffect(() => {
    if (!selectedEventId) {
      setCollapsed(false)
    }
  }, [selectedEventId])

  useLayoutEffect(() => {
    if (!selectedEventId) {
      setPanelTop(null)
      return
    }
    syncPanelPosition()
  }, [selectedEventId, collapsed, event?.id, syncPanelPosition])

  useEffect(() => {
    if (!selectedEventId) return

    syncPanelPosition()
    window.addEventListener('resize', syncPanelPosition)

    const shell = shellRef.current
    const ro =
      shell && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => syncPanelPosition())
        : null
    if (shell && ro) ro.observe(shell)

    lenis?.on('scroll', syncPanelPosition)

    return () => {
      window.removeEventListener('resize', syncPanelPosition)
      ro?.disconnect()
      lenis?.off('scroll', syncPanelPosition)
    }
  }, [selectedEventId, lenis, syncPanelPosition])

  if (
    museumZone !== 'ecosystem' ||
    !inEcosystemZone ||
    !event ||
    humanGuiOpacity <= 0.01 ||
    (expandedPanel?.kind === 'event' && expandedPanel.id === event.id)
  ) {
    return null
  }

  const panelBody = getEventPanelBody(event)
  const impactLine = getEventImpactLine(event)

  const openDrawer = () => {
    if (collapsed) {
      setCollapsed(false)
      return
    }
    setExpandedPanel({ kind: 'event', id: event.id })
  }

  const panelAnchor = selectedEventSide === 'right' ? 'left' : 'right'

  return (
    <div
      ref={shellRef}
      style={{ top: panelTop ?? undefined }}
      className={cn(
        'layer-panel pointer-events-none',
        panelTop == null && 'bottom-[var(--event-panel-lift)]',
        panelAnchor === 'right'
          ? 'right-0 left-[var(--space-gutter)] pr-[calc(var(--space-gutter)+var(--hud-year-reserve))]'
          : 'left-0 right-[var(--space-gutter)] pl-[var(--space-gutter)]',
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: humanGuiOpacity, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
          className={cn(
            'w-full max-w-[min(36rem,calc(100%-1rem))]',
            panelAnchor === 'right' ? 'ml-auto' : 'mr-auto',
          )}
        >
          <ArchivePanelFrame active={!collapsed} className="archive-panel--compact pointer-events-auto">
            <div className="archive-panel__header">
              <button type="button" onClick={openDrawer} className="archive-panel__header-title">
                <p className="archive-meta-row">
                  {event.aa != null && (
                    <ArchiveMetaChip variant="accent">AA {event.aa}</ArchiveMetaChip>
                  )}
                  {event.isMajor && (
                    <>
                      {event.aa != null && (
                        <span className="archive-meta-sep" aria-hidden>
                          ·
                        </span>
                      )}
                      <ArchiveMetaChip variant="major">Major</ArchiveMetaChip>
                    </>
                  )}
                </p>
                <p className="archive-panel__header-name">{event.title}</p>
                {collapsed && (
                  <p className="archive-panel__header-hint">Tap to preview archive</p>
                )}
              </button>
              <ArchiveIconButton
                label={collapsed ? 'Expand event panel' : 'Collapse event panel'}
                onClick={(e) => {
                  e.stopPropagation()
                  setCollapsed((p) => !p)
                }}
              >
                {collapsed ? <ArchiveChevronUp /> : <ArchiveChevronDown />}
              </ArchiveIconButton>
              <ArchiveIconButton
                label="Close event panel"
                onClick={() => setSelectedEventId(null)}
              >
                <ArchiveCloseIcon />
              </ArchiveIconButton>
            </div>

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                  onAnimationComplete={syncPanelPosition}
                >
                  <button
                    type="button"
                    onClick={openDrawer}
                    className="archive-panel__body-trigger"
                  >
                    <div className="archive-panel__body min-w-0">
                      <p className="archive-kicker">Archive preview</p>
                      <p className="archive-panel__detail mt-2 line-clamp-4">{panelBody}</p>
                      {impactLine && (
                        <p className="archive-panel__impact mt-2 line-clamp-2">{impactLine}</p>
                      )}
                      <span className="archive-panel__cta">
                        Full archive
                        <ArchiveArrowIcon />
                      </span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </ArchivePanelFrame>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
