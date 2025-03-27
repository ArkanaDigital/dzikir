import React from 'react';
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
  const { activeTab, setActiveTab, getCurrentIndex, setCurrentIndex, resetAllCounters, tabStates } = useDzikirStore();
  const currentIndex = getCurrentIndex();
  const currentDzikirs = dzikirData[activeTab];
  const totalDzikirs = currentDzikirs.length;

  // Calculate progress based on current page position
  const progress = Math.min(((currentIndex + 1) / totalDzikirs) * 100, 100);

  // Check if all dzikirs up to current index are complete
  const isCurrentSectionComplete = React.useMemo(() => {
    const currentDzikir = currentDzikirs[currentIndex];
    if (!currentDzikir) return false;
    
    const currentCount = tabStates[activeTab].counters[currentDzikir.id] || 0;
    const targetCount = parseInt(currentDzikir.count, 10);
    return currentCount >= targetCount;
  }, [currentIndex, currentDzikirs, activeTab, tabStates]);

  const handleNext = () => {
    if (currentIndex < totalDzikirs - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      resetAllCounters();
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTabChange = (newTab: DzikirType) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      setCurrentIndex(0); // Reset index when changing tabs
      resetAllCounters(); // Reset counters when changing tabs
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E4C94] to-[#361F75]">
      <div className="relative min-h-screen text-white">
        {/* Header - Fixed position */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border-b border-white/5">
            <div 
              className={`h-full transition-all duration-300 ease-out ${
                isCurrentSectionComplete 
                  ? 'bg-emerald-400/60' 
                  : 'bg-emerald-300/40'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="bg-gradient-to-b from-black/25 to-black/20 backdrop-blur-xl border-b border-white/10">
            <div className="container mx-auto">
              {currentDzikirs[currentIndex] && (
                <CounterCard 
                  dzikir={currentDzikirs[currentIndex]} 
                />
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area - Fixed spacing from header and footer */}
        <div className="fixed inset-0 pt-[calc(96px+1vh)] pb-[calc(80px+2vh)] overflow-hidden">
          <div className="h-full">
            {currentDzikirs[currentIndex] && (
              <DzikirCard
                dzikir={currentDzikirs[currentIndex]}
                total={totalDzikirs}
                current={currentIndex + 1}
                onComplete={handleNext}
                onPrevious={handlePrevious}
              />
            )}
          </div>
        </div>

        {/* Footer Navigation - Fixed position */}
        <div className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-gradient-to-b from-black/25 to-black/20 backdrop-blur-xl border-t border-white/10">
          <div className="h-full max-w-lg mx-auto px-4">
            <div className="flex h-full justify-between items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex flex-col items-center justify-center h-14 w-14 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white bg-white/20 shadow-lg shadow-black/50'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <div className="mb-0.5">{tab.icon}</div>
                  <span className="text-[10px] font-medium">{tab.label}</span>
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