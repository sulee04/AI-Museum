import type { ReactNode } from 'react'

interface ScrollContainerProps {
  children: ReactNode
  id?: string
}

export function ScrollContainer({ children, id = 'scroll-root' }: ScrollContainerProps) {
  return (
    <div id={id} className="relative min-h-screen w-full">
      {children}
    </div>
  )
}
