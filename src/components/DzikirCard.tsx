import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { Dzikir } from '../types';
import { useDzikirStore } from '../store/dzikirStore';

interface DzikirCardProps {
  dzikir: Dzikir;
  total: number;
  current: number;
  onComplete: () => void;
}

export function DzikirCard({ dzikir, onComplete }: DzikirCardProps) {
  const { incrementCounter, resetCounter, tabStates, activeTab } = useDzikirStore();
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const currentCount = tabStates[activeTab].counters[dzikir.id] || 0;
  const targetCount = parseInt(dzikir.count, 10);
  const isComplete = currentCount >= targetCount;

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      try {
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
          navigator.vibrate(1);
        } else {
          navigator.vibrate(pattern);
        }
      } catch (error) {
        console.warn('Vibration API error:', error);
      }
    }
  };

  const handleCount = () => {
    if (!isComplete) {
      incrementCounter(dzikir.id, targetCount);
      vibrate(50);
      
      if (currentCount + 1 === targetCount) {
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
          vibrate(100);
        } else {
          vibrate([100, 50, 100]);
        }
      }
    } else {
      onComplete();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection('left');
      setTimeout(onComplete, 150);
    },
    onSwipedRight: () => {
      setSwipeDirection('right');
      setTimeout(onComplete, 150);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 50,
    swipeDuration: 250,
    rotationAngle: 0
  });

  const variants = {
    enter: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right' | null) => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div 
        {...handlers}
        key={dzikir.id}
        className="w-full h-full"
        onClick={handleCount}
        custom={swipeDirection}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "tween", duration: 0.15 },
          opacity: { duration: 0.1 }
        }}
      >
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-lg h-full overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20" />
          
          <div className="relative flex flex-col h-full">
            {/* Title with gradient background */}
            <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl p-4 mb-6">
              <h2 className="text-lg font-medium">{dzikir.title}</h2>
            </div>
            
            {/* Arabic Text */}
            <motion.div 
              className="text-center flex-1"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="text-2xl sm:text-3xl font-arabic leading-[2.1] tracking-wide bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent"
                dangerouslySetInnerHTML={{ __html: dzikir.arabic }}
              />
              {dzikir.arabic_latin && (
                <div className="font-latin text-base sm:text-lg text-white/80 mt-4 font-normal italic tracking-wide">
                  {dzikir.arabic_latin}
                </div>
              )}
            </motion.div>

            {/* Translation with gradient border */}
            <div className="space-y-4 mt-6">
              <div className="font-latin text-sm sm:text-base leading-relaxed bg-white/5 rounded-xl p-4 border border-white/10">
                {dzikir.translated_id}
              </div>
              
              {dzikir.narrator && (
                <div className="font-latin text-xs text-white/70 italic bg-gradient-to-r from-white/10 to-transparent p-4 rounded-lg">
                  {dzikir.narrator}
                </div>
              )}
              
              {dzikir.faedah && (
                <motion.div 
                  className="mt-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <strong className="text-white/90 block mb-2">Faedah:</strong>
                  <p className="text-sm text-white/80">{dzikir.faedah}</p>
                </motion.div>
              )}
            </div>

            {/* Reset button with gradient hover effect */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetCounter(dzikir.id);
                vibrate(50);
              }}
              className="mt-6 flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 transition-all duration-300 border border-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span>Reset Counter</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}