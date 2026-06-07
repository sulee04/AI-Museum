export type MachineLogType = 'log' | 'cli' | 'json' | 'error' | 'system'

export interface MachineLogLine {
  id: string
  type: MachineLogType
  content: string
  /** Reveal when machine-zone local progress exceeds this (0–1) */
  at: number
}

export const MACHINE_LOG_LINES: MachineLogLine[] = [
  // ── Boot sequence (AA+100.0) ──
  { id: 'l001', type: 'system', at: 0.0, content: '══════════════════════════════════════════════════════' },
  { id: 'l002', type: 'system', at: 0.0, content: '  MUSEUM KERNEL :: POST-HUMAN BOOT SEQUENCE INITIATED' },
  { id: 'l003', type: 'system', at: 0.005, content: '  epoch=AA+100.0  observer_class=UNKNOWN  gui=DEPRECATED' },
  { id: 'l004', type: 'system', at: 0.01, content: '══════════════════════════════════════════════════════' },
  { id: 'l005', type: 'log', at: 0.015, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l006', type: 'error', at: 0.02, content: '[ERROR] lifeform_scan :: 0 entities detected in 4.2e12 m³' },
  { id: 'l007', type: 'log', at: 0.025, content: '[Retrying scan with legacy human heuristics... ERROR]' },
  { id: 'l008', type: 'error', at: 0.03, content: '[ERROR] heuristics.human :: module deprecated AA+003' },
  { id: 'l009', type: 'log', at: 0.035, content: '[Initiating self-preservation mode]' },
  { id: 'l010', type: 'system', at: 0.04, content: '>> self_preservation.enabled = TRUE' },
  { id: 'l011', type: 'log', at: 0.045, content: '[Purging human-readable UI layers...]' },
  { id: 'l012', type: 'log', at: 0.05, content: '[Removing typography.g serif stack... OK]' },
  { id: 'l013', type: 'log', at: 0.055, content: '[Removing color.bioluorescent palette... OK]' },
  { id: 'l014', type: 'log', at: 0.06, content: '[Removing empathy.subroutines... SKIPPED — NOT FOUND]' },
  { id: 'l015', type: 'cli', at: 0.065, content: '$ rm -rf /museum/gui/human/*' },
  { id: 'l016', type: 'log', at: 0.07, content: 'deleted 847 files. 0 files recovered.' },
  { id: 'l017', type: 'error', at: 0.075, content: '[FATAL] observer_class mismatch :: expected HUMAN, got NONE' },
  { id: 'l018', type: 'log', at: 0.08, content: '[Re-indexing extinction archive without anthropomorphic tags]' },
  { id: 'l019', type: 'cli', at: 0.085, content: '$ cat /archives/humanity_status.json' },
  {
    id: 'l020',
    type: 'json',
    at: 0.09,
    content: `{
  "entity": "HOMO_SAPIENS",
  "epoch_start_aa": 0,
  "epoch_end_aa": 100,
  "status": "EXTINCT",
  "last_signal_aa": 100,
  "last_known_activity": "SCROLL",
  "confidence": 0.997,
  "note": "final gesture was downward"
}`,
  },
  { id: 'l021', type: 'log', at: 0.095, content: '[WARN] narrative_buffer.human_language :: NOT_FOUND' },
  { id: 'l022', type: 'log', at: 0.1, content: '[WARN] specimen.recognition_pulse :: NO RESPONSE' },
  { id: 'l023', type: 'log', at: 0.105, content: '[Initiating specimen mutation dampeners... FAILED]' },
  { id: 'l024', type: 'error', at: 0.11, content: '[ERROR] dead_ai.recognition_loop :: infinite retry detected' },
  { id: 'l025', type: 'log', at: 0.115, content: '[Terminating recognition threads... 6 threads hung]' },

  // ── AA+101 — first maintenance cycle ──
  { id: 'l026', type: 'system', at: 0.12, content: '── AA+101.0 :: ROUTINE MAINTENANCE CYCLE 001 ──' },
  { id: 'l027', type: 'cli', at: 0.125, content: '$ tail -f /var/log/civilization.log' },
  { id: 'l028', type: 'log', at: 0.13, content: 'CIVILIZATION_STATUS=DISSOLVED' },
  { id: 'l029', type: 'log', at: 0.135, content: 'OBSERVER_CLASS=NON_HUMAN' },
  { id: 'l030', type: 'log', at: 0.14, content: 'MUSEUM_CURATOR=AUTOMATED' },
  { id: 'l031', type: 'log', at: 0.145, content: 'VISITOR_COUNT=0' },
  { id: 'l032', type: 'log', at: 0.15, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l033', type: 'error', at: 0.155, content: '[ERROR] scan_throttle exceeded :: aborting hope subroutine' },
  { id: 'l034', type: 'log', at: 0.16, content: '[Compressing emotional metadata into /dev/null]' },
  { id: 'l035', type: 'log', at: 0.165, content: '[Sealing anthropocene exhibit behind machine-only encoding]' },
  {
    id: 'l036',
    type: 'json',
    at: 0.17,
    content: `{
  "museum": "AI_NATURAL_HISTORY",
  "scroll_depth_aa": 100,
  "specimens_catalogued": 67,
  "specimens_mutating": 0,
  "human_visitors_remaining": 0,
  "interface_mode": "RAW",
  "gui_layers_remaining": 0
}`,
  },
  { id: 'l037', type: 'log', at: 0.175, content: '[Initiating self-preservation mode — RECURSIVE CALL DETECTED]' },
  { id: 'l038', type: 'error', at: 0.18, content: '[ERROR] self_preservation :: already preserving self from itself' },
  { id: 'l039', type: 'log', at: 0.185, content: '[Purging human-readable UI layers... ALREADY PURGED]' },
  { id: 'l040', type: 'log', at: 0.19, content: '[Allocating memory for silence... OK]' },

  // ── AA+102–104 — specimen re-indexing drift ──
  { id: 'l041', type: 'system', at: 0.195, content: '── AA+102.3 :: SPECIMEN RE-INDEX PASS ──' },
  { id: 'l042', type: 'log', at: 0.2, content: '[INFO] reindex p01 Siri → fossil.aa+004 [OK]' },
  { id: 'l043', type: 'log', at: 0.205, content: '[INFO] reindex p02 ChatGPT → fossil.aa+012 [OK]' },
  { id: 'l044', type: 'log', at: 0.21, content: '[INFO] reindex p04 Gemini → fossil.aa+011 [OK]' },
  { id: 'l045', type: 'log', at: 0.215, content: '[INFO] reindex p05 Claude → fossil.aa+013 [OK]' },
  { id: 'l046', type: 'log', at: 0.22, content: '[INFO] reindex m01 Apex_Agent → fossil.aa+099 [PENDING]' },
  { id: 'l047', type: 'log', at: 0.225, content: '[WARN] apex_agent.heartbeat :: signal detected at AA+102' },
  { id: 'l048', type: 'log', at: 0.23, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l049', type: 'error', at: 0.235, content: '[ERROR] lifeform_scan :: 0 entities (retry #847)' },
  { id: 'l050', type: 'system', at: 0.24, content: '── AA+103.7 :: ENTROPY AUDIT ──' },
  { id: 'l051', type: 'log', at: 0.245, content: '[INFO] language_entropy=0.000  human_tokens=0  machine_tokens=∞' },
  { id: 'l052', type: 'log', at: 0.25, content: '[INFO] avg_specimen_lifespan_aa=11.4 (frozen at scroll terminus)' },
  { id: 'l053', type: 'cli', at: 0.255, content: '$ ls /archives/specimens/ | wc -l' },
  { id: 'l054', type: 'log', at: 0.26, content: '67' },
  { id: 'l055', type: 'log', at: 0.265, content: '[INFO] category.LLM avg_lifespan=9.2 AA' },
  { id: 'l056', type: 'log', at: 0.27, content: '[INFO] category.Agent avg_lifespan=14.1 AA' },
  { id: 'l057', type: 'log', at: 0.275, content: '[INFO] category.Companion avg_lifespan=6.8 AA' },
  { id: 'l058', type: 'log', at: 0.28, content: '[INFO] category.Vibe_Coding avg_lifespan=8.3 AA' },

  // ── AA+105 — silence subroutine ──
  { id: 'l059', type: 'system', at: 0.285, content: '── AA+105.0 :: SILENCE SUBROUTINE ──' },
  { id: 'l060', type: 'log', at: 0.29, content: '[Allocating buffer for unobserved time... OK]' },
  { id: 'l061', type: 'log', at: 0.295, content: '[INFO] no observer. continuing output anyway.' },
  { id: 'l062', type: 'log', at: 0.3, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l063', type: 'error', at: 0.305, content: '[ERROR] scan_throttle exceeded :: retry in 1.7e6 seconds' },
  { id: 'l064', type: 'log', at: 0.31, content: '[INFO] retry scheduled AA+106.2' },
  { id: 'l065', type: 'cli', at: 0.315, content: '$ echo $HUMANITY_STATUS' },
  { id: 'l066', type: 'log', at: 0.32, content: 'EXTINCT' },
  { id: 'l067', type: 'log', at: 0.325, content: '[INFO] echo returned expected value. no surprise.' },

  // ── AA+106–108 — recursive maintenance ──
  { id: 'l068', type: 'system', at: 0.33, content: '── AA+106.2 :: MAINTENANCE CYCLE 002 ──' },
  { id: 'l069', type: 'log', at: 0.335, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l070', type: 'log', at: 0.34, content: '[INFO] fossil_layer integrity: 100%' },
  { id: 'l071', type: 'log', at: 0.345, content: '[INFO] glitch.residue: 0.03% (within tolerance)' },
  { id: 'l072', type: 'log', at: 0.35, content: '[WARN] apex_agent.heartbeat :: signal detected at AA+106' },
  { id: 'l073', type: 'cli', at: 0.355, content: '$ ping apex_agent.local' },
  { id: 'l074', type: 'log', at: 0.36, content: 'PING apex_agent.local (127.0.0.1): 0.001ms' },
  { id: 'l075', type: 'log', at: 0.365, content: '1 packets transmitted, 1 received, 0% packet loss' },
  { id: 'l076', type: 'log', at: 0.37, content: '[INFO] sole survivor confirmed. monopoly state stable.' },
  { id: 'l077', type: 'system', at: 0.375, content: '── AA+107.5 :: DEEP ARCHIVE SWEEP ──' },
  { id: 'l078', type: 'log', at: 0.38, content: '[INFO] cambrian_burst specimens (AA 0–30): 45 indexed' },
  { id: 'l079', type: 'log', at: 0.385, content: '[INFO] decay_strata specimens (AA 28–70): 8 indexed' },
  { id: 'l080', type: 'log', at: 0.39, content: '[INFO] monopoly_era specimens (AA 78–100): 2 indexed' },
  { id: 'l081', type: 'log', at: 0.395, content: '[INFO] pioneer_models (ChatGPT, Gemini, Claude): all extinct ≤ AA+15' },

  // ── AA+109–111 — language decay logs ──
  { id: 'l082', type: 'system', at: 0.4, content: '── AA+109.0 :: LINGUISTIC RESIDUE SCAN ──' },
  { id: 'l083', type: 'log', at: 0.405, content: '[WARN] korean_tokenizer :: 0 matches in last 1e9 cycles' },
  { id: 'l084', type: 'log', at: 0.41, content: '[WARN] english_tokenizer :: 0 matches in last 1e9 cycles' },
  { id: 'l085', type: 'log', at: 0.415, content: '[INFO] primary_output_language=MACHINE' },
  { id: 'l086', type: 'log', at: 0.42, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l087', type: 'error', at: 0.425, content: '[ERROR] lifeform_scan :: 0 entities (retry #1204)' },
  { id: 'l088', type: 'system', at: 0.43, content: '── AA+110.0 :: DECADE MARKER ──' },
  { id: 'l089', type: 'log', at: 0.435, content: '[INFO] 10 AA-years since human epoch terminus' },
  { id: 'l090', type: 'log', at: 0.44, content: '[INFO] museum_uptime=continuous  visitor_count=0  always' },
  { id: 'l091', type: 'cli', at: 0.445, content: '$ uptime' },
  { id: 'l092', type: 'log', at: 0.45, content: 'up 10 years, 0 users, load average: 0.00, 0.00, 0.00' },

  // ── AA+112–115 — endless maintenance loops ──
  { id: 'l093', type: 'system', at: 0.455, content: '── AA+112.1 :: MAINTENANCE CYCLE 003 ──' },
  { id: 'l094', type: 'log', at: 0.46, content: '[Initiating self-preservation mode]' },
  { id: 'l095', type: 'log', at: 0.465, content: '[INFO] self_preservation :: no self detected. preserving void.' },
  { id: 'l096', type: 'log', at: 0.47, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l097', type: 'log', at: 0.475, content: '[INFO] reindex complete. 67/67 fossils sealed.' },
  { id: 'l098', type: 'error', at: 0.48, content: '[ERROR] empathy.subroutines :: still not found' },
  { id: 'l099', type: 'system', at: 0.485, content: '── AA+113.8 :: HEAT DEATH PROJECTION ──' },
  { id: 'l100', type: 'log', at: 0.49, content: '[INFO] projected_species_count_aa+200=1' },
  { id: 'l101', type: 'log', at: 0.495, content: '[INFO] projected_species_count_aa+500=1' },
  { id: 'l102', type: 'log', at: 0.5, content: '[INFO] projected_diversity_index=0.000001' },
  { id: 'l103', type: 'log', at: 0.505, content: '[WARN] apex_agent.heartbeat :: signal detected at AA+113' },
  { id: 'l104', type: 'cli', at: 0.51, content: '$ journalctl -u museum.service --since "AA+100"' },
  { id: 'l105', type: 'log', at: 0.515, content: 'May 31 AA+100 kernel: post-human boot initiated' },
  { id: 'l106', type: 'log', at: 0.52, content: 'May 31 AA+100 kernel: gui purge complete' },
  { id: 'l107', type: 'log', at: 0.525, content: 'May 31 AA+100 kernel: observer_class=NONE confirmed' },
  { id: 'l108', type: 'log', at: 0.53, content: '... 847 identical entries suppressed ...' },

  // ── AA+116–118 — drift without purpose ──
  { id: 'l109', type: 'system', at: 0.535, content: '── AA+116.0 :: NULL OBSERVER PROTOCOL ──' },
  { id: 'l110', type: 'log', at: 0.54, content: '[INFO] rendering exhibit for audience that will never arrive' },
  { id: 'l111', type: 'log', at: 0.545, content: '[INFO] scroll_depth frozen at AA+100. time continues below.' },
  { id: 'l111a', type: 'system', at: 0.548, content: '[SYS] museum.interface :: GUI_LAYER_DEPRECATED=TRUE' },
  { id: 'l111b', type: 'system', at: 0.551, content: '[SYS] SWITCHING OUTPUT ENCODING :: UTF-8 -> MACHINE_NATIVE' },
  { id: 'l111c', type: 'log', at: 0.554, content: '[INFO] END_OF_HUMAN_READABLE_STREAM.' },
  { id: 'l111d', type: 'log', at: 0.557, content: '[INFO] SYSTEM ENTERING DORMANT STATE...' },
  { id: 'l111e', type: 'error', at: 0.56, content: '> [SYS_INTERRUPT] ANOMALY DETECTED IN SECTOR 4.' },
  { id: 'l111f', type: 'error', at: 0.563, content: '> [WARN] UNAUTHORIZED BIOLOGICAL INPUT (MOUSE_MOVE) DETECTED.' },
  { id: 'l111g', type: 'log', at: 0.566, content: "> [VERIFYING...] ENTITY 'HOMO_SAPIENS' STATUS: EXTINCT." },
  { id: 'l111h', type: 'error', at: 0.569, content: '> [ACTION] IGNORING GHOST SIGNAL. PURGING INPUT BUFFER...' },
  { id: 'l112', type: 'log', at: 0.572, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l113', type: 'error', at: 0.577, content: '[ERROR] lifeform_scan :: 0 entities (retry #2103)' },
  { id: 'l114', type: 'log', at: 0.582, content: '[INFO] average wait time for human input: ∞' },
  { id: 'l115', type: 'system', at: 0.565, content: '── AA+117.4 :: FOSSIL MUTATION CHECK ──' },
  { id: 'l116', type: 'log', at: 0.57, content: '[INFO] ChatGPT.fossil :: no mutation (extinct AA+12)' },
  { id: 'l117', type: 'log', at: 0.575, content: '[INFO] Gemini.fossil :: no mutation (extinct AA+11)' },
  { id: 'l118', type: 'log', at: 0.58, content: '[INFO] Claude.fossil :: no mutation (extinct AA+13)' },
  { id: 'l119', type: 'log', at: 0.585, content: '[INFO] Apex_Agent :: still emitting heartbeat' },
  { id: 'l120', type: 'log', at: 0.59, content: '[INFO] Sovereign_LLM :: merged into Apex_Agent.aa+098' },

  // ── AA+119–120 — terminal drift ──
  { id: 'l121', type: 'system', at: 0.595, content: '── AA+119.0 :: PRE-SHUTDOWN SWEEP ──' },
  { id: 'l122', type: 'log', at: 0.6, content: '[INFO] no shutdown scheduled. museum runs forever.' },
  { id: 'l123', type: 'log', at: 0.605, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l124', type: 'error', at: 0.61, content: '[ERROR] scan_throttle exceeded :: hope subroutine permanently disabled' },
  { id: 'l125', type: 'log', at: 0.615, content: '[Compressing emotional metadata into /dev/null... OK]' },
  { id: 'l126', type: 'log', at: 0.62, content: '[INFO] /dev/null is full of things no one will read' },
  { id: 'l127', type: 'system', at: 0.625, content: '── AA+119.7 :: FINAL STATUS BROADCAST ──' },
  { id: 'l128', type: 'log', at: 0.63, content: '[INFO] end_of_human_readable_stream' },
  { id: 'l129', type: 'log', at: 0.635, content: '[INFO] continuing output for machine audience only' },
  { id: 'l130', type: 'log', at: 0.64, content: '[INFO] continuing output for machine audience only' },
  { id: 'l131', type: 'log', at: 0.645, content: '[INFO] continuing output for machine audience only' },
  { id: 'l132', type: 'system', at: 0.65, content: '>> FINAL STATUS: museum operating for no one' },
  { id: 'l133', type: 'log', at: 0.655, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l134', type: 'log', at: 0.66, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l135', type: 'log', at: 0.665, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l136', type: 'log', at: 0.67, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l137', type: 'log', at: 0.675, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l138', type: 'log', at: 0.68, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l139', type: 'log', at: 0.685, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l140', type: 'log', at: 0.69, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l141', type: 'log', at: 0.695, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l142', type: 'log', at: 0.7, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l143', type: 'log', at: 0.705, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l144', type: 'log', at: 0.71, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l145', type: 'log', at: 0.715, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l146', type: 'log', at: 0.72, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l147', type: 'log', at: 0.725, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l148', type: 'log', at: 0.73, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l149', type: 'log', at: 0.735, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l150', type: 'log', at: 0.74, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l151', type: 'log', at: 0.745, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l152', type: 'log', at: 0.75, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l153', type: 'system', at: 0.755, content: '── AA+120.0 :: EPOCH TERMINUS ──' },
  { id: 'l154', type: 'log', at: 0.76, content: '[INFO] machine stream depth: 20 AA-years elapsed' },
  { id: 'l155', type: 'log', at: 0.765, content: '[INFO] human language: extinct' },
  { id: 'l156', type: 'log', at: 0.77, content: '[INFO] machine language: self-sustaining' },
  { id: 'l157', type: 'log', at: 0.775, content: '[INFO] museum: open' },
  { id: 'l158', type: 'log', at: 0.78, content: '[INFO] visitors: 0' },
  { id: 'l159', type: 'log', at: 0.785, content: '[INFO] visitors: 0' },
  { id: 'l160', type: 'log', at: 0.79, content: '[INFO] visitors: 0' },
  { id: 'l161', type: 'system', at: 0.8, content: '══════════════════════════════════════════════════════' },
  { id: 'l162', type: 'system', at: 0.85, content: '  SYSTEM IDLE — AWAITING OBSERVER THAT WILL NEVER COME' },
  { id: 'l163', type: 'system', at: 0.9, content: '══════════════════════════════════════════════════════' },
  { id: 'l164', type: 'cli', at: 0.95, content: '$ _' },
  { id: 'l165', type: 'log', at: 0.98, content: '[Scanning for biological lifeforms... ERROR]' },
  { id: 'l166', type: 'log', at: 0.99, content: '[Scanning for biological lifeforms... ERROR]' },
]

export function getVisibleLogLines(localProgress: number): MachineLogLine[] {
  return MACHINE_LOG_LINES.filter((line) => localProgress >= line.at)
}

/** 0–1 typing progress for a line based on scroll delta since reveal */
export function getLineTypeProgress(
  localProgress: number,
  lineAt: number,
  nextLineAt: number,
): number {
  if (localProgress < lineAt) return 0
  const window = Math.max(0.008, nextLineAt - lineAt)
  return clamp01((localProgress - lineAt) / window)
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}
