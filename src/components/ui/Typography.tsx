import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TypographyVariant = 'display' | 'displayHero' | 'body' | 'bodyLg' | 'label' | 'mono' | 'monoDim'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  children: ReactNode
}

const variantClass: Record<TypographyVariant, string> = {
  display: 'text-display text-2xl md:text-3xl',
  displayHero: 'text-display-hero',
  body: 'text-body',
  bodyLg: 'text-body-lg',
  label: 'text-label',
  mono: 'text-mono',
  monoDim: 'text-mono-dim',
}

export function Typography({
  variant = 'body',
  as: Tag = 'p',
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Tag className={cn(variantClass[variant], className)} {...props}>
      {children}
    </Tag>
  )
}
