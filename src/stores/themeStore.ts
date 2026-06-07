import { create } from 'zustand'

export type DisplayTheme = 'light' | 'default' | 'dark'

const STORAGE_KEY = 'museum-display-theme'

function readStoredTheme(): DisplayTheme {
  if (typeof window === 'undefined') return 'default'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'default' || stored === 'dark') return stored
  return 'default'
}

interface ThemeStore {
  displayTheme: DisplayTheme
  setDisplayTheme: (theme: DisplayTheme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  displayTheme: readStoredTheme(),
  setDisplayTheme: (theme) => {
    window.localStorage.setItem(STORAGE_KEY, theme)
    set({ displayTheme: theme })
  },
}))
