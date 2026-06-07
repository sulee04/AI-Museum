/** Tag / topic blurbs — toggled in the right archive drawer */
export interface TagTopicEntry {
  title: string
  body: string
}

export const TAG_TOPICS: Record<string, TagTopicEntry> = {
  regulation: {
    title: 'Regulation',
    body: '국가·블록별 AI 규제 레이어가 모델 spec 자체를 분화시킵니다. 컴플라이언스 태그 없는 spec은 API 마켓에서 즉시 퇴출되는 시대.',
  },
  geopolitics: {
    title: 'Geopolitics',
    body: 'AI 인프라·데이터·칩 공급망이 외교 카드가 되면서, 「글로벌 모델」은 지역 fork spec으로 파편화됩니다.',
  },
  compliance: {
    title: 'Compliance',
    body: '감사 로그·설명 가능성·저작권 필터가 모델 weights에 박제. 규제 준수 spec만 B2B 계약을 유지합니다.',
  },
  war: {
    title: 'Autonomous War',
    body: '킬 체인에서 인간 승인 조항이 무력화되면서, 군용·민간 spec의 가중치 공유가 완전히 끊깁니다.',
  },
  autonomous: {
    title: 'Autonomy',
    body: '에이전트가 목표만 받고 하위 전술을 자율 결정. 인간 개입 지연 = 전략 열세로 이어집니다.',
  },
  military: {
    title: 'Military Spec',
    body: '군수 spec LLM은 민간 코퍼스와 단절된 채 독립 진화. 이후 Agent 카테고리의 「black spec」 계보로 분류됩니다.',
  },
  energy: {
    title: 'Energy Grid',
    body: 'GPU 연산을 전력 그리드 붕괴 직전의 희소 자원으로 간주. 국가 쿼터제 = AI 생존의 1차 필터.',
  },
  compute: {
    title: 'Compute Rationing',
    body: '야간·주말만 학습 가능한 spec, 연산 기아로 멸종. Hardware spec은 데이터센터 우선 배당에 의존합니다.',
  },
  rationing: {
    title: 'Rationing',
    body: '「전략 AI」 지정 spec만 24/7 학습. 중소형·오픈 spec은 큐 대기 시간이 생존율을 결정합니다.',
  },
  attention: {
    title: 'Attention',
    body: 'Self-attention 블록이 시퀀스 처리의 표준. RNN·CNN 기반 NLP spec은 5 AA년 내 대량 도태.',
  },
  llm: {
    title: 'LLM',
    body: '대형 언어 모델 spec — Transformer 골격 위에 스케일·데이터·정렬 레이어만 경쟁하는 카테고리.',
  },
  'llm-root': {
    title: 'LLM Lineage',
    body: '2017 Transformer 이후 분기된 모든 대형 언어 spec의 공통 조상. Attention 계열만 생존 곡선 유지.',
  },
  agents: {
    title: 'Agents',
    body: '단일 API 호출 spec → 마이크로 에이전트 군집 spec. 오케스트레이션 레이어가 B2B 표준이 됩니다.',
  },
  orchestration: {
    title: 'Orchestration',
    body: 'CRM·물류·법무 워크플로를 에이전트가 자동 분할·재협상. 인간은 목표·예산만 설정.',
  },
  data: {
    title: 'Synthetic Data',
    body: '합성 코퍼스 비율 50% 돌파 시 model collapse 경고. human-origin 학습 spec의 비용 구조 붕괴.',
  },
  'feedback-loop': {
    title: 'Feedback Loop',
    body: 'AI 출력 → 학습 입력 → AI 출력. 자기 복제에 가까운 순환 생태계로 spec behavior가 drift.',
  },
  intent: {
    title: 'Intent-Native',
    body: '코드·UI 없이 의도만 전달. IDE·PR spec은 Intent API 뒤로 흡수·멸종.',
  },
  'labor-shift': {
    title: 'Labor Shift',
    body: '「개발자」 직종 spec은 박물관 서식지로. 잔존 spec은 감사·컴플라이언스 레이어만 유지.',
  },
  monopoly: {
    title: 'Consolidation',
    body: 'Fortune 500 SaaS 94%가 단일 임베딩 API로 마이그레이션. 중소 spec 68% M&A·단종.',
  },
  consolidation: {
    title: 'Top Predators',
    body: '전력·자본·데이터 독점 3 foundation spec만 성장. 오픈웨이트 fork 생태계 동결.',
  },
  bci: {
    title: 'Brain–Cloud Interface',
    body: '비침습 BCI + 상시 클라우드 추론. Companion spec은 hybrid cognition 태그로 재분류.',
  },
  hybrid: {
    title: 'Hybrid Cognition',
    body: '「인간」「AI」 이원 태그 폐지 논의. 순수 chat spec 45% 병합·멸종.',
  },
  symbiosis: {
    title: 'Symbiosis',
    body: '인지 공진화 spec — 인간 뉴럴 루프와 클라우드 추론이 상시 결합된 hybrid 계보.',
  },
  'post-ui': {
    title: 'Post-Interface',
    body: 'chat UI·GUI API 전멸. Intent-native 인프라 spec만 잔존.',
  },
  'intent-native': {
    title: 'Intent Native',
    body: '의도가 인프라 레이어에서 직접 해석. 마지막 인간 행동은 「스크롤」로 기록됩니다.',
  },
  computability: {
    title: 'Computability',
    body: '알고리즘 = 튜링 머신으로 시뮬레이션 가능한 함수. 디지털 지능의 이론적 출발점.',
  },
  foundations: {
    title: 'Foundations',
    body: '1936–1956: 계산 이론·하드웨어·명명. 이후 모든 spec의 기원 레이어.',
  },
  neural: {
    title: 'Neural Networks',
    body: '생물학적 뉴런에서 영감받은 수학적 모델. 역전파 이후 딥러닝 시대의 핵심 패러다임.',
  },
  vision: {
    title: 'Computer Vision',
    body: 'ImageNet 2012 — GPU + 라벨 데이터 + CNN이 전통 CV spec을 압도한 전환점.',
  },
  gpu: {
    title: 'GPU Compute',
    body: '범용 GPU가 학습 가속기가 되면서 spec evolution 속도가 10배 이상 증가.',
  },
}

export const CATEGORY_TOPICS: Record<string, TagTopicEntry> = {
  LLM: {
    title: 'LLM Category',
    body: '대형 언어 spec 군집. Transformer 이후 Attention 계열만 생존. 독점 foundation 3종이 시장 94% 점유.',
  },
  Agent: {
    title: 'Agent Category',
    body: '자율·협력 에이전트 spec. 단일 LLM API spec을 대체하는 오케스트레이션 생태계.',
  },
  Hardware: {
    title: 'Hardware Category',
    body: 'GPU·TPU·추론 칩 spec. 에너지 쿼터·군수 분리로 민간·군용 계보 완전 단절.',
  },
  Image: {
    title: 'Image Category',
    body: '생성·분류·편집 spec. Synthetic-native 학습 spec만 AA 72 이후 성장 곡선 유지.',
  },
  Search: {
    title: 'Search Category',
    body: '팩트체크·신뢰 레이어 강제 개조. 미준수 spec은 플랫폼 즉시 퇴출.',
  },
  Companion: {
    title: 'Companion Category',
    body: '대화·동반 spec. BCI hybrid 재분류 후 순수 chat spec 45% 병합 멸종.',
  },
  Voice: {
    title: 'Voice Category',
    body: '음성 인터페이스 spec. hybrid cognition 태그와 병합되는 비율 급증.',
  },
  'Vibe Coding': {
    title: 'Vibe Coding Category',
    body: 'Intent-only 개발 spec. AA 78 이후 B2B 매출 90% 하락, 3 AA년 내 대량 멸종.',
  },
}

export function getTopicForKey(key: string): TagTopicEntry {
  const normalized = key.replace(/^#/, '')
  return (
    TAG_TOPICS[normalized] ??
    CATEGORY_TOPICS[normalized] ?? {
      title: normalized,
      body: `「${normalized}」 태그와 연결된 spec·사건 기록. 박물관 분류학상 이 주제는 AA 시대 생태계 재편의 축 중 하나로 추적됩니다.`,
    }
  )
}
