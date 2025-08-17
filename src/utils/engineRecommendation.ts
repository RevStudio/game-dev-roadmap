import type { UserProfile, EngineRecommendation } from '../types/index.js';

export function calculateEngineRecommendation(
  profile: UserProfile,
  scores: { unity: number; unreal: number }
): EngineRecommendation {
  const totalUnity = scores.unity;
  const totalUnreal = scores.unreal;
  
  const recommendedEngine = totalUnity > totalUnreal ? 'Unity' : 'Unreal';
  const score = recommendedEngine === 'Unity' ? totalUnity : totalUnreal;
  
  const reasons = generateReasons(profile, recommendedEngine);
  
  return {
    engine: recommendedEngine,
    score,
    reasons
  };
}

function generateReasons(profile: UserProfile, engine: 'Unity' | 'Unreal'): string[] {
  const reasons: string[] = [];
  
  if (engine === 'Unity') {
    if (profile.goal === 'mobile') {
      reasons.push('모바일 게임 개발에 최적화되어 있습니다');
    }
    if (profile.language?.includes('csharp')) {
      reasons.push('C# 경험을 바로 활용할 수 있습니다');
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
    if (profile.goal === 'aaa') {
      reasons.push('AAA 스튜디오 표준 엔진입니다');
    }
    if (profile.language?.includes('cpp')) {
      reasons.push('C++ 경험을 최대한 활용할 수 있습니다');
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