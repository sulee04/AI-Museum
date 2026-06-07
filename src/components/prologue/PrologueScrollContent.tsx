import { INTRO_SECTIONS } from '@/data/introTimeline'
import { PrologueChapterIntro } from '@/components/prologue/PrologueChapterIntro'
import { PrologueScrollBeat } from '@/components/prologue/PrologueScrollBeat'

/** In-flow prologue narrative — Deep Sea–style vertical scroll beats */
export function PrologueScrollContent() {
  return (
    <div className="relative w-full">
      {INTRO_SECTIONS.map((section) => (
        <div key={section.id} data-prologue-section={section.id}>
          <PrologueChapterIntro section={section} />
          {section.events.map((event) => (
            <PrologueScrollBeat
              key={event.id}
              event={event}
              sectionLabel={section.label}
              chapterTitle={section.title}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
