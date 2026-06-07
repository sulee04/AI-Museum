import type { NarrativeLandmark } from '@/content/landmarks.data'
import {
  LANDMARK_DWELL_AFTER,
  LANDMARK_DWELL_BEFORE,
  LANDMARK_FADE_EDGE,
} from '@/content/landmarks.data'
import { clamp } from '@/lib/utils'

export interface ActiveLandmark {
  landmark: NarrativeLandmark
  opacity: number
  driftY: number
}

/**
 * Peak opacity when currentAA matches landmark.aa (synced with AA counter).
 */
function getLandmarkOpacity(currentAA: number, landmark: NarrativeLandmark): number {
  const before = landmark.dwellBefore ?? LANDMARK_DWELL_BEFORE
  const after = landmark.dwellAfter ?? LANDMARK_DWELL_AFTER
  const fade = LANDMARK_FADE_EDGE
  const anchor = landmark.aa

  const start = anchor - before
  const end = anchor + after

  if (currentAA < start || currentAA > end) return 0

  const dist = Math.abs(currentAA - anchor)

  if (dist <= fade * 0.35) {
    return 1
  }

  if (currentAA < anchor) {
    const approachSpan = before - fade * 0.35
    if (approachSpan <= 0) return 1
    return clamp((currentAA - start) / approachSpan, 0, 1)
  }

  const departSpan = after - fade * 0.35
  if (departSpan <= 0) return 1
  return clamp((end - currentAA) / departSpan, 0, 1)
}

export function getActiveLandmark(
  landmarks: NarrativeLandmark[],
  currentAA: number,
): ActiveLandmark | null {
  let best: ActiveLandmark | null = null

  for (const landmark of landmarks) {
    const opacity = getLandmarkOpacity(currentAA, landmark)
    if (opacity <= 0) continue

    const driftY = (currentAA - landmark.aa) * 0.35

    if (!best || opacity > best.opacity) {
      best = { landmark, opacity, driftY }
    }
  }

  return best
}
