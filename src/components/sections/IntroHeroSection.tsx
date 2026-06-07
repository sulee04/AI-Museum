import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'
import { PROLOGUE_AD_MIN } from '@/constants/prologue'

/** Minimal opener — no museum title (title appears at gate between prologue & ecosystem) */
export function IntroHeroSection() {
  return (
    <section
      id="museum-hero"
      data-section="hero"
      className="section-pad layer-content flex min-h-screen w-full items-center justify-center text-center"
    >
      <div className="content-max max-w-lg">
        <SectionLabel>Pre-AI Chronicle</SectionLabel>
        <Typography variant="display" as="h1" className="mt-6 text-balance text-[var(--color-prologue-text)]">
          컴퓨팅의 기원
        </Typography>
        <Typography variant="body" as="p" className="mt-5 text-[var(--color-prologue-muted)]">
          스크롤하면 시간이 흐릅니다.
          <br />
          AD {PROLOGUE_AD_MIN}년부터 역사가 시작됩니다.
        </Typography>
        <Typography
          variant="monoDim"
          as="p"
          className="mt-14 tracking-[0.28em] uppercase text-[var(--color-prologue-dim)]"
        >
          Scroll to begin ↓
        </Typography>
      </div>
    </section>
  )
}
