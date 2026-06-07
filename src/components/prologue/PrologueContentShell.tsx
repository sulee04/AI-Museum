import type { ReactNode } from 'react'

/** Aligns in-flow prologue content with the fixed chronology rail column */
export function PrologueContentShell({ children }: { children: ReactNode }) {
  return (
    <div className="content-max grid w-full gap-10 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:items-start">
      <div className="hidden lg:block" aria-hidden />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
