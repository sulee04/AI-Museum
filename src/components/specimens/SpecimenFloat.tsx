import { motion } from 'framer-motion'
import type { SpecimenEntry, SpecimenVisualState } from '@/content/specimens'
import { SpecimenIcon } from '@/components/specimens/SpecimenIcon'
import { cn } from '@/lib/utils'

interface SpecimenFloatProps {
  specimen: SpecimenEntry
  state: SpecimenVisualState
  isHovered: boolean
  isSelected: boolean
  nearCursor: boolean
  onEnter: () => void
  onLeave: () => void
  onSelect: () => void
}

export function SpecimenFloat({
  specimen,
  state,
  isHovered,
  isSelected,
  nearCursor,
  onEnter,
  onLeave,
  onSelect,
}: SpecimenFloatProps) {
  const canInteract = state.alive && state.phase !== 'sinking'
  const mutation = isHovered || isSelected ? 1 : nearCursor ? 0.45 : 0
  const wobbleX = mutation * Math.sin(specimen.mutationSeed * 100) * 4

  const filterParts = [
    state.glitch > 0 ? `url(#specimen-pixelate)` : '',
  ].filter(Boolean)

  return (
    <motion.div
      className={cn(
        'pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2',
        state.phase === 'sinking' && 'specimen-sinking',
        isHovered && canInteract && 'specimen-mutating',
        isSelected && canInteract && 'specimen-selected',
      )}
      style={{
        left: `${state.x}%`,
        top: `${state.y}%`,
        opacity: state.opacity,
        rotate: state.rotation,
        zIndex:
          state.phase === 'pinned'
            ? 20
            : state.phase === 'sinking'
              ? 8
              : state.phase === 'rising'
                ? 15
                : 10,
        filter: filterParts.length ? filterParts.join(' ') : undefined,
      }}
      animate={{
        scale: state.scale * (1 + mutation * 0.12),
        x: wobbleX,
      }}
      transition={{
        scale: { duration: 0.42, ease: [0.25, 1, 0.5, 1] },
        x: { duration: 0.14, ease: [0.25, 1, 0.5, 1] },
      }}
      onMouseEnter={canInteract ? onEnter : undefined}
      onMouseLeave={canInteract ? onLeave : undefined}
      onClick={
        canInteract
          ? (event) => {
              event.stopPropagation()
              onSelect()
            }
          : undefined
      }
      role={canInteract ? 'button' : undefined}
      tabIndex={canInteract ? 0 : undefined}
      onKeyDown={
        canInteract
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect()
              }
            }
          : undefined
      }
    >
      <motion.span
        className={cn(
          'specimen-icon-shell relative inline-flex h-4 w-4 items-center justify-center',
          canInteract && 'cursor-pointer',
        )}
        animate={{
          scale: nearCursor && !isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
      >
        <SpecimenIcon
          type={specimen.icon}
          color={isHovered || isSelected ? '#ffffff' : '#d4d4d4'}
          className="h-3.5 w-3.5"
        />
      </motion.span>

      <motion.span
        className={cn(
          'text-specimen-name select-none',
          state.phase === 'sinking'
            ? 'text-specimen-name-extinct line-through decoration-[rgba(100,115,130,0.5)]'
            : isHovered || isSelected
              ? 'text-specimen-name-active'
              : 'text-specimen-name-idle',
        )}
        animate={{
          opacity: state.phase === 'sinking' ? 0.55 : 1,
          x: mutation * 3,
        }}
      >
        {specimen.name}
      </motion.span>
    </motion.div>
  )
}
