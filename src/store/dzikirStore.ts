import { create } from 'zustand';
import { DzikirType } from '../types';
import dzikirData from '../data/dzikir.json';

interface TabState {
  currentIndex: number;
  counters: Record<number, number>;
}

interface DzikirStore {
  activeTab: DzikirType;
  tabStates: Record<DzikirType, TabState>;
  setActiveTab: (tab: DzikirType) => void;
  incrementCounter: (id: number, maxCount: number) => void;
  resetCounter: (id: number) => void;
  resetAllCounters: () => void;
  setCurrentIndex: (index: number) => void;
  getCurrentIndex: () => number;
}

const initialTabState = (type: DzikirType): TabState => ({
  currentIndex: 0,
  counters: {},
});

export const useDzikirStore = create<DzikirStore>((set, get) => ({
  activeTab: 'pagi',
  tabStates: {
    pagi: initialTabState('pagi'),
    petang: initialTabState('petang'),
    sholat: initialTabState('sholat'),
    ramadhan: initialTabState('ramadhan'),
  },
  setActiveTab: (tab) => set((state) => {
    // Only create a new state if the tab is actually changing
    if (tab === state.activeTab) return state;
    
    return {
      activeTab: tab,
      tabStates: {
        ...state.tabStates,
        [tab]: state.tabStates[tab] || initialTabState(tab)
      }
    };
  }),
  incrementCounter: (id, maxCount) => set((state) => {
    const currentTab = state.activeTab;
    const currentCount = state.tabStates[currentTab].counters[id] || 0;
    if (currentCount >= maxCount) return state;

    return {
      tabStates: {
        ...state.tabStates,
        [currentTab]: {
          ...state.tabStates[currentTab],
          counters: {
            ...state.tabStates[currentTab].counters,
            [id]: currentCount + 1,
          },
        },
      },
    };
  }),
  resetCounter: (id) => set((state) => ({
    tabStates: {
      ...state.tabStates,
      [state.activeTab]: {
        ...state.tabStates[state.activeTab],
        counters: {
          ...state.tabStates[state.activeTab].counters,
          [id]: 0,
        },
      },
    },
  })),
  resetAllCounters: () => set((state) => ({
    tabStates: {
      ...state.tabStates,
      [state.activeTab]: {
        ...state.tabStates[state.activeTab],
        counters: {},
      },
    },
  })),
  setCurrentIndex: (index) => set((state) => ({
    tabStates: {
      ...state.tabStates,
      [state.activeTab]: {
        ...state.tabStates[state.activeTab],
        currentIndex: index,
      },
    },
  })),
  getCurrentIndex: () => {
    const state = get();
    return state.tabStates[state.activeTab].currentIndex;
  },
}));