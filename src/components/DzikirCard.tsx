import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Dzikir } from '../types';
import { useDzikirStore } from '../store/dzikirStore';
import dzikirData from '../data/dzikir.json';

interface DzikirCardProps {
  dzikir: Dzikir;
  total: number;
  current: number;
  onComplete: () => void;
  onPrevious: () => void;
}

export function DzikirCard({ onComplete, onPrevious }: DzikirCardProps) {
  const { incrementCounter, resetCounter, tabStates, activeTab, resetAllCounters, setCurrentIndex } = useDzikirStore();
  const currentDzikirs = dzikirData[activeTab];
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null);

  // Reset slide position when activeTab changes
  React.useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(0, 0); // Second parameter is speed (0 means instant)
    }
  }, [activeTab, swiperInstance]);

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

  const handleCount = (dzikir: Dzikir, index: number) => {
    const currentCount = tabStates[activeTab].counters[dzikir.id] || 0;
    const targetCount = parseInt(dzikir.count, 10);
    const isComplete = currentCount >= targetCount;

    if (!isComplete) {
      incrementCounter(dzikir.id, targetCount);
      vibrate(50);
      
      if (currentCount + 1 === targetCount) {
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
          vibrate(100);
        } else {
          vibrate([100, 50, 100]);
        }

        if (index === currentDzikirs.length - 1) {
          setTimeout(() => {
            resetAllCounters();
            swiperInstance?.slideTo(0);
            setCurrentIndex(0);
          }, 500);
        } else {
          setTimeout(() => {
            swiperInstance?.slideNext();
          }, 500);
        }
      }
    }
  };

  // Handle manual slide changes
  const handleSlideChange = () => {
    if (swiperInstance) {
      setCurrentIndex(swiperInstance.activeIndex);
    }
  };

  return (
    <Swiper
      grabCursor={true}
      onSlideNextTransitionStart={onComplete}
      onSlidePrevTransitionStart={onPrevious}
      onSlideChange={handleSlideChange}
      className="dzikir-swiper"
      onSwiper={setSwiperInstance}
      spaceBetween={20}
      speed={400}
      touchEventsTarget="container"
    >
      {currentDzikirs.map((dzikir, index) => (
        <SwiperSlide key={dzikir.id}>
          <div 
            className="relative bg-gradient-to-br from-[#1E4C94]/90 to-[#361F75]/90 backdrop-blur-xl rounded-2xl border border-white/10 h-full w-full overflow-hidden"
            onClick={() => handleCount(dzikir, index)}
          >
            <div className="h-full overflow-y-auto px-4 py-5">
              {/* Title and Counter */}
              <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 mb-5 border border-white/10">
                <h2 className="text-xl font-medium">{dzikir.title}</h2>
                <div className="mt-2 text-sm text-white/70">
                  {tabStates[activeTab].counters[dzikir.id] || 0} / {dzikir.count}
                </div>
              </div>
              
              {/* Arabic Text */}
              <div className="text-center mb-5">
                <div 
                  className="text-3xl sm:text-4xl font-arabic leading-[2.1] tracking-wide text-white"
                  dangerouslySetInnerHTML={{ __html: dzikir.arabic }}
                />
                {dzikir.arabic_latin && (
                  <div className="font-latin text-lg sm:text-xl text-white/90 mt-4 font-normal italic tracking-wide">
                    {dzikir.arabic_latin}
                  </div>
                )}
              </div>

              {/* Translation and Additional Info */}
              <div className="space-y-4">
                <div className="font-latin text-base sm:text-lg leading-relaxed bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  {dzikir.translated_id}
                </div>
                
                {dzikir.narrator && (
                  <div className="font-latin text-sm text-white/80 italic bg-black/20 backdrop-blur-md p-4 rounded-lg border border-white/10">
                    {dzikir.narrator}
                  </div>
                )}
                
                {dzikir.faedah && (
                  <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <strong className="text-white/90 block mb-2">Faedah:</strong>
                    <p className="text-sm text-white/80">{dzikir.faedah}</p>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetCounter(dzikir.id);
                  vibrate(50);
                }}
                className="mt-5 flex items-center justify-center w-full py-3 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300 border border-white/10 backdrop-blur-md"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                <span>Reset Counter</span>
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}