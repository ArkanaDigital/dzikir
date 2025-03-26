import React from 'react';
import { Timer, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dzikir } from '../types';
import { useDzikirStore } from '../store/dzikirStore';

interface CounterCardProps {
  dzikir: Dzikir;
}

export function CounterCard({ dzikir }: CounterCardProps) {
  const { tabStates, activeTab } = useDzikirStore();
  const currentCount = tabStates[activeTab].counters[dzikir.id] || 0;
  const targetCount = parseInt(dzikir.count, 10);
  const isComplete = currentCount >= targetCount;
  const counterProgress = (currentCount / targetCount) * 100;

  // Trim title if it's longer than 30 characters
  const trimmedTitle = dzikir.title.length > 30 
    ? `${dzikir.title.substring(0, 30)}...`
    : dzikir.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Counter Info */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {isComplete ? (
              <div className="bg-green-500/20 p-1.5 rounded-full flex-shrink-0">
                <Check className="w-4 h-4 text-green-400" />
              </div>
            ) : (
              <div className="bg-white/20 p-1.5 rounded-full flex-shrink-0">
                <Timer className="w-4 h-4" />
              </div>
            )}
            <h3 className="text-sm font-medium truncate" title={dzikir.title}>
              {trimmedTitle}
            </h3>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0 ml-3">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold tracking-tight">{currentCount}</span>
              <span className="text-sm text-white/60 ml-1">/ {dzikir.count}</span>
            </div>
            <div className="w-20 h-1.5 bg-white/10 rounded-full">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isComplete
                    ? 'bg-green-400'
                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                }`}
                style={{ width: `${counterProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}