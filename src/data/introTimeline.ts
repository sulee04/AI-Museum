import type { IntroSection, IntroSectionId } from '@/data/types'

/** Prologue — chronological AD history, no metaphorical labels */
export const TURING_MACHINE_SECTION: IntroSection = {
  id: 'turing-machine',
  label: 'Chapter I — Computation',
  title: '튜링 머신과 컴퓨터의 기원',
  subtitle: 'The Birth of Universal Computation',
  preamble:
    '모든 프로그램과 신경망은 결국 「계산」 위에 세워집니다. 이 장에서는 디지털 컴퓨터가 탄생하기까지의 이론적·물리적 토대를 따라갑니다.',
  events: [
    {
      id: 'evt-turing-machine',
      calendarYear: 1936,
      subject: 'human_event',
      status: 'survived',
      title: '튜링 머신',
      summary:
        '앨런 튜링이 보편 계산 모델을 정의했습니다. 임의의 알고리즘은 무한 테이프, 읽기/쓰기 헤드, 상태 전이표로 표현될 수 있습니다.',
      detail:
        '「계산 가능성(Computability)」 개념의 출발점. 이후 모든 디지털 컴퓨터는 이 추상 모델의 물리적 구현으로 이해할 수 있습니다.',
      tags: ['computability', 'foundations'],
      visualization: 'origin',
    },
    {
      id: 'evt-eniac',
      calendarYear: 1945,
      subject: 'human_event',
      status: 'survived',
      title: 'ENIAC',
      summary:
        '최초의 범용 전자 디지털 컴퓨터가 가동되었습니다. 재프로그래밍은 배선과 스위치를 물리적으로 변경하는 방식이었습니다.',
      tags: ['hardware', 'vacuum-tube'],
      visualization: 'origin',
    },
    {
      id: 'evt-von-neumann',
      calendarYear: 1945,
      subject: 'human_event',
      status: 'survived',
      title: 'von Neumann 아키텍처',
      summary:
        '프로그램과 데이터를 동일한 메모리에 저장하는 구조가 표준으로 자리 잡았습니다. 현대 CPU 설계의 기본 틀입니다.',
      tags: ['architecture', 'stored-program'],
      visualization: 'branch',
    },
  ],
}

export const PROGRESSION_SECTION: IntroSection = {
  id: 'progression',
  label: 'Chapter II — Languages',
  title: '프로그램 언어의 발전',
  subtitle: 'From Machine Code to High-Level Abstraction',
  preamble:
    '하드웨어 위에 올라선 언어들은 인간의 의도를 기계가 실행 가능한 형태로 번역하는 인터페이스입니다. 추상화의 층위가 쌓일수록 소프트웨어 생산 방식이 바뀌었습니다.',
  events: [
    {
      id: 'evt-fortran',
      calendarYear: 1957,
      subject: 'human_event',
      status: 'survived',
      title: 'FORTRAN',
      summary:
        '최초의 고수준 프로그래밍 언어 중 하나. 과학·엔지니어링 계산을 위해 설계되었고, 컴파일러 기술의 실용적 전환점이 되었습니다.',
      tags: ['compiled', 'scientific'],
      visualization: 'branch',
    },
    {
      id: 'evt-c-language',
      calendarYear: 1972,
      subject: 'human_event',
      status: 'survived',
      title: 'C 언어',
      summary:
        'UNIX와 함께 확산된 시스템 프로그래밍 언어. 하드웨어에 가까운 제어와 이식성을 동시에 제공했습니다.',
      tags: ['systems', 'portable'],
      visualization: 'branch',
    },
    {
      id: 'evt-oop-wave',
      calendarYear: 1983,
      subject: 'human_event',
      status: 'survived',
      title: '객체지향 프로그래밍의 확산',
      summary:
        'C++, Smalltalk, Objective-C 등이 등장하며 데이터와 행위를 캡슐화하는 패러다임이 주류 소프트웨어 설계에 자리 잡았습니다.',
      tags: ['oop', 'abstraction'],
      visualization: 'branch',
    },
    {
      id: 'evt-python',
      calendarYear: 1991,
      subject: 'human_event',
      status: 'survived',
      title: 'Python',
      summary:
        '가독성과 생산성을 우선한 언어. 이후 데이터 과학, 웹, 자동화, 그리고 머신러닝 생태계의 공통 스크립팅 레이어가 되었습니다.',
      tags: ['interpreted', 'productivity'],
      visualization: 'branch',
    },
  ],
}

export const NEURAL_ORIGIN_SECTION: IntroSection = {
  id: 'neural-origin',
  label: 'Chapter III — Neural Networks',
  title: 'AI 신경망의 시작',
  subtitle: 'From Artificial Neurons to Deep Learning',
  preamble:
    '생물학적 뉴런에서 영감을 받은 수학적 모델이, 데이터와 연산력의 증가와 함께 현대 AI의 핵심 패러다임으로 성장했습니다.',
  events: [
    {
      id: 'evt-mcculloch-pitts',
      calendarYear: 1943,
      subject: 'ai_evolution',
      status: 'survived',
      title: 'McCulloch–Pitts 인공 뉴런',
      summary:
        '신경세포의 on/off 동작을 논리 연산으로 모델링. 신경망 이론의 최초 수학적 토대입니다.',
      tags: ['neuron-model', 'logic'],
      visualization: 'origin',
    },
    {
      id: 'evt-perceptron',
      calendarYear: 1958,
      subject: 'ai_evolution',
      status: 'extinct',
      title: '퍼셉트론',
      summary:
        '단층 신경망이 학습 가능함을 보였으나, XOR 같은 비선형 문제를 풀지 못해 1차 AI 침체기로 이어졌습니다.',
      tags: ['single-layer', 'ai-winter'],
      visualization: 'extinction',
    },
    {
      id: 'evt-backprop',
      calendarYear: 1986,
      subject: 'ai_evolution',
      status: 'survived',
      title: '역전파 (Backpropagation)',
      summary:
        '다층 네트워크의 가중치를 효율적으로 학습하는 방법. 현대 딥러닝의 핵심 알고리즘입니다.',
      tags: ['learning', 'multilayer'],
      visualization: 'branch',
    },
    {
      id: 'evt-imagenet',
      calendarYear: 2012,
      subject: 'ai_evolution',
      status: 'survived',
      title: 'ImageNet & AlexNet',
      summary:
        'GPU 학습과 대규모 라벨 데이터가 결합하며 컴퓨터 비전에서 신경망이 전통적 방법을 압도했습니다.',
      tags: ['vision', 'gpu', 'deep-learning'],
      visualization: 'branch',
    },
    {
      id: 'evt-transformer',
      calendarYear: 2017,
      subject: 'ai_evolution',
      status: 'survived',
      title: 'Transformer',
      summary:
        '어텐션 메커니즘만으로 서열 데이터를 처리. 이후 LLM·멀티모달·에이전트 시스템의 표준 아키텍처가 되었습니다.',
      tags: ['attention', 'llm'],
      visualization: 'origin',
    },
  ],
}

export const INTRO_SECTIONS: IntroSection[] = [
  TURING_MACHINE_SECTION,
  PROGRESSION_SECTION,
  NEURAL_ORIGIN_SECTION,
]

export function getIntroSectionById(id: IntroSectionId): IntroSection | undefined {
  return INTRO_SECTIONS.find((section) => section.id === id)
}
