import { cn } from '@/lib/utils'
import { useThemeStore, type DisplayTheme } from '@/stores/themeStore'

const THEMES: { id: DisplayTheme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'default', label: 'Default' },
  { id: 'dark', label: 'Dark' },
]

/** Top-left theme switcher — LD1-inspired */
export function MuseumThemeSwitcher() {
  const displayTheme = useThemeStore((s) => s.displayTheme)
  const setDisplayTheme = useThemeStore((s) => s.setDisplayTheme)

  return (
    <div className="museum-theme-switch" role="group" aria-label="Display theme">
      {THEMES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-pressed={displayTheme === id}
          onClick={() => setDisplayTheme(id)}
          className={cn(
            'museum-theme-switch__btn',
            displayTheme === id && 'museum-theme-switch__btn--active',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
