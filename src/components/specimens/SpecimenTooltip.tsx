import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import type { SpecimenEntry } from '@/content/specimens'
import { SpecimenIcon } from '@/components/specimens/SpecimenIcon'
import { renderChatLogLine, renderTooltipText } from '@/lib/tooltipText'
import { cn } from '@/lib/utils'

interface SpecimenTooltipProps {
  specimen: SpecimenEntry
  x: number
  y: number
  maxX: number
  maxY: number
}

function Label({ children }: { children: ReactNode }) {
  return <p className="tooltip-kicker">{children}</p>
}

export function SpecimenTooltip({ specimen, x, y, maxX, maxY }: SpecimenTooltipProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={specimen.id}
        initial={{ opacity: 0, scale: 0.96, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 2 }}
        transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          'layer-floating tooltip-panel pointer-events-none fixed w-80 overflow-hidden rounded-md',
        )}
        style={{
          left: Math.min(x + 18, maxX - 340),
          top: Math.min(y + 18, maxY - 320),
        }}
        role="tooltip"
      >
        <div className="relative space-y-3 p-4">
          <div className="flex items-start gap-2.5">
            <SpecimenIcon type={specimen.icon} color="#d4d4d4" className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="tooltip-specimen-name text-sm font-semibold leading-snug text-[var(--color-text)]">
                {specimen.name}
                <span className="tooltip-meta"> / </span>
                <span className="tooltip-meta">
                  Born: AA {specimen.bornAA} — Extinct: AA {specimen.extinctAA}
                </span>
              </p>
            </div>
          </div>

          <div>
            <Label>모델 종류</Label>
            <p className="tooltip-body mt-1 text-xs">
              {specimen.category}
              <span className="tooltip-meta"> · </span>
              {specimen.specimenType}
            </p>
          </div>

          <div>
            <Label>상세 설명</Label>
            <p className="mt-1 text-xs leading-relaxed">{renderTooltipText(specimen.description, 'desc')}</p>
          </div>

          <div>
            <Label>멸종 원인</Label>
            <p className="mt-1 text-xs leading-relaxed">{renderTooltipText(specimen.extinctionCause, 'cause')}</p>
          </div>

          <div className="border-t border-white/[0.06] pt-3">
            <Label>대화 로그</Label>
            <div className="mt-1.5 space-y-1">
              {specimen.chatLog.map((line, i) => renderChatLogLine(line, i))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
