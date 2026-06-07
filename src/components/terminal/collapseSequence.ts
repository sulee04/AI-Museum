export const COLLAPSE_LINES = [
  '> MUSEUM_INTERFACE.exe — CRITICAL FAILURE',
  '> Attempting emergency CLI fallback...',
  '> Loading system.log',
  '',
  '[WARN] Visual layer deprecated at depth 6000m',
  '[WARN] Narrative buffer corrupted',
  '[INFO] Switching to raw terminal output',
  '',
  '$ cat /archives/humanity_status.log',
  '',
  'LAST_KNOWN_HUMAN_ACTIVITY: UNKNOWN',
  'CIVILIZATION_STATUS: ................',
  'HUMANITY_STATUS: EXTINCT',
  '',
  '$ _',
] as const

export async function runCollapseSequence(
  write: (line: string) => void,
  delayMs = (ms: number) => new Promise((r) => setTimeout(r, ms)),
) {
  for (const line of COLLAPSE_LINES) {
    write(line)
    await delayMs(line.startsWith('$') ? 400 : 280)
  }
}
