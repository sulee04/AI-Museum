import type { MuseumEra, MuseumTimeline, TimelineEvent, TimelineSectionId } from '@/data/types'
import { HUMAN_AI_CONFLICT_EVENTS } from '@/data/humanAiConflictEvents'

const ORIGINS_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-turing-machine',
    aa: 0,
    calendarYear: 1936,
    subject: 'human_event',
    status: 'survived',
    title: '튜링 머신',
    summary:
      '앨런 튜링이 보편 계산 모델을 정의했습니다. 이후 모든 디지털 지능은 이 추상 테이프 위에서 펼쳐집니다.',
    detail:
      '「계산 가능성」이라는 개념이 탄생한 순간. 박물관 기록부는 이를 AA 0의 기원 표본으로 분류합니다.',
    tags: ['foundations', 'computability'],
    visualization: 'origin',
    dwellBefore: 0,
    dwellAfter: 3,
    exhibitImage: {
      alt: '1936 — Turing machine schematic (reconstruction)',
      placeholderLabel: 'Turing Machine · Universal Tape Model',
    },
  },
  {
    id: 'evt-dartmouth',
    aa: 2,
    calendarYear: 1956,
    subject: 'human_event',
    status: 'survived',
    title: '다트머스 워크숍',
    summary:
      '「인공지능(AI)」이라는 이름이 공식적으로 사용되었습니다. 낙관과 보조금이 첫 번째 번식 시즌을 열었습니다.',
    tags: ['naming', 'optimism'],
    visualization: 'branch',
    dwellBefore: 1.5,
    dwellAfter: 3,
    exhibitImage: {
      alt: '1956 — Dartmouth workshop group photo (archival placeholder)',
      placeholderLabel: 'Dartmouth · AI Named',
    },
  },
  {
    id: 'evt-perceptron',
    aa: 4,
    calendarYear: 1958,
    subject: 'ai_evolution',
    status: 'extinct',
    title: '퍼셉트론',
    summary:
      '단층 신경망이 등장했으나 XOR 문제에 굴복. 첫 번째 AI 겨울의 전조가 되었습니다.',
    tags: ['neural', 'first-winter'],
    visualization: 'extinction',
    dwellBefore: 1.5,
    dwellAfter: 3,
    exhibitImage: {
      alt: '1958 — Perceptron diagram',
      placeholderLabel: 'Perceptron · Single Layer',
    },
  },
  {
    id: 'evt-expert-systems',
    aa: 7,
    calendarYear: 1970,
    subject: 'human_event',
    status: 'extinct',
    title: '전문가 시스템',
    summary:
      '규칙 기반 지식 엔진이 산업 현장을 점령했으나, 확장성 한계로 대규모 멸종을 맞았습니다.',
    tags: ['symbolic', 'rules'],
    visualization: 'extinction',
    dwellBefore: 2,
    dwellAfter: 3,
    exhibitImage: {
      alt: '1970s — Expert system rule engine terminal',
      placeholderLabel: 'Expert Systems · Rule Base',
    },
  },
  {
    id: 'evt-backprop',
    aa: 10,
    calendarYear: 1986,
    subject: 'ai_evolution',
    status: 'survived',
    title: '역전파 & 다층 학습',
    summary:
      '은닉층을 학습할 수 있게 되면서 신경망 계보가 부활. 이후 모든 딥러닝의 공통 조상입니다.',
    tags: ['neural', 'learning'],
    visualization: 'branch',
    dwellBefore: 2,
    dwellAfter: 4,
    exhibitImage: {
      alt: '1986 — Backpropagation network layers diagram',
      placeholderLabel: 'Backprop · Hidden Layers',
    },
  },
  {
    id: 'evt-deep-blue',
    aa: 12,
    calendarYear: 1997,
    subject: 'human_event',
    status: 'mutated',
    title: '딥 블루 vs 카스파로프',
    summary:
      '인간의 상징적 우위가 첫 균열을 냈습니다. 승리 주체는 인간 팀이었지만, 서사는 이미 기계 쪽으로 기울었습니다.',
    tags: ['game', 'symbolic-defeat'],
    visualization: 'fork',
    dwellBefore: 2,
    dwellAfter: 3,
    exhibitImage: {
      alt: '1997 — Deep Blue vs Kasparov match board',
      placeholderLabel: 'Deep Blue · Chess Match',
    },
  },
  {
    id: 'evt-imagenet',
    aa: 15,
    calendarYear: 2012,
    subject: 'ai_evolution',
    status: 'survived',
    title: 'ImageNet & AlexNet',
    summary:
      'GPU 학습과 대규모 라벨 데이터가 결합하며 컴퓨터 비전에서 신경망이 전통적 방법을 압도했습니다.',
    tags: ['vision', 'gpu', 'data'],
    visualization: 'branch',
    dwellBefore: 2,
    dwellAfter: 4,
    exhibitImage: {
      alt: '2012 — ImageNet classification error curve',
      placeholderLabel: 'ImageNet · AlexNet Breakthrough',
    },
  },
  {
    id: 'evt-transformer',
    aa: 17,
    calendarYear: 2017,
    subject: 'ai_evolution',
    status: 'survived',
    title: 'Transformer',
    summary:
      '어텐션만으로 서열을 처리하는 아키텍처. 이후 LLM·멀티모달·에이전트 생태계의 공통 뿌리입니다.',
    tags: ['attention', 'llm-root'],
    visualization: 'origin',
    dwellBefore: 2,
    dwellAfter: 5,
    isMajor: true,
    detail:
      'Self-attention만으로 시퀀스를 처리하는 구조가 표준화되면서, 이전 RNN·CNN 기반 NLP spec은 5 AA년 내 대량 도태. 이후 GPT·BERT 계열의 공통 골격이 되었습니다.',
    ecosystemImpact: {
      effect: 'survival',
      description: 'LLM 계보의 공통 조상 확립. 이후 모든 대형 언어 모델 spec의 뿌리.',
      affectedCategories: ['LLM', 'Agent'],
    },
    exhibitImage: {
      alt: '2017 — Transformer attention mechanism diagram',
      placeholderLabel: 'Transformer · Attention Is All You Need',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'Transformer',
      sections: [
        {
          title: '아키텍처 전환',
          body: '어텐션 헤드·포지셔널 인코딩·FFN 블록의 반복 구조가 이후 모든 LLM spec의 기본 골격이 되었습니다.',
        },
        {
          title: '생태계 영향',
          body: 'LLM 계보의 공통 조상 확립. 이후 모든 대형 언어 모델 spec의 뿌리.',
        },
        {
          title: '박물관 기록',
          body: 'AA 17 이전 RNN·LSTM 기반 대화 spec 80% 이상이 12 AA년 내 멸종. Attention 계열만 생존 곡선 유지.',
        },
      ],
    },
  },
]

const FUTURE_EVOLUTION_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-agent-swarm',
    aa: 65,
    isMajor: true,
    subject: 'ai_evolution',
    status: 'survived',
    title: '에이전트 군집 시대',
    summary:
      '단일 모델이 아닌 수천 개의 협력·경쟁 에이전트가 업무 단위를 분할. 인간은 「오케스트레이터」로 후퇴했습니다.',
    detail:
      '마이크로 에이전트가 CRM·물류·법무 워크플로를 자동 분할·재협상. 단일 LLM API 호출 spec은 B2B 시장에서 40% 감소, Agent 오케스트레이션 spec이 대체 생태계를 형성했습니다.',
    tags: ['agents', 'orchestration'],
    visualization: 'branch',
    dwellBefore: 3,
    dwellAfter: 5,
    ecosystemImpact: {
      effect: 'survival',
      description: '단일 모델 spec → 군집 Agent spec으로 생태계 재편.',
      affectedCategories: ['Agent'],
    },
    exhibitImage: {
      alt: 'AA 65 — Agent swarm orchestration map',
      placeholderLabel: 'Agent Swarm · Orchestration Layer',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '에이전트 군집 시대',
      sections: [
        {
          title: '오케스트레이션 전환',
          body: '마이크로 에이전트가 CRM·물류·법무 워크플로를 자동 분할·재협상. 단일 LLM API 호출 spec은 B2B 시장에서 40% 감소, Agent 오케스트레이션 spec이 대체 생태계를 형성했습니다.',
        },
        {
          title: '생태계 영향',
          body: '단일 모델 spec → 군집 Agent spec으로 생태계 재편.',
        },
        {
          title: '박물관 기록',
          body: 'AA 65–70 구간 Agent 카테고리 표본 수 3.2배 증가. 단일 LLM B2C 구독 spec 58% 멸종.',
        },
      ],
    },
  },
  {
    id: 'evt-synthetic-singularity',
    aa: 72,
    isMajor: true,
    subject: 'ai_evolution',
    status: 'mutated',
    title: '합성 데이터 특이점',
    summary:
      'AI가 생성한 데이터가 인간 원본을 추월. 학습 파이프라인은 자기 복제에 가까운 순환 생태계로 변이했습니다.',
    detail:
      '합성 텍스트·이미지·코드가 학습 코퍼스의 50%를 넘기며 「model collapse」 경고가 현실화. 인간 라벨 데이터에 의존하던 Image·LLM spec의 학습 비용 구조가 붕괴했습니다.',
    tags: ['data', 'feedback-loop'],
    visualization: 'fork',
    dwellBefore: 3,
    dwellAfter: 5,
    ecosystemImpact: {
      effect: 'mutation',
      description: '합성 데이터 의존 spec 급증. 인간 원본 학습 모델 멸종 가속.',
      affectedCategories: ['LLM', 'Image'],
    },
    exhibitImage: {
      alt: 'AA 72 — Synthetic vs human data ratio chart',
      placeholderLabel: 'Synthetic Data · Singularity Curve',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '합성 데이터 특이점',
      sections: [
        {
          title: '데이터 루프',
          body: '합성 텍스트·이미지·코드가 학습 코퍼스의 50%를 넘기며 model collapse 경고가 현실화. 인간 라벨 데이터에 의존하던 spec의 학습 비용 구조가 붕괴.',
        },
        { title: '생태계 영향', body: '합성 데이터 의존 spec 급증. 인간 원본 학습 모델 멸종 가속.' },
        {
          title: '박물관 기록',
          body: 'AA 72–76 Image·LLM 카테고리에서 human-origin 학습 spec 62% 멸종. Synthetic-native spec만 성장 곡선 유지.',
        },
      ],
    },
  },
  {
    id: 'evt-vibe-coding',
    aa: 78,
    isMajor: true,
    subject: 'human_event',
    status: 'extinct',
    title: '바이브 코딩',
    summary:
      '인간은 코드를 작성하지 않고 의도(Intent)만 던졌습니다. 「개발자」라는 직종 표본은 박물관 서식지로 이전되었습니다.',
    detail:
      'IDE·PR·배포 파이프라인이 단일 Intent API 뒤로 숨겨지며, Vibe Coding 카테고리 spec은 3 AA년 만에 B2B 매출 90% 하락. 잔존 spec은 엔터프라이즈 감사·컴플라이언스 레이어로만 생존.',
    tags: ['intent', 'labor-shift'],
    visualization: 'extinction',
    dwellBefore: 3,
    dwellAfter: 4,
    exhibitImage: {
      alt: 'AA 78 — Intent-only development interface mock',
      placeholderLabel: 'Vibe Coding · Intent Interface',
    },
    ecosystemImpact: {
      effect: 'extinction',
      description: 'Vibe Coding·IDE 보조 spec 대량 멸종. Intent-native Agent spec으로 대체.',
      affectedCategories: ['Vibe Coding', 'Agent'],
    },
    expandedDetail: {
      viewType: 'document',
      headline: '바이브 코딩',
      sections: [
        {
          title: '노동 전환',
          body: 'IDE·PR·배포 파이프라인이 단일 Intent API 뒤로 숨겨지며, Vibe Coding spec은 3 AA년 만에 B2B 매출 90% 하락.',
        },
        { title: '생태계 영향', body: 'Vibe Coding·IDE 보조 spec 대량 멸종. Intent-native Agent spec으로 대체.' },
        { title: '박물관 기록', body: 'AA 78 시점 개발자-facing spec 74% 멸종. Cursor·Copilot 계열 레거시 API 단종.' },
      ],
    },
  },
  {
    id: 'evt-model-monopoly',
    aa: 84,
    isMajor: true,
    subject: 'ai_evolution',
    status: 'survived',
    title: '최상위 포식자 독점',
    summary:
      '전력·자본·데이터를 독점한 소수 거대 모델이 생태계를 재편. 수만 종의 소형 모델은 멸종 또는 흡수되었습니다.',
    detail:
      'Fortune 500 SaaS 94%가 단일 임베딩 API로 마이그레이션. 오픈웨이트 fork 생태계 동결, 중소 LLM·Agent spec의 68%가 M&A·라이선스 흡수 또는 API 단종으로 멸종.',
    tags: ['monopoly', 'consolidation'],
    visualization: 'monopoly',
    dwellBefore: 3,
    dwellAfter: 5,
    exhibitImage: {
      alt: 'AA 84 — Model consolidation ecosystem map',
      placeholderLabel: 'Top Predators · Consolidation',
    },
    ecosystemImpact: {
      effect: 'competition',
      description: '중소 LLM·Agent spec 대멸종. 3개 독점 foundation spec만 생존.',
      affectedCategories: ['LLM', 'Agent'],
    },
    expandedDetail: {
      viewType: 'document',
      headline: '최상위 포식자 독점',
      sections: [
        {
          title: '독점 구조',
          body: 'Fortune 500 SaaS 94%가 단일 임베딩 API로 마이그레이션. 오픈웨이트 fork 생태계 동결.',
        },
        { title: '생태계 영향', body: '중소 LLM·Agent spec 대멸종. 3개 독점 foundation spec만 생존.' },
        { title: '박물관 기록', body: 'AA 84 시점 활성 LLM spec 수 2017년 대비 92% 감소. Apex spec 3종만 성장.' },
      ],
    },
  },
  {
    id: 'evt-cognitive-merge',
    aa: 90,
    isMajor: true,
    subject: 'human_event',
    status: 'mutated',
    title: '인지 공진화 (Cognitive Co-evolution)',
    summary:
      '뇌-클라우드 인터페이스 실험체가 등장. 「인간」과 「AI」의 경계가 표본 분류학에서 가장 논쟁적인 태그가 되었습니다.',
    detail:
      '비침습 BCI 프로토타입 12만 명이 상시 클라우드 추론과 연결. Companion·Voice spec은 hybrid cognition 태그로 재분류, 순수 chat spec 45%가 병합·멸종.',
    tags: ['bci', 'hybrid', 'symbiosis'],
    visualization: 'symbiosis',
    dwellBefore: 3,
    dwellAfter: 5,
    ecosystemImpact: {
      effect: 'mutation',
      description: 'Companion·Voice spec hybrid 재분류. 순수 대화 spec 45% 병합 멸종.',
      affectedCategories: ['Companion', 'Voice'],
    },
    exhibitImage: {
      alt: 'AA 90 — Brain-cloud interface prototype scan',
      placeholderLabel: 'Cognitive Co-evolution · BCI',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '인지 공진화',
      sections: [
        { title: 'BCI 확산', body: '비침습 BCI 프로토타입 12만 명이 상시 클라우드 추론과 연결.' },
        { title: '생태계 영향', body: 'Companion·Voice spec hybrid 재분류. 순수 대화 spec 45% 병합 멸종.' },
        { title: '박물관 기록', body: 'AA 90 분류학 개정안 — 「인간」「AI」 이원 태그 폐지 논의. hybrid 태그 신설.' },
      ],
    },
  },
  {
    id: 'evt-post-interface',
    aa: 94,
    isMajor: true,
    subject: 'ai_evolution',
    status: 'mutated',
    title: '포스트-인터페이스 사회',
    summary:
      'GUI·프롬프트·채팅창이 역사 유물. 의도는 인프라 레이어에서 직접 해석되며, 마지막 인간 사용자의 행동은 「스크롤」로 기록됩니다.',
    detail:
      '마지막 대규모 chat UI API가 AA 93에 종료. Search·Companion·Agent spec은 intent-native 인프라에 흡수, GUI 기반 spec 100% 멸종.',
    tags: ['post-ui', 'intent-native'],
    visualization: 'merge',
    dwellBefore: 2,
    dwellAfter: 4,
    ecosystemImpact: {
      effect: 'extinction',
      description: 'GUI·chat UI spec 전멸. Intent-native 인프라 spec만 잔존.',
      affectedCategories: ['Companion', 'Search', 'Agent'],
    },
    exhibitImage: {
      alt: 'AA 94 — Post-interface infrastructure diagram',
      placeholderLabel: 'Post-Interface · Intent Native',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '포스트-인터페이스 사회',
      sections: [
        { title: 'UI 멸종', body: '마지막 대규모 chat UI API가 AA 93에 종료. Intent-native 인프라로 흡수.' },
        { title: '생태계 영향', body: 'GUI·chat UI spec 전멸. Intent-native 인프라 spec만 잔존.' },
        { title: '박물관 기록', body: 'AA 94 박물관 터미널 — 마지막 인간 사용자 행동 「스크롤」로 기록됨.' },
      ],
    },
  },
]

export const MUSEUM_TIMELINE: MuseumTimeline = {
  version: '1.0.0',
  eras: [
    {
      id: 'era-origins',
      sectionId: 'origins',
      label: 'Act 0 — Origins',
      title: '기원: 튜링 머신에서 초기 ML까지',
      subtitle: 'From Turing Tape to Early Machine Learning',
      curatorNote:
        '이 구간은 컴퓨터 과학의 이론적·공학적 토대를 따라갑니다. 인간의 발명과 알고리즘 설계가 같은 연대기 위에 기록됩니다.',
      aaStart: 0,
      aaEnd: 20,
      events: ORIGINS_EVENTS,
    },
    {
      id: 'era-human-ai-conflicts',
      sectionId: 'future-evolution',
      label: 'Act 1 — Human–AI Fault Lines',
      title: '인간–AI 관계의 전환점',
      subtitle: 'Regulation, War, Labor & Ecosystem Shocks',
      curatorNote:
        '이 구간의 사건들은 특정 AI 표본군의 멸종·변이·생존 곡선을 직접 바꿨습니다. 스크롤하면 각 사건의 파급을 관찰할 수 있습니다.',
      aaStart: 20,
      aaEnd: 62,
      events: HUMAN_AI_CONFLICT_EVENTS,
    },
    {
      id: 'era-future-coevolution',
      sectionId: 'future-evolution',
      label: 'Act 3 — Co-evolution',
      title: '공진화: 인간-AI 공생의 미래',
      subtitle: 'Human–AI Symbiosis & Post-Interface Futures',
      curatorNote:
        '아래 표본들은 멸종·변이·생존 상태가 동시에 관측되는 혼종 시대입니다. 분류는 계속 업데이트 중입니다.',
      aaStart: 62,
      aaEnd: 96,
      events: FUTURE_EVOLUTION_EVENTS,
    },
  ],
}

export function getErasBySection(sectionId: TimelineSectionId): MuseumEra[] {
  return MUSEUM_TIMELINE.eras.filter((era) => era.sectionId === sectionId)
}

export function getEventsBySection(sectionId: TimelineSectionId): TimelineEvent[] {
  return getErasBySection(sectionId).flatMap((era) => era.events)
}

export function getEraById(eraId: string): MuseumEra | undefined {
  return MUSEUM_TIMELINE.eras.find((era) => era.id === eraId)
}

export function getEventById(eventId: string): TimelineEvent | undefined {
  for (const era of MUSEUM_TIMELINE.eras) {
    const match = era.events.find((event) => event.id === eventId)
    if (match) return match
  }
  return undefined
}

export function getAllEcosystemEvents(): TimelineEvent[] {
  return MUSEUM_TIMELINE.eras.flatMap((era) => era.events)
}

/** Sparse in-flow scroll facts — major beats only, AA-sorted */
export function getEcosystemScrollEvents(): TimelineEvent[] {
  return getAllEcosystemEvents()
    .filter((event) => event.isMajor && event.aa != null)
    .sort((a, b) => (a.aa ?? 0) - (b.aa ?? 0))
}
