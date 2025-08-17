# 🎮 게임 개발자 로드맵 진단 시스템

Unity와 Unreal Engine 중심의 맞춤형 게임 개발 학습 경로를 제공하는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🎯 **개인 맞춤형 진단**: 9개의 질문을 통한 정확한 프로필 분석
- 🏆 **엔진 추천 시스템**: Unity vs Unreal Engine 자동 매칭
- 📚 **상세 학습 로드맵**: 단계별 학습 계획 및 마일스톤
- 💾 **로드맵 다운로드**: Markdown 형식으로 저장 가능
- 🎨 **모던 UI/UX**: 다크 테마 기반 반응형 디자인

## 🚀 시작하기

### 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 미리보기
npm run preview
```

## 🛠️ 기술 스택

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📋 프로젝트 구조

```
src/
├── components/       # React 컴포넌트
│   ├── StartScreen.tsx
│   ├── QuestionCard.tsx
│   └── ResultScreen.tsx
├── data/            # 질문 데이터
│   └── questions.ts
├── types/           # TypeScript 타입 정의
│   └── index.ts
├── utils/           # 유틸리티 함수
│   ├── engineRecommendation.ts
│   ├── roadmapGenerator.ts
│   └── downloadRoadmap.ts
└── App.tsx          # 메인 앱 컴포넌트
```

## 🎯 진단 프로세스

1. **목표 설정**: 인디/AAA/모바일 개발자 선택
2. **역량 평가**: 프로그래밍 경험 및 언어 능력 체크
3. **선호 분야**: 관심 분야 및 그래픽 스타일 선택
4. **환경 확인**: 학습 시간 및 PC 사양 체크
5. **결과 분석**: Unity/Unreal 추천 및 맞춤형 로드맵 생성

## 🔍 주요 판단 기준

### Unity 추천
- C# 프로그래밍 경험
- 모바일 게임 개발 목표
- 2D/스타일라이즈드 그래픽
- 빠른 프로토타이핑 중시
- 중저사양 PC 환경

### Unreal Engine 추천
- C++ 프로그래밍 경험
- AAA 스튜디오 목표
- 포토리얼리스틱 그래픽
- 최고 품질 비주얼 중시
- 고사양 PC 환경

## 📝 라이선스

MIT License

## 👥 기여하기

이슈와 PR을 환영합니다!

## 🌐 라이브 데모

[배포 예정]