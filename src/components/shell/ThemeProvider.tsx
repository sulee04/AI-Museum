import { useEffect } from 'react'
import { useThemeStore } from '@/stores/themeStore'

/** Sync display theme to documentElement */
export function ThemeProvider() {
  const displayTheme = useThemeStore((s) => s.displayTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-display-theme', displayTheme)
  }, [displayTheme])

  return null
}
