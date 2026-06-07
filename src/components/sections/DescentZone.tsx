import { getSectionByPhase } from '@/content/narrative'
import { SectionShell } from '@/components/sections/SectionShell'

const content = getSectionByPhase('descent')!

export function DescentZone() {
  return (
    <SectionShell
      id="descent"
      section="descent"
      label={content.label}
      title={content.title}
      subtitle={content.subtitle}
      body={content.body}
    />
  )
}
