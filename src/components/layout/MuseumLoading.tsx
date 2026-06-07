export function MuseumLoading() {
  return (
    <div
      className="layer-content flex min-h-screen flex-col items-center justify-center gap-4 px-[var(--space-gutter)]"
      role="status"
      aria-live="polite"
      aria-label="Loading exhibition"
    >
      <div className="h-px w-16 bg-[var(--color-biolum)]/60" aria-hidden />
      <p className="text-label text-[var(--color-muted)]">Loading exhibition…</p>
    </div>
  )
}
