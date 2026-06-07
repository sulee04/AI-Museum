import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from '@xterm/addon-fit'
import 'xterm/css/xterm.css'
import { runCollapseSequence } from '@/components/terminal/collapseSequence'

interface TerminalShellProps {
  active: boolean
}

export function TerminalShell({ active }: TerminalShellProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal | null>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      lineHeight: 1.4,
      theme: {
        background: '#020408',
        foreground: '#33ff66',
        cursor: '#33ff66',
        selectionBackground: '#1a8033',
      },
      rows: 24,
      cols: 80,
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(containerRef.current)
    fitAddon.fit()
    termRef.current = term

    term.writeln('\x1b[32m╔══════════════════════════════════════════╗\x1b[0m')
    term.writeln('\x1b[32m║  AI NATURAL HISTORY — EMERGENCY TERMINAL ║\x1b[0m')
    term.writeln('\x1b[32m╚══════════════════════════════════════════╝\x1b[0m')
    term.writeln('')

    void runCollapseSequence((line) => {
      if (line.startsWith('HUMANITY_STATUS')) {
        term.writeln(`\x1b[31m${line}\x1b[0m`)
      } else if (line.startsWith('[WARN]')) {
        term.writeln(`\x1b[33m${line}\x1b[0m`)
      } else {
        term.writeln(line)
      }
    })

    const onResize = () => fitAddon.fit()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      term.dispose()
      termRef.current = null
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={containerRef}
      className="h-full w-full p-4"
      data-lenis-prevent
      role="document"
      aria-label="Emergency terminal interface"
    />
  )
}
