import type { Question } from '../types/index.js';

export const questions: Question[] = [
  {
    id: 'q1',
    text: '게임 개발자가 되고 싶나요?',
    type: 'single',
    category: 'goal',
    options: [
      { id: 'q1-yes', text: 'Yes! 🎮', value: 'yes', nextQuestionId: 'q2' },
      { id: 'q1-no', text: 'No', value: 'no' }
    ]
  },
  {
    id: 'q2',
    text: '어떤 종류의 게임 개발자가 되고 싶나요?',
    type: 'single',
    category: 'goal',
    options: [
      { 
        id: 'q2-indie', 
        text: '인디 개발자 (1인 또는 소규모 팀)', 
        value: 'indie',
        score: { unity: 20, unreal: 10 },
        nextQuestionId: 'q3'
      },
      { 
        id: 'q2-aaa', 
        text: 'AAA 스튜디오 개발자', 
        value: 'aaa',
        score: { unity: 10, unreal: 25 },
        nextQuestionId: 'q3'
      },
      { 
        id: 'q2-mobile', 
        text: '모바일 게임 개발자', 
        value: 'mobile',
        score: { unity: 30, unreal: 5 },
        nextQuestionId: 'q3'
      }
    ]
  },
  {
    id: 'q3',
    text: '프로그래밍 경험이 있나요?',
    type: 'single',
    category: 'skill',
    options: [
      { id: 'q3-yes', text: 'Yes', value: 'yes', nextQuestionId: 'q3-1' },
      { id: 'q3-no', text: 'No', value: 'no', nextQuestionId: 'q4' }
    ]
  },
  {
    id: 'q3-1',
    text: '어떤 프로그래밍 언어를 다룰 수 있나요?',
    type: 'multiple',
    category: 'skill',
    options: [
      { 
        id: 'q3-1-cpp', 
        text: 'C++', 
        value: 'cpp',
        score: { unity: 5, unreal: 30 }
      },
      { 
        id: 'q3-1-csharp', 
        text: 'C#', 
        value: 'csharp',
        score: { unity: 30, unreal: 5 }
      },
      { 
        id: 'q3-1-both', 
        text: '둘 다 가능', 
        value: 'both',
        score: { unity: 15, unreal: 15 }
      },
      { 
        id: 'q3-1-other', 
        text: '기타 언어만', 
        value: 'other',
        score: { unity: 10, unreal: 10 }
      }
    ]
  },
  {
    id: 'q4',
    text: '게임 엔진을 사용해본 적이 있나요?',
    type: 'single',
    category: 'skill',
    options: [
      { id: 'q4-yes', text: 'Yes', value: 'yes', nextQuestionId: 'q4-1' },
      { id: 'q4-no', text: 'No', value: 'no', nextQuestionId: 'q5' }
    ]
  },
  {
    id: 'q4-1',
    text: '어떤 엔진을 사용해봤나요?',
    type: 'multiple',
    category: 'skill',
    options: [
      { 
        id: 'q4-1-unity', 
        text: 'Unity', 
        value: 'unity',
        score: { unity: 25, unreal: 0 }
      },
      { 
        id: 'q4-1-unreal', 
        text: 'Unreal Engine', 
        value: 'unreal',
        score: { unity: 0, unreal: 25 }
      },
      { 
        id: 'q4-1-both', 
        text: '둘 다', 
        value: 'both',
        score: { unity: 15, unreal: 15 }
      },
      { 
        id: 'q4-1-other', 
        text: '기타 엔진만', 
        value: 'other',
        score: { unity: 10, unreal: 10 }
      }
    ]
  },
  {
    id: 'q5',
    text: '어떤 분야에 가장 관심이 있나요?',
    type: 'single',
    category: 'preference',
    options: [
      { 
        id: 'q5-gameplay', 
        text: '게임플레이 프로그래밍', 
        value: 'gameplay',
        score: { unity: 15, unreal: 15 }
      },
      { 
        id: 'q5-graphics', 
        text: '그래픽스 프로그래밍', 
        value: 'graphics',
        score: { unity: 10, unreal: 20 }
      },
      { 
        id: 'q5-ai', 
        text: 'AI 프로그래밍', 
        value: 'ai',
        score: { unity: 15, unreal: 15 }
      },
      { 
        id: 'q5-network', 
        text: '네트워크/멀티플레이어', 
        value: 'network',
        score: { unity: 15, unreal: 20 }
      },
      { 
        id: 'q5-design', 
        text: '게임 디자인', 
        value: 'design',
        score: { unity: 15, unreal: 10 }
      },
      { 
        id: 'q5-tech-art', 
        text: '테크니컬 아트', 
        value: 'tech-art',
        score: { unity: 10, unreal: 20 }
      }
    ]
  },
  {
    id: 'q6',
    text: '목표하는 게임의 그래픽 수준은?',
    type: 'single',
    category: 'preference',
    options: [
      { 
        id: 'q6-realistic', 
        text: '하이엔드 리얼리스틱', 
        value: 'realistic',
        score: { unity: 5, unreal: 30 }
      },
      { 
        id: 'q6-stylized', 
        text: '스타일라이즈드 3D', 
        value: 'stylized',
        score: { unity: 20, unreal: 15 }
      },
      { 
        id: 'q6-2d', 
        text: '2D 또는 2.5D', 
        value: '2d',
        score: { unity: 30, unreal: 5 }
      },
      { 
        id: 'q6-mobile-opt', 
        text: '모바일 최적화 중심', 
        value: 'mobile-optimized',
        score: { unity: 25, unreal: 10 }
      }
    ]
  },
  {
    id: 'q7',
    text: '개발 우선순위는?',
    type: 'single',
    category: 'preference',
    options: [
      { 
        id: 'q7-speed', 
        text: '빠른 프로토타이핑', 
        value: 'speed',
        score: { unity: 25, unreal: 10 }
      },
      { 
        id: 'q7-quality', 
        text: '최고 품질의 비주얼', 
        value: 'quality',
        score: { unity: 10, unreal: 25 }
      },
      { 
        id: 'q7-cross', 
        text: '크로스 플랫폼 배포', 
        value: 'cross-platform',
        score: { unity: 25, unreal: 10 }
      },
      { 
        id: 'q7-openworld', 
        text: '대규모 오픈월드', 
        value: 'openworld',
        score: { unity: 10, unreal: 25 }
      }
    ]
  },
  {
    id: 'q8',
    text: '하루에 학습할 수 있는 시간은?',
    type: 'single',
    category: 'environment',
    options: [
      { 
        id: 'q8-1-2', 
        text: '1-2시간', 
        value: '1-2hours',
        score: { unity: 15, unreal: 10 }
      },
      { 
        id: 'q8-3-4', 
        text: '3-4시간', 
        value: '3-4hours',
        score: { unity: 15, unreal: 15 }
      },
      { 
        id: 'q8-5plus', 
        text: '5시간 이상', 
        value: '5+hours',
        score: { unity: 15, unreal: 20 }
      }
    ]
  },
  {
    id: 'q9',
    text: 'PC 사양은 어떤가요?',
    type: 'single',
    category: 'environment',
    options: [
      { 
        id: 'q9-high', 
        text: '고사양 (RTX 3060+, 16GB+ RAM)', 
        value: 'high',
        score: { unity: 15, unreal: 25 }
      },
      { 
        id: 'q9-mid', 
        text: '중간 사양 (GTX 1060+, 8GB+ RAM)', 
        value: 'mid',
        score: { unity: 20, unreal: 10 }
      },
      { 
        id: 'q9-low', 
        text: '저사양', 
        value: 'low',
        score: { unity: 25, unreal: 0 }
      }
    ]
  }
];