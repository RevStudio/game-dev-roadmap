import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Rocket, Code, Palette } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <div className="mb-8 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Gamepad2 className="w-24 h-24 text-purple-500" />
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl" />
          </motion.div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          게임 개발자 로드맵
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12">
          당신에게 맞는 게임 개발 학습 경로를 찾아드립니다
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass p-6 rounded-xl text-center"
          >
            <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">프로그래밍</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass p-6 rounded-xl text-center"
          >
            <Palette className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">아트 & 디자인</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass p-6 rounded-xl text-center"
          >
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDMyQzI0LjgzNjYgMzIgMzIgMjQuODM2NiAzMiAxNkMzMiA3LjE2MzQ0IDI0LjgzNjYgMCAxNiAwQzcuMTYzNDQgMCAwIDcuMTYzNDQgMCAxNkMwIDI0LjgzNjYgNy4xNjM0NCAzMiAxNiAzMloiIGZpbGw9IiM2NjdFRUEiLz4KPHBhdGggZD0iTTEzLjUgOEgxOC41VjI0SDE2VjEyLjVIMTZMMTMuNSAxNVY4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" 
              alt="Unity" className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Unity</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass p-6 rounded-xl text-center"
          >
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDMyQzI0LjgzNjYgMzIgMzIgMjQuODM2NiAzMiAxNkMzMiA3LjE2MzQ0IDI0LjgzNjYgMCAxNiAwQzcuMTYzNDQgMCAwIDcuMTYzNDQgMCAxNkMwIDI0LjgzNjYgNy4xNjM0NCAzMiAxNiAzMloiIGZpbGw9IiMwMEQ5RkYiLz4KPHBhdGggZD0iTTExIDhIMTNWMTdIMTFWOFpNMTEgMTlIMTNWMjFIMTFWMTlaTTE1IDhIMTdWMTBIMTVWOFpNMTUgMTJIMTdWMTRIMTVWMTJaTTE1IDE2SDE3VjIxSDE1VjE2Wk0xOSA4SDIxVjIxSDE5VjhaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=" 
              alt="Unreal" className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Unreal</p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-xl text-white flex items-center gap-3 mx-auto hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
        >
          시작하기
          <Rocket className="w-6 h-6" />
        </motion.button>

        <p className="mt-8 text-sm text-gray-500">
          약 10개의 질문 · 3-5분 소요
        </p>
      </motion.div>
    </div>
  );
};