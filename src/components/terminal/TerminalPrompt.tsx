import { Typography } from '@/components/ui/Typography'
import { getSectionByPhase } from '@/content/narrative'

const content = getSectionByPhase('terminal')!

interface TerminalPromptProps {
  visible: boolean
}

export function TerminalPrompt({ visible }: TerminalPromptProps) {
  if (!visible) return null

  return (
    <div className="mb-6 font-mono text-sm text-[var(--color-terminal-dim)]">
      <Typography variant="label" as="p" className="text-[var(--color-warning)]">
        {content.label}
      </Typography>
      <p className="mt-4 animate-pulse text-[var(--color-terminal)]">
        &gt; Interface collapse imminent...
      </p>
    </div>
  )
}
