import type { TimelineEvent } from '@/data/types'

type EventArchiveFields = Pick<
  TimelineEvent,
  'exhibitImage' | 'expandedDetail' | 'detail' | 'ecosystemImpact'
>

/** Archival drawer content for prologue scroll events */
export const INTRO_EVENT_ARCHIVE: Record<string, EventArchiveFields> = {
  'evt-turing-machine': {
    exhibitImage: {
      alt: '1936 — Turing machine schematic (reconstruction)',
      placeholderLabel: 'Turing Machine · Universal Tape',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '튜링 머신',
      sections: [
        {
          title: '이론적 배경',
          body: '1936년 앨런 튜링은 「계산 가능한 수」를 형식화하고, 임의의 알고리즘을 무한 테이프·읽기/쓰기 헤드·상태 전이표로 표현할 수 있음을 증명했습니다.',
        },
        {
          title: '박물관 기록',
          body: '모든 디지털 프로그램과 신경망은 결국 이 추상 모델 위에서 물리적으로 구현된 것으로 분류됩니다. AA 0의 기원 표본으로 등록되어 있습니다.',
        },
      ],
    },
  },
  'evt-eniac': {
    detail:
      '17,468개 진공관, 30톤, 167㎡ — 최초의 범용 전자 디지털 컴퓨터. 재프로그래밍은 배선판을 물리적으로 재구성하는 방식이었습니다.',
    exhibitImage: {
      alt: '1945 — ENIAC room photograph (archival placeholder)',
      placeholderLabel: 'ENIAC · Vacuum Tubes',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'ENIAC',
      sections: [
        {
          title: '물리적 구현',
          body: '펜실베이니아 대학에서 개발된 ENIAC은 튜링의 추상 모델을 전자 회로로 최초 대규모 구현한 사례입니다.',
        },
        {
          title: '프로그래밍 방식',
          body: '소프트웨어 개념 이전, 「프로그램」은 케이블과 스위치의 물리적 배선이었습니다. 이후 stored-program 아키텍처로의 전환이 필연적이었습니다.',
        },
      ],
    },
  },
  'evt-von-neumann': {
    detail:
      '「von Neumann 병목」이라는 이름이 붙은 구조 — CPU와 메모리 분리, 순차 실행. 80년간 컴퓨터 설계의 기본 틀.',
    exhibitImage: {
      alt: '1945 — von Neumann architecture diagram',
      placeholderLabel: 'von Neumann · Stored Program',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'von Neumann 아키텍처',
      sections: [
        {
          title: '설계 원칙',
          body: '프로그램과 데이터를 동일한 메모리 공간에 저장. fetch-decode-execute 사이클이 현대 CPU의 기본 동작입니다.',
        },
        {
          title: '유산',
          body: '하드웨어·소프트웨어 분리, 이식 가능한 코드, 운영체제의 등장 — 모두 이 아키텍처에서 파생되었습니다.',
        },
      ],
    },
  },
  'evt-fortran': {
    detail:
      'IBM 704를 위해 설계. 컴파일러가 고수준 수식을 기계어로 변환하는 실용적 증명 — 이후 모든 compiled 언어의 선례.',
    exhibitImage: {
      alt: '1957 — FORTRAN punch card and listing',
      placeholderLabel: 'FORTRAN · First Compiler',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'FORTRAN',
      sections: [
        {
          title: '과학 계산 혁명',
          body: '물리·항공·원자력 분야에서 수치 시뮬레이션 시간을 수개월에서 수일로 단축. 「프로그래머」 직업군의 산업적 기원.',
        },
        {
          title: '언어 설계',
          body: '수학 표기에 가까운 문법, 최적화 컴파일러, 서브루틴 — 현대 HPC 언어의 조상.',
        },
      ],
    },
  },
  'evt-c-language': {
    detail:
      'Dennis Ritchie, Bell Labs. UNIX 커널 재작성과 함께 확산. 포인터·메모리 직접 제어가 시스템 프로그래밍 표준이 되었습니다.',
    exhibitImage: {
      alt: '1972 — C language and UNIX terminal',
      placeholderLabel: 'C · Systems Programming',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'C 언어',
      sections: [
        {
          title: 'UNIX와의 공진화',
          body: '운영체제와 언어가 함께 설계·확산. 이식성(portability)과 하드웨어 근접성의 균형.',
        },
        {
          title: '생태계 영향',
          body: 'C++ · Objective-C · Go 등 후속 언어의 문법·철학적 기반. 임베디드·OS·데이터베이스 엔진의 공통 언어.',
        },
      ],
    },
  },
  'evt-oop-wave': {
    detail:
      'Smalltalk(1972), C++(1983), Objective-C(1984) — 캡슐화·상속·다형성이 GUI·엔터프라이즈 소프트웨어 설계 표준이 되었습니다.',
    exhibitImage: {
      alt: '1983 — Object-oriented programming diagram',
      placeholderLabel: 'OOP · Encapsulation',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '객체지향 프로그래밍의 확산',
      sections: [
        {
          title: '패러다임 전환',
          body: '절차적 코드에서 「객체」 단위로 데이터와 행위를 묶는 설계. 재사용성과 유지보수성의 대규모 향상.',
        },
        {
          title: 'GUI 시대',
          body: 'Mac OS, Windows, Java — OOP 없이는 현대 GUI 프레임워크를 상상하기 어렵습니다.',
        },
      ],
    },
  },
  'evt-python': {
    detail:
      'Guido van Rossum, 1991. 「읽기 쉬운 코드」 철학. 2010년대 ML·데이터 과학 생태계의 de facto 스크립팅 레이어.',
    exhibitImage: {
      alt: '1991 — Python interpreter REPL',
      placeholderLabel: 'Python · Readability',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'Python',
      sections: [
        {
          title: '생산성 우선',
          body: '동적 타이핑, 풍부한 표준 라이브러리, 「batteries included」 철학.',
        },
        {
          title: 'AI 파이프라인',
          body: 'NumPy · PyTorch · Jupyter — 현대 ML 연구·프로토타이핑의 90%가 Python 위에서 실행됩니다.',
        },
      ],
    },
  },
  'evt-mcculloch-pitts': {
    detail:
      'McCulloch & Pitts, 1943. 뉴런의 all-or-none 발화를 논리 게이트로 모델링 — 신경망 이론의 수학적 출발점.',
    exhibitImage: {
      alt: '1943 — McCulloch-Pitts neuron diagram',
      placeholderLabel: 'McCulloch–Pitts · Logic Neuron',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'McCulloch–Pitts 인공 뉴런',
      sections: [
        {
          title: '수학적 모델',
          body: '입력 가중합이 임계값을 넘으면 1, 아니면 0 — AND·OR·NOT 회로를 뉴런 네트워크로 구현 가능함을 증명.',
        },
        {
          title: '이론적 유산',
          body: '퍼셉트론, 역전파, 트랜스포머 — 모두 「인공 뉴런」 추상화에서 출발합니다.',
        },
      ],
    },
  },
  'evt-perceptron': {
    exhibitImage: {
      alt: '1958 — Perceptron diagram',
      placeholderLabel: 'Perceptron · Single Layer',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '퍼셉트론',
      sections: [
        {
          title: '1차 AI 붐',
          body: 'Frank Rosenblatt, 1958. 단층 네트워크가 선형 분류 가능함을 보였으나 XOR 문제에 한계.',
        },
        {
          title: 'AI 겨울의 씨앗',
          body: 'Minsky & Papert(1969)의 비판 이후 신경망 연구 자금·관심 급감. 1986년 역전파까지 17년의 침체기.',
        },
      ],
    },
  },
  'evt-backprop': {
    exhibitImage: {
      alt: '1986 — Backpropagation network diagram',
      placeholderLabel: 'Backprop · Hidden Layers',
    },
    expandedDetail: {
      viewType: 'document',
      headline: '역전파 (Backpropagation)',
      sections: [
        {
          title: '알고리즘',
          body: 'Rumelhart, Hinton, Williams — 연쇄 법칙(chain rule)으로 은닉층 가중치를 효율적으로 갱신.',
        },
        {
          title: '딥러닝의 기반',
          body: '1986년 이후 모든 다층 신경망 학습의 표준. GPU 가속과 결합하면 2012년 ImageNet 혁명으로 이어집니다.',
        },
      ],
    },
  },
  'evt-imagenet': {
    exhibitImage: {
      alt: '2012 — ImageNet classification error curve',
      placeholderLabel: 'ImageNet · AlexNet',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'ImageNet & AlexNet',
      sections: [
        {
          title: '데이터 + GPU',
          body: '1400만 라벨 이미지, CUDA GPU 학습 — 컴퓨터 비전 패러다임 전환의 결합점.',
        },
        {
          title: '오류율 혁명',
          body: '2012년 AlexNet이 top-5 error 15.3% → 기존 방법 대비 절반 이하. 「딥러닝 시대」의 공식적 시작.',
        },
      ],
    },
  },
  'evt-transformer': {
    exhibitImage: {
      alt: '2017 — Transformer attention diagram',
      placeholderLabel: 'Transformer · Attention',
    },
    expandedDetail: {
      viewType: 'document',
      headline: 'Transformer',
      sections: [
        {
          title: 'Attention Is All You Need',
          body: 'Google, 2017. RNN 없이 self-attention만으로 시퀀스 처리. 병렬화·장거리 의존성 학습의 돌파.',
        },
        {
          title: 'LLM 시대의 씨앗',
          body: 'GPT · BERT · Claude — 모두 Transformer 블록의 스택. AA 17 이후 AI 생태계의 공통 골격.',
        },
      ],
    },
  },
}
