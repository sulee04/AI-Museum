import { createPortal } from 'react-dom'
import { EventPinnedPanel } from '@/components/narrative/EventPinnedPanel'

/** Root-level pinned panels — above scroll content & specimens */
export function ArchivePinnedPanels() {
  return createPortal(<EventPinnedPanel />, document.body)
}
