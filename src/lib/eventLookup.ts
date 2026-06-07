import type { TimelineEvent } from '@/data/types'
import { INTRO_EVENT_ARCHIVE } from '@/data/introEventArchive'
import { INTRO_SECTIONS } from '@/data/introTimeline'
import { getEventById as getMuseumEventById } from '@/data/timelineData'

export function getIntroEventById(eventId: string): TimelineEvent | undefined {
  for (const section of INTRO_SECTIONS) {
    const match = section.events.find((event) => event.id === eventId)
    if (match) return match
  }
  return undefined
}

function defaultExpandedDetail(event: TimelineEvent): TimelineEvent['expandedDetail'] {
  return {
    viewType: 'document',
    headline: event.title,
    sections: [
      { title: '개요', body: event.summary },
      ...(event.detail ? [{ title: '상세', body: event.detail }] : []),
    ],
  }
}

/** Prologue + ecosystem event lookup with archival fields merged */
export function resolveEventById(eventId: string): TimelineEvent | undefined {
  const intro = getIntroEventById(eventId)
  const museum = getMuseumEventById(eventId)
  const archive = INTRO_EVENT_ARCHIVE[eventId]

  if (!intro && !museum) return undefined

  const primary = intro ?? museum!

  const base: TimelineEvent = {
    ...museum,
    ...intro,
    id: eventId,
    subject: primary.subject,
    status: primary.status,
    title: primary.title,
    summary: intro?.summary ?? museum?.summary ?? primary.summary,
    detail: intro?.detail ?? archive?.detail ?? museum?.detail,
    tags: intro?.tags ?? museum?.tags,
    calendarYear: intro?.calendarYear ?? museum?.calendarYear,
    aa: museum?.aa ?? intro?.aa,
    isMajor: museum?.isMajor ?? intro?.isMajor,
    ecosystemImpact: museum?.ecosystemImpact ?? archive?.ecosystemImpact,
    exhibitImage: museum?.exhibitImage ?? archive?.exhibitImage,
    expandedDetail: museum?.expandedDetail ?? archive?.expandedDetail,
  }

  if (!base.exhibitImage) {
    base.exhibitImage = {
      alt: `${base.title} — archival reconstruction`,
      placeholderLabel: base.title,
    }
  }

  if (!base.expandedDetail) {
    base.expandedDetail = defaultExpandedDetail(base)
  }

  return base
}
