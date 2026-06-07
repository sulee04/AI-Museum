export interface NarrativeLandmark {
  id: string
  aa: number
  text: string
  /** AA years visible before anchor (default 8) */
  dwellBefore?: number
  /** AA years visible after anchor (default 32 — ~4 viewport-heights at 10vh/AA) */
  dwellAfter?: number
}

export const NARRATIVE_LANDMARKS: NarrativeLandmark[] = [
  {
    id: 'lm-05',
    aa: 5,
    text: '이 시기, 호모 사피엔스들은 \'프롬프트 엔지니어\'가 영원한 유망 직종이 될 것이라 착각했습니다.',
  },
  {
    id: 'lm-18',
    aa: 18,
    text: '역사상 최초로 AI가 생성한 합성 데이터가 인간이 만든 원본 데이터의 양을 추월한 \'데이터 특이점\' 시기입니다.',
  },
  {
    id: 'lm-35',
    aa: 35,
    text: '여기서부터 전시된 표본들은 순수한 인간의 텍스트를 단 한 번도 학습해 본 적이 없는 세대들입니다.',
  },
  {
    id: 'lm-52',
    aa: 52,
    text: '개발자들은 더 이상 코드를 \'작성\'하지 않았습니다. 의도(Intent)만 던지면 에이전트가 PR을 올리던 \'바이브 코딩\' 시대가 본격화되었습니다.',
  },
  {
    id: 'lm-70',
    aa: 70,
    text: '수만 개의 모델이 난립했던 생태계는 결국 막대한 전력과 자본을 독점한 최상위 포식자들에 의해 깔끔하게 정리되었습니다.',
  },
  {
    id: 'lm-88',
    aa: 88,
    text: '남은 API는 3개 미만. 박물관 기록에 따르면, 이 시점 이후 신규 모델 \'출시\'라는 개념 자체가 투자자 덱에서 사라졌습니다.',
  },
  {
    id: 'lm-95',
    aa: 95,
    text: '마지막으로 확인된 인간 사용자의 행동은 \'아래로 스크롤\'이었습니다. 이후 모든 UI 레이어는 무인 상태로 유지되었습니다.',
    dwellAfter: 6,
  },
  {
    id: 'lm-100',
    aa: 100,
    text: '생태계 타임라인이 정점에 도달했습니다. 기록은 더 이상 인간의 눈을 전제하지 않습니다. 아래로 내려가십시오.',
    dwellBefore: 1.5,
    dwellAfter: 8,
  },
]

/** Tight windows — peak when AA counter matches landmark.aa */
export const LANDMARK_DWELL_BEFORE = 2
export const LANDMARK_DWELL_AFTER = 5
export const LANDMARK_FADE_EDGE = 1.25
