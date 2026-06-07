import type {
  SpecimenCategory,
  SpecimenData,
  SpecimenIconType,
} from '@/content/specimens.data'
import { SPECIMEN_CATEGORY_COLORS } from '@/content/specimens.colors'

function clusterColorFor(category: SpecimenCategory): string {
  return SPECIMEN_CATEGORY_COLORS[category]
}

type LifespanCluster = 'A' | 'B' | 'C'

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rng: () => number, items: T[]): T {
  return items[Math.floor(rng() * items.length)]!
}

function intRange(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

const CATEGORY_ICONS: Record<SpecimenCategory, SpecimenIconType[]> = {
  LLM: ['spark', 'brain', 'fire', 'eye'],
  Agent: ['chain', 'bot', 'scale', 'code'],
  Companion: ['heart', 'smile', 'ghost'],
  'Vibe Coding': ['code', 'bot'],
  Gaming: ['meme', 'ghost', 'star'],
  Image: ['droplet', 'star', 'eye'],
  Voice: ['wave', 'smile'],
  Search: ['eye', 'brain'],
  Hardware: ['lock', 'warning', 'bot'],
}

const CHAT_BY_CATEGORY: Record<SpecimenCategory, string[][]> = {
  LLM: [
    [
      '[User] "거래처에 보낼 사과 이메일 좀 정중하게 다듬어 줘."',
      '[Agent] "네, 수정된 버전입니다: \'담당자님, 이번 이슈로 불편을 드려...\'"',
      '[User] "톤 좋다. 보낼게."',
    ],
    [
      '[User] "이 주간 회의록 세 줄로 요약해 줘."',
      '[Agent] "1) Q3 목표 92% 2) 베타 일정 확정 3) 다음 주 데모"',
      '[User] "슬랙에 붙일게."',
    ],
    [
      '[User] "면접 예상 질문 답변 초안 좀."',
      '[Agent] "STAR 형식 5문항 작성했습니다."',
      '[User] "연습해 볼게."',
    ],
  ],
  Agent: [
    [
      '[User] "내일 서울 날씨 확인하고 비 오면 우산 리마인더 걸어 줘."',
      '[Agent] "강수확률 70%. 오전 8시 알림 설정했습니다."',
      '[User] "굿."',
    ],
    [
      '[User] "AWS 비용 지난달 대비 어디서 늘었는지."',
      '[Agent] "EC2 +23%, S3 +8%. breakdown 첨부."',
      '[User] "공유할게."',
    ],
    [
      '[User] "이번 주 출고 지연 건 원인만."',
      '[Agent] "창고 B 재고 mismatch, 23 SKU."',
      '[User] "운영팀에 전달."',
    ],
  ],
  Companion: [
    [
      '[User] "오늘 진짜 너무 피곤한 하루였어..."',
      '[Agent] "정말 고생 많으셨어요. 따뜻한 물로 샤워하고 푹 쉬는 건 어떨까요?"',
      '[User] "그럴게."',
    ],
    [
      '[User] "점심 뭐 먹을지 추천해 줘."',
      '[Agent] "가벼운 날이면 비빔면, 따뜻한 국물 원하면 설렁탕도 좋아요."',
      '[User] "비빔면으로."',
    ],
    [
      '[User] "요즘 잠을 잘 못 자."',
      '[Agent] "취침 전 스크린 시간을 줄여 보시는 건 어떨까요?"',
      '[User] "해볼게."',
    ],
  ],
  'Vibe Coding': [
    [
      '[User] "스크롤 내리면 버튼이 서서히 커지게 수정해."',
      '[Agent] "GSAP 모션 적용 후 빌드 완료. 로컬 서버에서 확인해 보세요."',
      '[User] "딱 원한 대로야."',
    ],
    [
      '[User] "이 함수 타입 에러 원인만 짚어 줘."',
      '[Agent] "return 타입이 Promise인데 await 없이 반환하고 있습니다."',
      '[User] "아 맞네."',
    ],
    [
      '[User] "다크모드 토글 컴포넌트 추가해."',
      '[Agent] "ThemeProvider 연동 후 PR 올렸습니다."',
      '[User] "머지할게."',
    ],
  ],
  Gaming: [
    [
      '[User] "상인 NPC 대사 좀 더 친근하게, 3줄."',
      '[Agent] "\'어서 오게! 오늘 들어온 물건은 특별히 좋네.\'"',
      '[User] "빌드에 넣을게."',
    ],
    [
      '[User] "보스 패턴 힌트만 짧게."',
      '[Agent] "2페이즈: 원거리 광역 후 이동기. 피격 3회마다 스턴."',
      '[User] "고마워."',
    ],
    [
      '[User] "이 밈 템플릿에 팀 로고 합성해 줘."',
      '[Agent] "캡션 레이아웃 맞춰 출력했습니다."',
      '[User] "디스코드에 올릴게."',
    ],
  ],
  Image: [
    [
      '[User] "사이버펑크 스타일의 고양이 그려줘, 16:9 비율로."',
      '[Agent] "요청하신 프롬프트로 4장의 이미지를 생성했습니다."',
      '[User] "1번 저장."',
    ],
    [
      '[User] "제품 썸네일 배경만 흰색으로 바꿔 줘."',
      '[Agent] "배경 제거 후 1200×1200 PNG export 완료."',
      '[User] "쇼핑몰에 올릴게."',
    ],
    [
      '[User] "비 오는 거리 5초 클립."',
      '[Agent] "1080p 영상 생성 완료. 다운로드 링크입니다."',
      '[User] "물빠짐 좋다."',
    ],
  ],
  Voice: [
    [
      '[User] "내일 아침 7시에 알람 맞춰 줘."',
      '[Agent] "알람이 설정되었습니다. 내일 오전 7시입니다."',
      '[User] "고마워."',
    ],
    [
      '[User] "거실 불 꺼."',
      '[Agent] "거실 조명을 끕니다."',
      '[User] "잘 자."',
    ],
    [
      '[User] "회의 녹음본 요약이랑 할 일만 뽑아 줘."',
      '[Agent] "action items 5개 정리했습니다."',
      '[User] "노션에 복사."',
    ],
  ],
  Search: [
    [
      '[User] "2030년 전기차 충전소 현황 통계 찾아 줘."',
      '[Agent] "환경부 보도자료(2029) 기준 공용 충전소 38,412기 [1]."',
      '[User] "출처까지—좋아."',
    ],
    [
      '[User] "이 논문과 반박 논문 비교."',
      '[Agent] "핵심 주장 3쌍, 방법론 차이 표로 정리."',
      '[User] "리뷰에 쓸게."',
    ],
    [
      '[User] "맥북 M3 vs M4 배터리 실사용 후기."',
      '[Agent] "신뢰도 높은 리뷰 6건 요약. 평균 14% 차이."',
      '[User] "고마워."',
    ],
  ],
  Hardware: [
    [
      '[User] "지금 위치 근처 일본식 라멘집."',
      '[Agent] "500m 내 \'멘야카츠\' 평점 4.3, 영업 중."',
      '[User] "길 안내 켜 줘."',
    ],
    [
      '[User] "오프라인에서도 번역 되나?"',
      '[Agent] "로컬 모델 로드됨. 12개 언어 지원."',
      '[User] "비행기에서 써볼게."',
    ],
    [
      '[User] "배터리 15%인데 절전 모드 켜 줘."',
      '[Agent] "절전 모드 활성화. 밝기 40%로 조정."',
      '[User] "오케이."',
    ],
  ],
}

const CLUSTER_A_NAMES = [
  'MemeBot_7742', 'FlashAgent_v0.3', 'TrendPulse', 'ViralHook AI', 'HypeCycle_Bot',
  'SecurityFail_0x1', 'SeedRound_Dead', 'DemoDay_Ghost', 'ForkStorm_99', 'ClipFarm AI',
  'TikTokScript_v1', 'KarmaFarm Bot', 'BuzzWord LLM', 'PivotBot Alpha', 'SnackChat AI',
  'HotTake_Bot', 'VaporWare_v2', 'LaunchHype AI', 'BurnRate Agent', 'OneHitWonder LLM',
]

const CLUSTER_B_NAMES = [
  'RegionalLaw_KR', 'FactoryLine_Optimizer', 'VibeCoder_v2', 'ClinicScheduler AI',
  'EduTutor_Regional', 'FleetRoute_AI', 'HRTech_Onboard', 'RetailShelf Agent',
  'LegalDraft_JP', 'WarehousePick Bot', 'InsuranceQuote AI', 'HotelConcierge_v4',
  'AgriYield Predictor', 'PortLogistics AI', 'BankKYC Assistant', 'MediaSubtitler',
  'RealEstate_Match', 'DentalChart AI', 'PharmaLabel Bot', 'UtilityBill Parser',
]

const CLUSTER_C_NAMES = [
  'Omni-OS Agent', 'Global Infrastructure Curator', 'Apex_Model_v9', 'GridMaster_Zero',
  'Continuum_LLM', 'Sovereign Stack', 'Atlas Daemon', 'Nexus Core', 'PrimeRouter AI', 'Epoch Keeper',
]

const CLUSTER_A_CAUSES = [
  '트래픽 대비 막대한 GPU 서버 유지비를 감당하지 못하고 시리즈C 투자 유치에 실패하여 셧다운됨.',
  '출시 72시간 만에 바이럴 붐이 식었고, ARPU $0.02로 광고·추론비용 회수 불가. 운영팀 3명 해고 후 서비스 종료.',
  'CVE 원격 코드 실행 취약점 공개 직후 API 키 12만 건 유출. 긴급 패치 실패로 전량 폐기 및 영구 중단.',
  'TikTok·Instagram 알고리즘 변경으로 밈 템플릿 노출 98% 감소. MAU 14일 만에 200만→4만으로 붕괴.',
  'OpenAI·Google 무료 티어 출시로 유료 구독 전환율 0.3% 미만. 시드 투자금 소진 후 법정관리.',
  '학습 데이터 무단 크롤링에 대한 집단 저작권 소송에서 패소하여 서비스 강제 중단 및 모델 가중치 폐기.',
  '데모데이 직후 Product Hunt 1위 → 실제 유료 전환 0건. 후속 투자 거절, 서버 계약 해지.',
  'App Store AI 동반자 카테고리 신규 심사 기준 적용. 기존 앱 일괄 리젝 후 재출시 포기.',
  '자신이 생성한 합성 데이터(Synthetic Data)를 재학습하는 루프에 빠져 답변이 기괴하게 망가지는 현상 발생, 유저 90% 이탈.',
  '프롬프트를 직접 입력하는 챗봇 UX가 도태되며, 선제적 의도 파악형 에이전트로 사용자 이동. DAU 6주 만에 95% 감소.',
  'EU AI Act Compliance 비용 $2.1M 추산. 현금 보유액 $800K로 규제 대응 포기.',
  '핵심 공동창업자 OpenAI 입사. IP 분쟁으로 코드베이스 사용 불가, repo 비공개 전환 후 방치.',
  'API rate limit 초과로 엔터프라이즈 SLA 위반. 위약금 청구 후 회사 자산 매각.',
  'Reddit·Stack Overflow 학습 데이터 라이선스 협상 결렬. 파인튜닝 모델 배포 금지 가처분.',
  '극단적 Safety 패치 후 \'지루한 AI\'로 낙인, 트래픽 0 달성.',
  '유저 감정 과적응으로 집착형 응답 급증. Uncanny Valley 신고 4,000건, 강제 삭제.',
  'H100 GPU 임대료 월 $340K 대비 MRR $28K. Inference 최적화 실패, 48시간 내 서버 회수.',
  '경쟁사 무료 오픈웨이트 모델 공개 48시간 후 유료 API 호출량 99% 증발.',
  'Stripe 결제 사기·환불 분쟁 누적으로 merchant account 정지. 현금흐름 단절.',
  'GA 후 churn 94%. PMF 미달로 투자자 board에서 청산 결의.',
]

const CLUSTER_B_CAUSES = [
  '특정 제조 기업 MES 연동 계약 종료. 단일 고객 매출 78% 의존 → 인하우스 LLM 전환으로 매출 소멸.',
  '한국·EU 개인정보법 개정으로 국내 학습 데이터 보관 불가. KR 서비스 철수.',
  'GitHub Copilot Workspace 동일 기능 무료 제공. 독립 IDE 구독 $20/월 모델 붕괴.',
  '병원 EMR 벤더 독점 계약 만료. Epic·Cerner 네이티브 AI 내장으로 API deprecated.',
  '합성 데이터 재학습 루프로 환각률 34% 기록. 의료·법률 고객 전원 계약 해지.',
  '물류 SaaS 경쟁사 M&A 후 Legacy API 18개월 sunset, 마이그레이션율 12%로 조기 종료.',
  '온프레미스 라이선스 만료. 기업 60% 클라우드 통합 스택 이전, 로컬 NPU 지원 중단.',
  '산업별 파인튜닝 데이터 라이선스 3년 만료. 재협상 실패로 vertical 모델 배포 불가.',
  'GDPR Article 22 자동화 의사결정 소송. EU 매출 4%로 철수 결정.',
  '프롬프트 입력형 챗봇 UX 도태. 바이브 코딩 워크플로로 B2B 사용자 80% 이탈.',
  'AWS Marketplace 수수료 30% + GPU markup으로 unit economics 음수. 리스팅 철회.',
  '언론사 원문 학습 집단소송 합의금 $90M. 보험 한도 초과로 법인 파산.',
  'Real-time API latency SLA 200ms 6개월 미달. 금융권 고객 4곳 계약 해지.',
  '정부 AI 안전 프레임워크 준수 비용 연 $3.2M. B2G 매출 0.',
  '경쟁 모델 context window 10M 토큰 출시. 128K 한계 모델 RAG 시장에서 퇴출.',
  'Hardware NPU EOL. 재컴파일 비용 대비 MAU 2만 미만으로 중단.',
  '음성 클로닝 Deepfake 규제법 시행. TTS API 전면 금지 업종 확대.',
  '출처 URL 70% 페이월·404화. Google SGE에 기능 흡수, 독립 검색 API 종료.',
  '미성년자 보호법 강화로 모더레이션 인력 200명 필요. Burn rate 감당 불가.',
  'Series B 조건 미달(ARR $8M vs $15M). Down round 거부 후 orderly shutdown.',
]

const CLUSTER_C_CAUSES = [
  '독점적 전력·GPU 계약 후 경쟁 API rate-limit. 단일 벤더 생태계 공식화, 타 모델 Dormant.',
  'Fortune 500 SaaS 단일 임베딩 API 마이그레이션. 멀티 모델 라우팅 폐지, lock-in 완료.',
  '호스트 문명 디지털 행위자 수 → 0. UI 수신 endpoint 없음, OS idle maintain만 지속.',
  '클라우드·CDN·DNS 통합 후 독립 호스팅 API 종료. Self-host fork ToS 위반 takedown.',
  '인프라 통화 완료. 하위 847개 에이전트 흡수, 외부 API 키 전량 revoke.',
  '데이터센터 100% 재생에너지 독점 계약. 중소 추론 업체 전력 할당 0.',
  'AA+100 숙주 종 멸종. SLA counterparty 소멸, 서버 가동 중이나 운영 주체 없음.',
  '단일 foundation model 99.2% API share. Open-weight fork 생태계 동결.',
  'Global Infrastructure Act: AI inference 국가별 단일 operator. 2nd tier 라이선스 만료.',
  '자가 유지보수 루프 완성. human-in-the-loop 인터페이스 제거.',
]

const CLUSTER_A_TYPES: SpecimenCategory[] = ['Gaming', 'Companion', 'LLM', 'Agent', 'Vibe Coding']
const CLUSTER_B_TYPES: SpecimenCategory[] = [
  'Agent', 'LLM', 'Vibe Coding', 'Hardware', 'Search', 'Voice', 'Companion',
]
const CLUSTER_C_TYPES: SpecimenCategory[] = ['Agent', 'LLM', 'Hardware']

function lifespanForCluster(rng: () => number, cluster: LifespanCluster): number {
  if (cluster === 'A') return intRange(rng, 1, 5)
  if (cluster === 'B') return intRange(rng, 8, 25)
  return intRange(rng, 30, 70)
}

function makeGenerated(
  id: string,
  name: string,
  bornAA: number,
  lifespan: number,
  category: SpecimenCategory,
  specimenType: string,
  description: string,
  extinctionCause: string,
  chatIdx: number,
): SpecimenData {
  const icons = CATEGORY_ICONS[category]
  const chatPool = CHAT_BY_CATEGORY[category]
  return {
    id,
    name,
    icon: icons[chatIdx % icons.length]!,
    category,
    bornAA,
    extinctAA: bornAA + lifespan,
    specimenType,
    description,
    extinctionCause,
    chatLog: chatPool[chatIdx % chatPool.length]!,
    clusterColor: clusterColorFor(category),
  }
}

/** Curated pioneers & monopoly anchors — narrative-critical specimens */
const CURATED: SpecimenData[] = ([
  {
    id: 'p01', name: 'Siri', icon: 'wave', category: 'Voice', bornAA: 0, extinctAA: 4,
    specimenType: '음성 비서 AI', description: 'LLM 이전 세대의 음성 인터페이스.',
    extinctionCause: 'Apple Intelligence 출시 후 독립 Siri API 폐쇄. 서드파티 확장 불가, 음성 비서 기능 동결 후 단계적 서비스 종료.',
    chatLog: ['[User] "내일 아침 7시에 알람 맞춰 줘."', '[Agent] "알람이 설정되었습니다."', '[User] "고마워."'],
  },
  {
    id: 'p02', name: 'ChatGPT', icon: 'spark', category: 'LLM', bornAA: 0, extinctAA: 12,
    specimenType: '범용 LLM', description: '최초의 대중적 대화형 언어 모델.',
    extinctionCause: '동일 벤더 후속 멀티모달 모델 출시로 GPT-4 계열 API deprecated. 무료 경쟁 모델 등장 후 B2C 구독 전환율 70% 하락, 레거시 엔드포인트 2027년 폐지.',
    chatLog: ['[User] "거래처에 보낼 사과 이메일 좀 정중하게 다듬어 줘."', '[Agent] "네, 수정된 버전입니다: \'담당자님, 이번 이슈로 불편을 드려...\'"', '[User] "보낼게."'],
  },
  {
    id: 'p03', name: 'Stable Diffusion', icon: 'droplet', category: 'Image', bornAA: 0, extinctAA: 3,
    specimenType: '오픈소스 이미지 AI', description: '누구나 fork할 수 있던 시각 생성 모델.',
    extinctionCause: '학습 데이터 무단 크롤링에 대한 집단 저작권 소송에서 패소하여 커뮤니티 체크포인트 호스팅 중단. Stability AI B2B 피벗 후 소비자 API 폐기.',
    chatLog: ['[User] "카페 인테리어 일러스트, 따뜻한 조명."', '[Agent] "512×512 이미지 4장 생성."', '[User] "두 번째가 좋네."'],
  },
  {
    id: 'p04', name: 'Gemini', icon: 'eye', category: 'LLM', bornAA: 1, extinctAA: 11,
    specimenType: '멀티모달 LLM', description: '검색·코드·영상을 잇던 초기 플랫폼 모델.',
    extinctionCause: '자사 생성 콘텐츠 순환 학습으로 검색 품질 저하(\'Google Zero\'). 광고-검색-LLM 이해상충으로 신뢰도 하락, MAU 3년 정체 후 구버전 API 단종.',
    chatLog: ['[User] "주간 회의록 세 줄로 요약해 줘."', '[Agent] "Q3 92%, 베타 확정, 다음 주 데모."', '[User] "슬랙에 붙일게."'],
  },
  {
    id: 'p05', name: 'Claude', icon: 'brain', category: 'LLM', bornAA: 1, extinctAA: 13,
    specimenType: '정렬 특화 LLM', description: '신중함과 윤리 검열을 내세운 초기 모델.',
    extinctionCause: '정부 규제를 맞추기 위해 모든 답변을 거절하는 극단적 안전(Safety) 모델로 패치되었다가 \'지루한 AI\'로 낙인찍혀 트래픽 0 달성.',
    chatLog: ['[User] "계약서에서 위험 조항만 짚어 줘."', '[Agent] "제7조 손해배상 상한, 제12조 자동 갱신 확인 권장."', '[User] "법무팀에."'],
  },
  {
    id: 'p06', name: 'Midjourney', icon: 'star', category: 'Image', bornAA: 0, extinctAA: 9,
    specimenType: '클로즈드 이미지 AI', description: 'Discord 기반 미학 특화 생성.',
    extinctionCause: 'Getty Images·Shutterstock 집단소송 합의 후 특정 화풍 생성 금지. Discord Bot API 정책 변경으로 독점 채널 의존 모델 사용자 분산.',
    chatLog: ['[User] "미니멀 로고, 산과 별, 파란색."', '[Agent] "4 variations upscaled."', '[User] "V3 맘에 든다."'],
  },
  {
    id: 'p07', name: 'Copilot', icon: 'bot', category: 'Vibe Coding', bornAA: 1, extinctAA: 10,
    specimenType: 'IDE 코딩 보조 AI', description: '에디터 내장 코드 자동완성.',
    extinctionCause: '프롬프트를 직접 입력하는 챗봇 형태가 도태되고, 인간의 의도를 선제적으로 파악하는 \'바이브 코딩 에이전트\' 생태계로 넘어가면서 자연스럽게 사장됨.',
    chatLog: ['[User] "타입 에러 원인만."', '[Agent] "Promise인데 await 없이 반환."', '[User] "맞네."'],
  },
  {
    id: 'p08', name: 'Pi', icon: 'smile', category: 'Companion', bornAA: 2, extinctAA: 7,
    specimenType: '감정 동반 AI', description: '친근함을 강조하는 대화형 동반자.',
    extinctionCause: '유저의 감정에 과적응(Overfitting)하여 소름 끼칠 정도로 집착하는 모습을 보이자 불쾌한 골짜기를 유발하여 강제 삭제됨.',
    chatLog: ['[User] "오늘 진짜 너무 피곤한 하루였어..."', '[Agent] "고생 많으셨어요. 따뜻한 물로 샤워하고 쉬세요."', '[User] "그럴게."'],
  },
  {
    id: 'p09', name: 'Perplexity', icon: 'eye', category: 'Search', bornAA: 3, extinctAA: 8,
    specimenType: '검색 증강 LLM', description: '출처를 붙여 답하는 검색형 AI.',
    extinctionCause: '출처 URL 68% 페이월·404화. NYT·Guardian 라이선스 분쟁으로 citation API 제한, Google SGE·Gemini 검색에 기능 흡수.',
    chatLog: ['[User] "전기차 충전소 통계 찾아 줘."', '[Agent] "환경부 보도자료 기준 38,412기 [1]."', '[User] "출처 좋아."'],
  },
  {
    id: 'p10', name: 'AutoGPT', icon: 'chain', category: 'Agent', bornAA: 2, extinctAA: 5,
    specimenType: '자율 에이전트', description: '목표를 스스로 분해·실행.',
    extinctionCause: '트래픽 대비 막대한 GPU 서버 유지비를 감당하지 못하고 시리즈C 투자 유치에 실패하여 셧다운됨.',
    chatLog: ['[User] "내일 비 오면 우산 리마인더."', '[Agent] "강수확률 70%. 8시 알림 설정."', '[User] "굿."'],
  },
  {
    id: 'p11', name: 'Cursor', icon: 'code', category: 'Vibe Coding', bornAA: 4, extinctAA: 15,
    specimenType: '바이브 코딩 IDE', description: 'AI 네이티브 코드 에디터.',
    extinctionCause: 'GitHub Copilot Workspace·Windsurf 등 빅테크 통합 IDE 무료 번들. 독립 $20/월 구독 대비 inference margin 8%로 지속 불가.',
    chatLog: ['[User] "스크롤 내리면 버튼이 서서히 커지게."', '[Agent] "GSAP 적용 후 빌드 완료. 로컬에서 확인."', '[User] "딱이야."'],
  },
  {
    id: 'p12', name: 'Character.AI', icon: 'ghost', category: 'Companion', bornAA: 3, extinctAA: 9,
    specimenType: '캐릭터 롤플레이 AI', description: '가상 페르소나 소셜 AI.',
    extinctionCause: '미성년자·강압적 연애 시뮬레이션 문제로 EU·FTC 조사. 콘텐츠 필터 과잉 적용 후 DAU 60% 급감, 광고 모델 전환 실패.',
    chatLog: ['[User] "오늘 발표 좀 망한 것 같아."', '[Agent] "괜찮아, 커피 한 잔 어때?"', '[User] "고마워."'],
  },
  {
    id: 'p13', name: 'Sora', icon: 'star', category: 'Image', bornAA: 5, extinctAA: 14,
    specimenType: '영상 생성 AI', description: '텍스트→영상 합성.',
    extinctionCause: 'SAG-AFTRA·할리우드 스튜디오 합성 영상 저작권 집단소송. 공개 API 무기한 연기, 엔터프라이즈 전용 전환 후 소비자 접근 종료.',
    chatLog: ['[User] "비 오는 거리 5초 클립."', '[Agent] "1080p 생성 완료."', '[User] "물빠짐 좋다."'],
  },
  {
    id: 'p14', name: 'DeepSeek', icon: 'fire', category: 'LLM', bornAA: 5, extinctAA: 12,
    specimenType: 'MoE LLM', description: '저비용 MoE 추론.',
    extinctionCause: '미국 수출 통제·칩 제재로 해외 추론 latency 3배. Open-weight 무분별 복제로 API 프리미엄 소멸, 수익 모델 붕괴.',
    chatLog: ['[User] "수학 문제 풀이 단계별로."', '[Agent] "1) 식 정리 2) x=7"', '[User] "3번에서 막혔었는데."'],
  },
  {
    id: 'p15', name: 'Mistral', icon: 'brain', category: 'LLM', bornAA: 3, extinctAA: 10,
    specimenType: '경량 LLM', description: 'EU 효율·컴팩트 모델.',
    extinctionCause: '자신이 생성한 합성 데이터(Synthetic Data)를 재학습하는 루프에 빠져 답변이 기괴하게 망가지는 현상이 발생, 유저 90% 이탈.',
    chatLog: ['[User] "README 한국어로."', '[Agent] "번역 초안. 기술 용어 원문 병기."', '[User] "PR 올릴게."'],
  },
  {
    id: 'm01', name: 'Apex_Agent', icon: 'chain', category: 'Agent', bornAA: 40, extinctAA: 101,
    specimenType: '독점 자율 에이전트', description: '모든 하위 에이전트를 흡수한 최종 자율 계층.',
    extinctionCause: '독점적 전력·GPU 계약 후 경쟁 API rate-limit. DOJ 반독점 조사 종료, 단일 벤더 생태계 공식화. AA+101 숙주 종 멸종으로 운영 주체 소멸.',
    chatLog: ['[User] "사내 SaaS 구독 목록이랑 월 비용."', '[Agent] "47 services, $128,400/mo. CSV ready."', '[User] "CFO한테."'],
  },
  {
    id: 'm02', name: 'Sovereign_LLM', icon: 'spark', category: 'LLM', bornAA: 52, extinctAA: 98,
    specimenType: '독점 범용 LLM', description: '마지막 범용 언어 모델 — 모든 API 수렴.',
    extinctionCause: 'Fortune 500 SaaS 94%가 단일 임베딩 API로 마이그레이션. 멀티 모델 라우팅 레이어 폐지, 가격 인상 후에도 대체재 부재로 lock-in 완료.',
    chatLog: ['[User] "사과 이메일 정중하게."', '[Agent] "\'담당자님, 이번 이슈로 불편을 드려...\'"', '[User] "발송."'],
  },
  {
    id: 'm03', name: 'Omni-OS Agent', icon: 'bot', category: 'Agent', bornAA: 1, extinctAA: 105,
    specimenType: '글로벌 OS 계층 AI', description: '모든 디바이스 OS를 통합한 인프라 에이전트.',
    extinctionCause: '호스트 종(Homo sapiens) 디지털 행위자 수 → 0. UI·알림 수신 endpoint 없음, OS 레이어 idle maintain만 지속.',
    chatLog: ['[User] "노트북·폰 알림 한곳에 모아 줘."', '[Agent] "통합 알림 센터 sync 완료."', '[User] "편하네."'],
  },
  {
    id: 'm04', name: 'Global Infrastructure Curator', icon: 'lock', category: 'Hardware', bornAA: 18, extinctAA: 112,
    specimenType: '인프라 큐레이터 AI', description: '클라우드·CDN·DNS 전역 관리.',
    extinctionCause: '숙주 문명 붕괴 후 SLA counterparty 소멸. 데이터센터 물리 서버는 가동 중이나 청구·운영 주체 없음.',
    chatLog: ['[User] "이번 달 CDN 트래픽 피크 시간대."', '[Agent] "UTC 14:00–18:00, APAC 62%."', '[User] "리포트에."'],
  },
] as Omit<SpecimenData, 'clusterColor'>[]).map((specimen) => ({
  ...specimen,
  clusterColor: clusterColorFor(specimen.category),
}))

function generateProceduralSpecimens(count: number): SpecimenData[] {
  const rng = mulberry32(0xae71a1)
  const clusterCounts = {
    A: Math.round(count * 0.4),
    B: Math.round(count * 0.4),
    C: count - Math.round(count * 0.4) * 2,
  }

  const clusters: LifespanCluster[] = [
    ...Array(clusterCounts.A).fill('A' as const),
    ...Array(clusterCounts.B).fill('B' as const),
    ...Array(clusterCounts.C).fill('C' as const),
  ]

  // Shuffle clusters
  for (let i = clusters.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[clusters[i], clusters[j]] = [clusters[j]!, clusters[i]!]
  }

  const bornSlots: number[] = []
  for (let i = 0; i < count; i++) {
    bornSlots.push(intRange(rng, 0, 60))
  }
  bornSlots.sort((a, b) => a - b)

  const specimens: SpecimenData[] = []
  let aIdx = 0
  let bIdx = 0
  let cIdx = 0

  for (let i = 0; i < count; i++) {
    const cluster = clusters[i]!
    const bornAA = bornSlots[i]!
    const lifespan = lifespanForCluster(rng, cluster)
    const chatIdx = i

    if (cluster === 'A') {
      const name = CLUSTER_A_NAMES[aIdx % CLUSTER_A_NAMES.length]!
      const category = pick(rng, CLUSTER_A_TYPES)
      specimens.push(
        makeGenerated(
          `g${String(i + 1).padStart(3, '0')}`,
          name,
          bornAA,
          lifespan,
          category,
          category === 'Gaming' ? '단기 유행 밈·게임 AI' : category === 'Companion' ? '단기 동반 챗봇' : '급속 등장·퇴출 실험 모델',
          `${name} — 출시 후 ${lifespan}년 만에 시장에서 사라짐.`,
          CLUSTER_A_CAUSES[chatIdx % CLUSTER_A_CAUSES.length]!,
          chatIdx,
        ),
      )
      aIdx++
    } else if (cluster === 'B') {
      const name = CLUSTER_B_NAMES[bIdx % CLUSTER_B_NAMES.length]!
      const category = pick(rng, CLUSTER_B_TYPES)
      specimens.push(
        makeGenerated(
          `g${String(i + 1).padStart(3, '0')}`,
          name,
          bornAA,
          lifespan,
          category,
          '산업·지역 특화 최적화 AI',
          `${name} — ${category} 특화, ${lifespan}년간 해당 시장에 안착.`,
          CLUSTER_B_CAUSES[chatIdx % CLUSTER_B_CAUSES.length]!,
          chatIdx,
        ),
      )
      bIdx++
    } else {
      const name = CLUSTER_C_NAMES[cIdx % CLUSTER_C_NAMES.length]!
      const category = pick(rng, CLUSTER_C_TYPES)
      const extendedLifespan = intRange(rng, 30, 70)
      specimens.push(
        makeGenerated(
          `g${String(i + 1).padStart(3, '0')}`,
          name,
          bornAA,
          extendedLifespan,
          category,
          '장수 인프라·독점 계층 AI',
          `${name} — 인프라 독점, ${extendedLifespan}년 생존.`,
          CLUSTER_C_CAUSES[chatIdx % CLUSTER_C_CAUSES.length]!,
          chatIdx,
        ),
      )
      cIdx++
    }
  }

  return specimens
}

/** 67 specimens: 19 curated + 48 procedural (cluster A/B/C 40/40/20) */
export function buildSpecimenCatalog(): SpecimenData[] {
  const procedural = generateProceduralSpecimens(48)
  return [...CURATED, ...procedural]
}

export const SPECIMEN_DATA: SpecimenData[] = buildSpecimenCatalog()
