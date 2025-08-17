import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Question } from '../types/index.js';

interface QuestionCardProps {
  question: Question;
  selectedOptions: string[];
  onOptionSelect: (optionId: string) => void;
  onNext: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptions,
  onOptionSelect,
  onNext,
  currentIndex,
  totalQuestions
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            질문 {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(progress)}% 완료
          </span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="glass rounded-2xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOptionSelect(option.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedOptions.includes(option.id)
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option.text}</span>
                {selectedOptions.includes(option.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 h-[56px]">
          {selectedOptions.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onNext}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};