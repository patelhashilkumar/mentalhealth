'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

export type Mood = {
  name: string;
  emoji: string;
  date: Date;
};

type MoodContextType = {
  moods: Mood[];
  addMood: (mood: Omit<Mood, 'date'>) => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [moods, setMoods] = useState<Mood[]>([]);

  const addMood = useCallback((mood: Omit<Mood, 'date'>) => {
    const newMood = { ...mood, date: new Date() };
    setMoods(prevMoods => [newMood, ...prevMoods]);
  }, []);

  const value = useMemo(() => ({ moods, addMood }), [moods, addMood]);

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
