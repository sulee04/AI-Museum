import { Typography } from '@/components/ui/Typography'

interface SectionLabelProps {
  children: string
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <Typography variant="label" as="span" className={className}>
      {children}
    </Typography>
  )
}
