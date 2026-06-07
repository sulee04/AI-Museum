import { useTitleGateHandoff } from '@/hooks/useTitleGateHandoff'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Typography } from '@/components/ui/Typography'
import { AA_EPOCH } from '@/lib/aaTimeline'

function PrologueGateContent() {
  return (
    <div className="flex w-full flex-col items-center">
      <SectionLabel>{`After AI — AA ${AA_EPOCH.min}`}</SectionLabel>
      <Typography
        variant="displayHero"
        as="h1"
        className="museum-title-gate__title mt-8 text-balance"
      >
        AI 자연사 박물관
      </Typography>
      <Typography
        variant="bodyLg"
        as="p"
        className="museum-title-gate__subtitle mt-5 italic"
      >
        Museum of Artificial Natural History
      </Typography>
      <Typography variant="body" as="p" className="mt-8 max-w-lg text-[var(--color-muted)]">
        AD 연대기가 끝납니다. 아래로 내려가면 After AI 타임라인(AA)이 시작됩니다.
      </Typography>
    </div>
  )
}

function EcosystemGateContent() {
  return (
    <div className="flex w-full flex-col items-center">
      <SectionLabel>Ecosystem Entry</SectionLabel>
      <Typography variant="display" as="p" className="mt-6 text-[var(--color-biolum)]">
        AA {AA_EPOCH.min} — 생태계 관측 개시
      </Typography>
      <Typography variant="body" as="p" className="mt-4 max-w-md text-[var(--color-muted)]">
        AI 표본의 등장과 소멸을 추적합니다. 스크롤하면 시간(AA)이 흐르고,
        주요 사건이 생태계를 재편합니다.
      </Typography>
      <Typography variant="monoDim" as="p" className="mt-10 tracking-[0.24em] uppercase">
        Descend into the ecosystem ↓
      </Typography>
    </div>
  )
}

/** Title gate — museum name then AA entry, both in normal document scroll (no sticky swap) */
export function MuseumTitleGateSection() {
  useTitleGateHandoff()

  return (
    <section
      id="museum-title-gate"
      data-section="title-gate"
      className="museum-title-gate layer-content relative w-full"
    >
      <div className="flex min-h-[100dvh] w-full items-center justify-center px-[var(--space-gutter)] text-center">
        <div className="content-max max-w-3xl">
          <PrologueGateContent />
        </div>
      </div>

      <div className="flex min-h-[100dvh] w-full items-center justify-center px-[var(--space-gutter)] pb-16 text-center">
        <div className="content-max max-w-3xl">
          <EcosystemGateContent />
        </div>
      </div>
    </section>
  )
}
