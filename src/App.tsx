import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';
import { questions } from './data/questions';
import { calculateEngineRecommendation } from './utils/engineRecommendation';
import { generateRoadmap } from './utils/roadmapGenerator';
import type { UserProfile, EngineRecommendation, Roadmap } from './types/index.js';

type AppState = 'start' | 'questions' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [engineScores, setEngineScores] = useState({ unity: 0, unreal: 0 });
  const [recommendation, setRecommendation] = useState<EngineRecommendation | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [questionPath, setQuestionPath] = useState<string[]>(['q1']);

  const currentQuestion = questions.find(q => q.id === questionPath[currentQuestionIndex]);
  
  // 실제 답변할 질문 수 계산 (조건부 질문 고려)
  const getTotalQuestions = () => {
    const baseQuestions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'];
    const hasProgExp = userProfile.experience === 'yes';
    const hasEngineExp = questionPath.includes('q4-1');
    
    // 기본 9개 + 조건부 질문들
    let total = baseQuestions.length;
    if (hasProgExp || questionPath.includes('q3-1')) total++; // q3-1
    if (hasEngineExp) total++; // q4-1
    
    return Math.min(total, 11); // 최대 11개
  };

  const handleStart = () => {
    setAppState('questions');
  };

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'single') {
      setSelectedOptions([optionId]);
    } else {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    // Update scores
    const newScores = { ...engineScores };
    selectedOptions.forEach(optionId => {
      const option = currentQuestion.options.find(o => o.id === optionId);
      if (option?.score) {
        newScores.unity += option.score.unity || 0;
        newScores.unreal += option.score.unreal || 0;
      }
    });
    setEngineScores(newScores);

    // Update user profile
    const newProfile = { ...userProfile };
    const selectedValues = selectedOptions.map(id => 
      currentQuestion.options.find(o => o.id === id)?.value
    ).filter(Boolean);

    switch (currentQuestion.category) {
      case 'goal':
        if (currentQuestion.id === 'q2') {
          newProfile.goal = selectedValues[0];
        }
        break;
      case 'skill':
        if (currentQuestion.id === 'q3') {
          newProfile.experience = selectedValues[0];
        } else if (currentQuestion.id === 'q3-1') {
          newProfile.language = selectedValues.filter((v): v is string => v !== undefined);
        } else if (currentQuestion.id === 'q4-1') {
          newProfile.engine = selectedValues.filter((v): v is string => v !== undefined);
        }
        break;
      case 'preference':
        if (currentQuestion.id === 'q5') {
          newProfile.preferredField = selectedValues[0];
        } else if (currentQuestion.id === 'q6') {
          newProfile.graphics = selectedValues[0];
        } else if (currentQuestion.id === 'q7') {
          newProfile.priority = selectedValues[0];
        }
        break;
      case 'environment':
        if (currentQuestion.id === 'q8') {
          newProfile.timeAvailable = selectedValues[0];
        } else if (currentQuestion.id === 'q9') {
          newProfile.specs = selectedValues[0];
        }
        break;
    }
    setUserProfile(newProfile);

    // Determine next question
    const selectedOption = currentQuestion.options.find(o => o.id === selectedOptions[0]);
    let nextQuestionId: string | undefined;

    if (selectedOption?.nextQuestionId) {
      nextQuestionId = selectedOption.nextQuestionId;
    } else {
      // Default flow
      const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
      if (currentIndex < questions.length - 1) {
        nextQuestionId = questions[currentIndex + 1].id;
      }
    }

    if (nextQuestionId) {
      setQuestionPath([...questionPath.slice(0, currentQuestionIndex + 1), nextQuestionId]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    } else {
      // Calculate final results
      const finalRecommendation = calculateEngineRecommendation(newProfile, newScores);
      const finalRoadmap = generateRoadmap(newProfile, finalRecommendation.engine);
      setRecommendation(finalRecommendation);
      setRoadmap(finalRoadmap);
      setAppState('result');
    }
  };

  const handleRestart = () => {
    setAppState('start');
    setCurrentQuestionIndex(0);
    setUserProfile({});
    setSelectedOptions([]);
    setEngineScores({ unity: 0, unreal: 0 });
    setRecommendation(null);
    setRoadmap(null);
    setQuestionPath(['q1']);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <AnimatePresence mode="wait">
        {appState === 'start' && (
          <StartScreen onStart={handleStart} />
        )}
        
        {appState === 'questions' && currentQuestion && (
          <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
              onNext={handleNext}
              currentIndex={currentQuestionIndex}
              totalQuestions={getTotalQuestions()}
            />
          </div>
        )}
        
        {appState === 'result' && recommendation && roadmap && (
          <ResultScreen
            recommendation={recommendation}
            roadmap={roadmap}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;