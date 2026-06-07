/** Scroll-track spacer — visible title lives in fixed MuseumHeroTitle */
export function HeroIntro() {
  return (
    <div
      data-scroll="hero"
      className="pointer-events-none absolute left-0 w-full"
      style={{ top: 0, height: '100vh' }}
      aria-hidden
    />
  )
}
