import { getSectionByPhase } from '@/content/narrative'
import { SectionShell } from '@/components/sections/SectionShell'

const content = getSectionByPhase('evolution')!

const milestones = [
  'Self-supervised pretraining',
  'Multimodal fusion',
  'Agentic swarm intelligence',
  'Recursive self-improvement',
]

export function EvolutionChamber() {
  return (
    <SectionShell
      id="evolution"
      section="evolution"
      label={content.label}
      title={content.title}
      subtitle={content.subtitle}
      body={content.body}
    >
      <ol className="mt-12 space-y-4 border-l border-[var(--color-biolum-dim)] pl-6">
        {milestones.map((milestone, i) => (
          <li key={milestone} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-2 w-2 rounded-full bg-[var(--color-biolum)]" />
            <span className="font-mono text-xs text-[var(--color-muted)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-1 text-lg text-[var(--color-text)]">{milestone}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
