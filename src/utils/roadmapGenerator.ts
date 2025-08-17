import type { UserProfile, Roadmap, Phase, Resource, Project } from '../types/index.js';

export function generateRoadmap(
  profile: UserProfile,
  engine: 'Unity' | 'Unreal'
): Roadmap {
  const isExperienced = profile.experience === 'yes';
  const hasProgramming = profile.language && profile.language.length > 0;
  
  if (engine === 'Unity') {
    return generateUnityRoadmap(profile, isExperienced, hasProgramming);
  } else {
    return generateUnrealRoadmap(profile, isExperienced, hasProgramming);
  }
}

function generateUnityRoadmap(
  profile: UserProfile,
  isExperienced: boolean,
  hasProgramming: boolean
): Roadmap {
  const phases: Phase[] = [];
  
  // C# 언어 학습 필요 여부 체크
  const needsCSharp = !profile.language?.includes('csharp');
  const hasOtherLanguage = profile.language && profile.language.length > 0 && !needsCSharp;
  
  if (!hasProgramming) {
    // 프로그래밍 경험이 전혀 없는 경우
    phases.push({
      id: 'phase-1',
      title: 'Phase 1: 프로그래밍 기초 & C# 입문',
      duration: '3-4개월',
      tasks: [
        '프로그래밍 기본 개념 (변수, 조건문, 반복문)',
        'C# 기초 문법 완벽 마스터',
        '객체지향 프로그래밍 (OOP) 개념',
        '자료구조와 알고리즘 기초',
        'Visual Studio 개발 환경 숙달',
        '간단한 콘솔 프로젝트 5개 이상 제작'
      ],
      milestone: 'C# 콘솔 프로그램 자유롭게 작성 가능'
    });
  } else if (needsCSharp && hasOtherLanguage) {
    // 다른 언어 경험은 있지만 C#은 처음인 경우
    phases.push({
      id: 'phase-1',
      title: 'Phase 1: C# 언어 전환 과정',
      duration: '1-2개월',
      tasks: [
        'C# 문법과 특징 학습',
        '.NET 프레임워크 이해',
        'C#만의 고유 기능 (LINQ, async/await, delegate)',
        'Unity에서 사용하는 C# 패턴',
        'C# 코딩 컨벤션과 베스트 프랙티스'
      ],
      milestone: 'C#으로 Unity 스크립트 작성 가능'
    });
  }
  
  phases.push({
    id: 'phase-2',
    title: hasProgramming ? 'Phase 1: Unity 엔진 입문' : 'Phase 2: Unity 엔진 입문',
    duration: '3-4개월',
    tasks: [
      'Unity 에디터 인터페이스 숙달',
      '게임오브젝트와 컴포넌트 시스템',
      '기본 스크립팅과 MonoBehaviour',
      '프리팹과 씬 관리',
      '기본 물리 엔진 활용'
    ],
    milestone: '간단한 2D 게임 프로토타입 완성'
  });
  
  phases.push({
    id: 'phase-3',
    title: `Phase ${phases.length + 1}: Unity 심화`,
    duration: '3-4개월',
    tasks: [
      'UI 시스템 (UI Toolkit/Canvas)',
      '애니메이션 시스템',
      '파티클 시스템',
      '라이팅과 셰이더 기초',
      '오디오 시스템'
    ],
    milestone: '완성도 있는 미니게임 2개 제작'
  });
  
  if (profile.preferredField === 'graphics' || profile.preferredField === 'tech-art') {
    phases.push({
      id: 'phase-4',
      title: `Phase ${phases.length + 1}: 전문 분야 - 비주얼`,
      duration: '3-4개월',
      tasks: [
        'Shader Graph 마스터',
        'URP/HDRP 파이프라인',
        'Post Processing',
        'VFX Graph',
        '최적화 기법'
      ],
      milestone: '비주얼 포트폴리오 완성'
    });
  } else if (profile.preferredField === 'network') {
    phases.push({
      id: 'phase-4',
      title: `Phase ${phases.length + 1}: 전문 분야 - 멀티플레이어`,
      duration: '3-4개월',
      tasks: [
        'Netcode for GameObjects',
        'Mirror 네트워킹',
        'Photon 활용',
        '서버 아키텍처 이해',
        '동기화와 보안'
      ],
      milestone: '멀티플레이어 게임 출시'
    });
  } else {
    phases.push({
      id: 'phase-4',
      title: `Phase ${phases.length + 1}: 포트폴리오 구축`,
      duration: '4-5개월',
      tasks: [
        '독창적인 게임 기획',
        '완성도 높은 게임 개발',
        'Google Play/App Store 출시',
        'GitHub 포트폴리오 정리',
        '개발 블로그 작성'
      ],
      milestone: '상업 게임 1개 출시'
    });
  }
  
  const resources: Resource[] = [
    {
      title: 'Unity Learn',
      type: 'free',
      url: 'https://learn.unity.com',
      description: 'Unity 공식 무료 학습 플랫폼'
    },
    {
      title: 'Brackeys YouTube',
      type: 'free',
      url: 'https://youtube.com/brackeys',
      description: '초보자 친화적인 Unity 튜토리얼'
    },
    {
      title: 'Unity 공식 문서',
      type: 'free',
      url: 'https://docs.unity3d.com',
      description: '상세한 API 레퍼런스와 가이드'
    }
  ];
  
  resources.push({
    title: 'GameDev.tv Unity 코스',
    type: 'paid',
    url: 'https://www.gamedev.tv',
    description: '체계적인 Unity 마스터 과정'
  });
  
  const projects: Project[] = [
    {
      title: 'Flappy Bird 클론',
      difficulty: 'beginner',
      duration: '1주',
      description: '기본 게임 메커니즘 학습'
    },
    {
      title: '2D 플랫포머',
      difficulty: 'intermediate',
      duration: '1개월',
      description: '캐릭터 컨트롤과 레벨 디자인'
    },
    {
      title: '3D 퍼즐 게임',
      difficulty: 'intermediate',
      duration: '2개월',
      description: '3D 공간과 물리 엔진 활용'
    },
    {
      title: '나만의 독창적 게임',
      difficulty: 'advanced',
      duration: '3-4개월',
      description: '포트폴리오용 완성작'
    }
  ];
  
  const totalMonths = phases.reduce((acc, phase) => {
    const duration = parseInt(phase.duration.split('-')[1] || phase.duration.split('-')[0]);
    return acc + duration;
  }, 0);
  
  // 난이도 계산 (언어 경험 반영)
  let difficulty = 4; // 기본 난이도
  if (profile.language?.includes('csharp')) {
    difficulty = 2; // C# 경험자는 매우 쉬움
  } else if (hasProgramming) {
    difficulty = 3; // 다른 언어 경험자는 보통
  } else {
    difficulty = 4; // 프로그래밍 초보자는 어려움
  }
  
  return {
    title: 'Unity 게임 개발자 로드맵',
    duration: `${Math.floor(totalMonths / 12)}년 ${totalMonths % 12}개월`,
    difficulty,
    phases,
    tools: ['Unity Hub', 'Visual Studio', 'Git', 'Blender (선택)', 'Photoshop (선택)'],
    resources,
    projects
  };
}

function generateUnrealRoadmap(
  profile: UserProfile,
  isExperienced: boolean,
  hasProgramming: boolean
): Roadmap {
  const phases: Phase[] = [];
  
  // C++ 언어 학습 필요 여부 체크
  const needsCpp = !profile.language?.includes('cpp');
  const hasCSharp = profile.language?.includes('csharp');
  const hasOtherLanguage = profile.language && profile.language.length > 0 && !needsCpp;
  
  if (!hasProgramming) {
    // 프로그래밍 경험이 전혀 없는 경우
    phases.push({
      id: 'phase-1',
      title: 'Phase 1: 프로그래밍 기초 & C++ 입문',
      duration: '4-6개월',
      tasks: [
        '프로그래밍 기본 개념 학습',
        'C++ 기초 문법 (변수, 함수, 클래스)',
        '포인터와 메모리 관리 완벽 이해',
        '객체지향 프로그래밍 심화',
        'STL(Standard Template Library) 활용',
        '블루프린트 비주얼 스크립팅 병행 학습',
        'Visual Studio 디버깅 마스터'
      ],
      milestone: 'C++ 기초 프로그램 작성 및 블루프린트 활용 가능'
    });
  } else if (needsCpp && hasCSharp) {
    // C# 경험자가 C++로 전환하는 경우
    phases.push({
      id: 'phase-1',
      title: 'Phase 1: C#에서 C++로 전환',
      duration: '2-3개월',
      tasks: [
        'C++와 C#의 차이점 이해',
        '수동 메모리 관리 (new/delete, 스마트 포인터)',
        '포인터와 참조 완벽 이해',
        'C++ 템플릿과 제네릭의 차이',
        'Unreal C++ 코딩 표준',
        '블루프린트와 C++ 연동'
      ],
      milestone: 'Unreal C++ 클래스 작성 가능'
    });
  } else if (needsCpp && hasOtherLanguage) {
    // 다른 언어 경험자가 C++를 배우는 경우
    phases.push({
      id: 'phase-1',
      title: 'Phase 1: C++ 언어 전환 과정',
      duration: '2-3개월',
      tasks: [
        'C++ 문법과 특징 학습',
        '메모리 관리와 포인터',
        'C++ 표준 라이브러리 (STL)',
        'Unreal Engine C++ 특징',
        '블루프린트 기초 (C++ 대안)',
        'Visual Studio 환경 설정'
      ],
      milestone: 'C++ 또는 블루프린트로 게임 로직 구현 가능'
    });
  }
  
  phases.push({
    id: 'phase-2',
    title: hasProgramming ? 'Phase 1: Unreal Engine 입문' : 'Phase 2: Unreal Engine 입문',
    duration: '3-4개월',
    tasks: [
      'Unreal Editor 인터페이스 마스터',
      '액터와 컴포넌트 시스템',
      '게임플레이 프레임워크',
      '레벨 디자인 기초',
      '기본 머티리얼 제작'
    ],
    milestone: '3D 액션 게임 프로토타입 완성'
  });
  
  phases.push({
    id: 'phase-3',
    title: `Phase ${phases.length + 1}: Unreal 심화`,
    duration: '4-5개월',
    tasks: [
      'Advanced C++ 게임플레이',
      'AI와 Behavior Tree',
      'UMG UI 시스템',
      '애니메이션 블루프린트',
      '나이아가라 파티클 시스템'
    ],
    milestone: 'AAA 품질 데모 제작'
  });
  
  if (profile.preferredField === 'graphics' || profile.preferredField === 'tech-art') {
    phases.push({
      id: 'phase-4',
      title: `Phase ${phases.length + 1}: 전문 분야 - 비주얼 아트`,
      duration: '4-5개월',
      tasks: [
        '머티리얼 에디터 마스터',
        'Lumen 글로벌 일루미네이션',
        'Nanite 가상화 지오메트리',
        '나이아가라 VFX 고급',
        '시네마틱 시퀀서'
      ],
      milestone: '테크 데모 릴 제작'
    });
  } else if (profile.preferredField === 'network') {
    phases.push({
      id: 'phase-4',
      title: `Phase ${phases.length + 1}: 전문 분야 - 멀티플레이어`,
      duration: '4-5개월',
      tasks: [
        'Unreal 리플리케이션 시스템',
        'Dedicated Server 구축',
        'Network Prediction',
        'Steam/EOS 통합',
        '대규모 멀티플레이어 최적화'
      ],
      milestone: '멀티플레이어 게임 출시'
    });
  } else {
    phases.push({
      id: 'phase-4',
      title: `Phase ${phases.length + 1}: AAA 프로젝트`,
      duration: '5-6개월',
      tasks: [
        '대규모 프로젝트 아키텍처',
        '퍼포먼스 프로파일링',
        '월드 파티션 시스템',
        'PCG (Procedural Content)',
        'Steam/Epic 스토어 출시'
      ],
      milestone: '상업 품질 게임 완성'
    });
  }
  
  const resources: Resource[] = [
    {
      title: 'Unreal Online Learning',
      type: 'free',
      url: 'https://learn.unrealengine.com',
      description: 'Epic Games 공식 학습 플랫폼'
    },
    {
      title: 'Tom Looman C++ Course',
      type: 'free',
      url: 'https://tomlooman.com',
      description: 'Unreal C++ 전문 강좌'
    },
    {
      title: 'Unreal 공식 문서',
      type: 'free',
      url: 'https://docs.unrealengine.com',
      description: '포괄적인 엔진 문서'
    }
  ];
  
  resources.push({
    title: 'GameDev.tv Unreal 코스',
    type: 'paid',
    description: '초보자부터 전문가까지 체계적 커리큘럼'
  });
  
  const projects: Project[] = [
    {
      title: 'FPS 프로토타입',
      difficulty: 'beginner',
      duration: '2주',
      description: '기본 슈팅 메커니즘'
    },
    {
      title: '3인칭 액션 게임',
      difficulty: 'intermediate',
      duration: '2개월',
      description: '캐릭터 컨트롤과 전투 시스템'
    },
    {
      title: '오픈월드 RPG 데모',
      difficulty: 'advanced',
      duration: '3-4개월',
      description: '대규모 월드와 퀘스트 시스템'
    },
    {
      title: 'AAA 품질 포트폴리오',
      difficulty: 'advanced',
      duration: '4-5개월',
      description: '취업용 하이엔드 프로젝트'
    }
  ];
  
  const totalMonths = phases.reduce((acc, phase) => {
    const duration = parseInt(phase.duration.split('-')[1] || phase.duration.split('-')[0]);
    return acc + duration;
  }, 0);
  
  // 난이도 계산 (언어 경험 반영)
  let difficulty = 5; // 기본 난이도 (Unreal은 Unity보다 어려움)
  if (profile.language?.includes('cpp')) {
    difficulty = 3; // C++ 경험자는 보통
  } else if (profile.language?.includes('csharp')) {
    difficulty = 4; // C# 경험자는 약간 어려움 (언어 전환 필요)
  } else if (hasProgramming) {
    difficulty = 4; // 다른 언어 경험자
  } else {
    difficulty = 5; // 프로그래밍 초보자는 매우 어려움
  }
  
  return {
    title: 'Unreal Engine 개발자 로드맵',
    duration: `${Math.floor(totalMonths / 12)}년 ${totalMonths % 12}개월`,
    difficulty,
    phases,
    tools: ['Unreal Engine', 'Visual Studio', 'Git', 'Perforce (선택)', 'Houdini (선택)'],
    resources,
    projects
  };
}