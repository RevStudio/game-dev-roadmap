import type { Roadmap, EngineRecommendation } from '../types/index.js';

export function downloadRoadmap(roadmap: Roadmap, recommendation: EngineRecommendation) {
  const content = generateMarkdownContent(roadmap, recommendation);
  downloadFile(content, `${recommendation.engine}_게임개발_로드맵.md`);
}

function generateMarkdownContent(roadmap: Roadmap, recommendation: EngineRecommendation): string {
  const date = new Date().toLocaleDateString('ko-KR');
  
  let content = `# 🎮 ${roadmap.title}\n\n`;
  content += `> 생성일: ${date}\n\n`;
  
  // 추천 엔진 섹션
  content += `## 📊 추천 결과\n\n`;
  content += `### 추천 엔진: ${recommendation.engine}\n`;
  content += `- **매칭도**: ${recommendation.score}%\n\n`;
  content += `### 선택 이유\n`;
  recommendation.reasons.forEach(reason => {
    content += `- ${reason}\n`;
  });
  content += '\n';
  
  // 개요 섹션
  content += `## 📋 학습 개요\n\n`;
  content += `- **예상 기간**: ${roadmap.duration}\n`;
  content += `- **난이도**: ${'⭐'.repeat(roadmap.difficulty)}${'☆'.repeat(5 - roadmap.difficulty)}\n`;
  content += `- **학습 단계**: ${roadmap.phases.length}개\n\n`;
  
  // 학습 로드맵 섹션
  content += `## 📚 학습 로드맵\n\n`;
  roadmap.phases.forEach((phase, index) => {
    content += `### ${phase.title}\n`;
    content += `> 기간: ${phase.duration}\n\n`;
    content += `#### 학습 내용\n`;
    phase.tasks.forEach(task => {
      content += `- [ ] ${task}\n`;
    });
    content += `\n**✅ 마일스톤**: ${phase.milestone}\n\n`;
    if (index < roadmap.phases.length - 1) {
      content += '---\n\n';
    }
  });
  
  // 필수 도구 섹션
  content += `## 🛠️ 필수 도구\n\n`;
  roadmap.tools.forEach(tool => {
    content += `- ${tool}\n`;
  });
  content += '\n';
  
  // 학습 리소스 섹션
  content += `## 📖 추천 학습 리소스\n\n`;
  content += `### 무료 리소스\n`;
  roadmap.resources
    .filter(r => r.type === 'free')
    .forEach(resource => {
      content += `- **${resource.title}**: ${resource.description}`;
      if (resource.url) {
        content += ` [링크](${resource.url})`;
      }
      content += '\n';
    });
  
  const paidResources = roadmap.resources.filter(r => r.type === 'paid');
  if (paidResources.length > 0) {
    content += `\n### 유료 리소스\n`;
    paidResources.forEach(resource => {
      content += `- **${resource.title}**: ${resource.description}`;
      if (resource.url) {
        content += ` [링크](${resource.url})`;
      }
      content += '\n';
    });
  }
  content += '\n';
  
  // 추천 프로젝트 섹션
  content += `## 💡 추천 프로젝트\n\n`;
  roadmap.projects.forEach((project, index) => {
    const difficultyKorean = 
      project.difficulty === 'beginner' ? '초급' :
      project.difficulty === 'intermediate' ? '중급' : '고급';
    
    content += `### ${index + 1}. ${project.title} (${difficultyKorean})\n`;
    content += `- **설명**: ${project.description}\n`;
    content += `- **예상 기간**: ${project.duration}\n\n`;
  });
  
  // 학습 팁 섹션
  content += `## 💪 학습 팁\n\n`;
  content += `1. **일관성이 중요합니다**: 매일 조금씩이라도 꾸준히 학습하세요.\n`;
  content += `2. **실습 위주로 학습하세요**: 이론보다 직접 만들어보면서 배우는 것이 효과적입니다.\n`;
  content += `3. **포트폴리오를 구축하세요**: 학습하면서 만든 프로젝트를 GitHub에 올리고 정리하세요.\n`;
  content += `4. **커뮤니티에 참여하세요**: Discord, Reddit 등에서 다른 개발자들과 교류하세요.\n`;
  content += `5. **문서를 읽는 습관을 기르세요**: 공식 문서는 가장 정확한 정보원입니다.\n\n`;
  
  // 체크리스트 섹션
  content += `## ✅ 진도 체크리스트\n\n`;
  content += `### 월별 목표\n`;
  const totalMonths = roadmap.phases.reduce((acc, phase) => {
    const months = parseInt(phase.duration.split('-')[1] || phase.duration.split('-')[0]);
    return acc + months;
  }, 0);
  
  for (let i = 1; i <= Math.min(totalMonths, 12); i++) {
    content += `- [ ] ${i}개월차 목표 달성\n`;
  }
  content += '\n';
  
  // 노트 섹션
  content += `## 📝 학습 노트\n\n`;
  content += `### 주요 개념 정리\n\n`;
  content += `(여기에 학습하면서 중요한 개념들을 정리하세요)\n\n`;
  content += `### 문제 해결 기록\n\n`;
  content += `(여기에 겪었던 문제와 해결 방법을 기록하세요)\n\n`;
  content += `### 참고 링크\n\n`;
  content += `(여기에 유용한 링크들을 모아두세요)\n\n`;
  
  // 푸터
  content += `---\n\n`;
  content += `> 이 로드맵은 게임 개발자 로드맵 진단 시스템에서 생성되었습니다.\n`;
  content += `> ${recommendation.engine} Engine로 게임 개발의 꿈을 이루세요! 🚀\n`;
  
  return content;
}

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}