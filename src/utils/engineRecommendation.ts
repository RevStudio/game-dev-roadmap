import type { UserProfile, EngineRecommendation } from '../types/index.js';

export function calculateEngineRecommendation(
  profile: UserProfile,
  scores: { unity: number; unreal: number }
): EngineRecommendation {
  let totalUnity = scores.unity;
  let totalUnreal = scores.unreal;
  
  // 언어 보너스 점수 추가 (중요도 높음)
  if (profile.language?.includes('csharp')) {
    totalUnity += 20;
  }
  if (profile.language?.includes('cpp')) {
    totalUnreal += 20;
  }
  if (profile.language?.includes('both')) {
    totalUnity += 10;
    totalUnreal += 10;
  }
  
  // 최대 가능 점수 계산 (정규화를 위해)
  const maxPossibleScore = 300; // 대략적인 최대 점수
  
  const recommendedEngine = totalUnity > totalUnreal ? 'Unity' : 'Unreal';
  const rawScore = recommendedEngine === 'Unity' ? totalUnity : totalUnreal;
  const otherScore = recommendedEngine === 'Unity' ? totalUnreal : totalUnity;
  
  // 매칭도 계산 (0-100%)
  // 선택된 엔진 점수와 다른 엔진 점수의 차이를 고려
  const scoreDifference = Math.abs(rawScore - otherScore);
  const basePercentage = (rawScore / maxPossibleScore) * 100;
  const bonusFromDifference = (scoreDifference / maxPossibleScore) * 30; // 차이가 클수록 보너스
  
  const matchingScore = Math.min(100, Math.round(basePercentage + bonusFromDifference));
  
  const reasons = generateReasons(profile, recommendedEngine);
  
  return {
    engine: recommendedEngine,
    score: matchingScore,
    reasons
  };
}

function generateReasons(profile: UserProfile, engine: 'Unity' | 'Unreal'): string[] {
  const reasons: string[] = [];
  
  if (engine === 'Unity') {
    // 언어 관련 이유를 최우선으로
    if (profile.language?.includes('csharp')) {
      reasons.push('✅ C# 경험을 100% 활용 가능 - 즉시 개발 시작 가능');
    } else if (profile.language?.includes('cpp')) {
      reasons.push('C++ 경험자도 C#을 빠르게 학습 가능 (1-2개월)');
    } else if (!profile.experience || profile.experience === 'no') {
      reasons.push('C#은 초보자가 배우기 가장 쉬운 게임 프로그래밍 언어');
    }
    
    if (profile.goal === 'mobile') {
      reasons.push('모바일 게임 개발에 최적화되어 있습니다');
    }
    if (profile.graphics === '2d' || profile.graphics === 'mobile-optimized') {
      reasons.push('2D 및 모바일 최적화에 강점이 있습니다');
    }
    if (profile.priority === 'speed' || profile.priority === 'cross-platform') {
      reasons.push('빠른 프로토타이핑과 크로스 플랫폼 지원이 우수합니다');
    }
    if (profile.specs === 'low' || profile.specs === 'mid') {
      reasons.push('상대적으로 낮은 시스템 요구사항');
    }
    if (profile.goal === 'indie') {
      reasons.push('인디 개발자에게 친화적인 생태계');
    }
  } else {
    // Unreal Engine - 언어 관련 이유를 최우선으로
    if (profile.language?.includes('cpp')) {
      reasons.push('✅ C++ 경험을 100% 활용 가능 - 전문가 수준 개발 가능');
    } else if (profile.language?.includes('csharp')) {
      reasons.push('C# 경험자도 C++로 전환 가능 (2-3개월) + 블루프린트 즉시 사용');
    } else if (!profile.experience || profile.experience === 'no') {
      reasons.push('블루프린트 비주얼 스크립팅으로 코딩 없이도 개발 가능');
    }
    
    if (profile.goal === 'aaa') {
      reasons.push('AAA 스튜디오 표준 엔진입니다');
    }
    if (profile.graphics === 'realistic') {
      reasons.push('포토리얼리스틱 그래픽의 최고 선택');
    }
    if (profile.priority === 'quality' || profile.priority === 'openworld') {
      reasons.push('최고 품질의 비주얼과 대규모 월드 구현에 최적');
    }
    if (profile.preferredField === 'graphics' || profile.preferredField === 'tech-art') {
      reasons.push('고급 그래픽스와 테크니컬 아트 도구가 강력합니다');
    }
  }
  
  if (reasons.length === 0) {
    reasons.push(
      engine === 'Unity' 
        ? '전반적인 프로필이 Unity 학습에 적합합니다'
        : '전반적인 프로필이 Unreal Engine 학습에 적합합니다'
    );
  }
  
  return reasons;
}