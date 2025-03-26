export interface Dzikir {
  id: number;
  arabic: string;
  arabic_latin: string;
  faedah: string;
  narrator: string;
  count: string;
  title: string;
  translated_id: string;
  time: 'pagi' | 'petang' | 'ramadhan' | 'sholat';
}

export interface DzikirData {
  pagi: Dzikir[];
  petang: Dzikir[];
  ramadhan: Dzikir[];
  sholat: Dzikir[];
}

export type DzikirType = 'pagi' | 'petang' | 'ramadhan' | 'sholat';