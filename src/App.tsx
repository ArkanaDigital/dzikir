import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { Sun, Moon, Star, Layers as Prayer } from 'lucide-react';
import { DzikirCard } from './components/DzikirCard';
import { CounterCard } from './components/CounterCard';
import { useDzikirStore } from './store/dzikirStore';
import dzikirData from './data/dzikir.json';
import { DzikirType } from './types';

const tabs: { id: DzikirType; label: string; icon: React.ReactNode }[] = [
  { id: 'pagi', label: 'Pagi', icon: <Sun className="w-6 h-6" /> },
  { id: 'petang', label: 'Petang', icon: <Moon className="w-6 h-6" /> },
  { id: 'sholat', label: 'Sholat', icon: <Prayer className="w-6 h-6" /> },
  { id: 'ramadhan', label: 'Ramadhan', icon: <Star className="w-6 h-6" /> },
];

function App() {
  const { activeTab, setActiveTab, getCurrentIndex, setCurrentIndex, resetAllCounters } = useDzikirStore();
  const currentIndex = getCurrentIndex();

  const currentDzikirs = dzikirData[activeTab];
  const totalDzikirs = currentDzikirs.length;
  const progress = ((currentIndex + 1) / totalDzikirs) * 100;

  const handleNext = () => {
    if (currentIndex < totalDzikirs - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset all counters and progress when reaching the last dzikir
      resetAllCounters();
      setCurrentIndex(0);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E4C94] to-[#361F75]">
      <div className="relative min-h-screen text-white">
        {/* Header with Progress and Counter */}
        <div className="fixed top-0 left-0 right-0 z-10">
          <div className="h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="bg-white/5 backdrop-blur-lg">
            <div className="container mx-auto">
              {currentDzikirs[currentIndex] && (
                <CounterCard 
                  dzikir={currentDzikirs[currentIndex]} 
                />
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-24 pb-24">
          <div className="container mx-auto px-4" {...handlers}>
            {currentDzikirs[currentIndex] && (
              <DzikirCard
                dzikir={currentDzikirs[currentIndex]}
                total={totalDzikirs}
                current={currentIndex + 1}
                onComplete={handleNext}
              />
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/10 backdrop-blur-lg border-t border-white/10">
          <div className="container h-full">
            <div className="flex h-full justify-around items-center px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex flex-col items-center py-3 px-6 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white bg-white/20 scale-110 shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                >
                  <div className="mb-1.5">{tab.icon}</div>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;