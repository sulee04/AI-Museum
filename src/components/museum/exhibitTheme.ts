/** Shared exhibit layout themes — prologue (plain) vs ecosystem (AI dramatic) */
export type ExhibitTheme = 'prologue' | 'ecosystem'

export const EXHIBIT_THEME_CLASS: Record<ExhibitTheme, string> = {
  prologue: 'exhibit-theme-prologue',
  ecosystem: 'exhibit-theme-ecosystem',
}

export const CHRONOLOGY_THEME_CLASS: Record<ExhibitTheme, string> = {
  prologue: 'chronology-theme-prologue',
  ecosystem: 'chronology-theme-ecosystem',
}
