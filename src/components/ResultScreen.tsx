import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Clock, Target, BookOpen, Wrench, 
  CheckCircle, Star, Download, RefreshCw 
} from 'lucide-react';
import type { EngineRecommendation, Roadmap } from '../types/index.js';
import { downloadRoadmap } from '../utils/downloadRoadmap.js';

interface ResultScreenProps {
  recommendation: EngineRecommendation;
  roadmap: Roadmap;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  recommendation,
  roadmap,
  onRestart
}) => {
  const engineColor = recommendation.engine === 'Unity' ? 'purple' : 'blue';
  const engineGradient = recommendation.engine === 'Unity' 
    ? 'from-purple-600 to-pink-600' 
    : 'from-blue-600 to-cyan-600';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Engine Recommendation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            추천 엔진: 
            <span className={`bg-gradient-to-r ${engineGradient} bg-clip-text text-transparent ml-3`}>
              {recommendation.engine}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`flex items-center gap-1`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(recommendation.score / 20) 
                      ? `text-${engineColor}-500 fill-current` 
                      : 'text-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">매칭도 {recommendation.score}%</span>
          </div>
        </motion.div>

        {/* Reasons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className={`text-${engineColor}-500`} />
            선택 이유
          </h2>
          <ul className="space-y-2">
            {recommendation.reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className={`text-${engineColor}-500 w-5 h-5 mt-0.5 flex-shrink-0`} />
                <span className="text-gray-300">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Roadmap Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">{roadmap.title}</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-xl p-4">
              <Clock className="text-blue-400 w-6 h-6 mb-2" />
              <p className="text-sm text-gray-400">예상 기간</p>
              <p className="text-xl font-semibold">{roadmap.duration}</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4">
              <Target className="text-green-400 w-6 h-6 mb-2" />
              <p className="text-sm text-gray-400">난이도</p>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 rounded ${
                      i < roadmap.difficulty ? 'bg-green-400' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4">
              <BookOpen className="text-purple-400 w-6 h-6 mb-2" />
              <p className="text-sm text-gray-400">학습 단계</p>
              <p className="text-xl font-semibold">{roadmap.phases.length}개</p>
            </div>
          </div>
        </motion.div>

        {/* Learning Phases */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">학습 로드맵</h2>
          <div className="space-y-4">
            {roadmap.phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{phase.title}</h3>
                  <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    {phase.duration}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2 text-gray-300">
                      <span className="text-gray-500">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">
                    <span className="text-green-400 font-semibold">마일스톤:</span> {phase.milestone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Resources */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Wrench className="text-orange-400" />
              필수 도구
            </h3>
            <div className="flex flex-wrap gap-2">
              {roadmap.tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-400" />
              학습 리소스
            </h3>
            <ul className="space-y-2">
              {roadmap.resources.slice(0, 3).map((resource, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    resource.type === 'free' 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {resource.type === 'free' ? '무료' : '유료'}
                  </span>
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-sm text-gray-400">{resource.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Projects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4">추천 프로젝트</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {roadmap.projects.map((project, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{project.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.difficulty === 'beginner' 
                      ? 'bg-green-900/50 text-green-400'
                      : project.difficulty === 'intermediate'
                      ? 'bg-yellow-900/50 text-yellow-400'
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {project.difficulty === 'beginner' ? '초급' 
                      : project.difficulty === 'intermediate' ? '중급' : '고급'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-1">{project.description}</p>
                <p className="text-xs text-gray-500">예상 기간: {project.duration}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => downloadRoadmap(roadmap, recommendation)}
            className={`px-8 py-3 bg-gradient-to-r ${engineGradient} rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}>
            <Download className="w-5 h-5" />
            로드맵 다운로드
          </button>
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-gray-800 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            다시 시작
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};