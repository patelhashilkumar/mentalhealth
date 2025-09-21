'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

export const moodData = [
  { name: 'Very Unpleasant', emoji: '😠', color: 'hsl(0, 84%, 60%)' },
  { name: 'Unpleasant', emoji: '😟', color: 'hsl(30, 84%, 60%)' },
  { name: 'Slightly Unpleasant', emoji: '😕', color: 'hsl(60, 84%, 60%)' },
  { name: 'Neutral', emoji: '😐', color: 'hsl(240, 5%, 65%)' },
  { name: 'Slightly Pleasant', emoji: '🙂', color: 'hsl(120, 60%, 65%)' },
  { name: 'Pleasant', emoji: '😊', color: 'hsl(140, 60%, 60%)' },
  { name: 'Very Pleasant', emoji: '😄', color: 'hsl(160, 80%, 60%)' },
];

export type Mood = {
  name: string;
  emoji: string;
  date: Date;
};

type MoodContextType = {
  moods: Mood[];
  addMood: (mood: Omit<Mood, 'date'>) => void;
  clearMoods: () => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [moods, setMoods] = useState<Mood[]>([]);

  const addMood = useCallback((mood: Omit<Mood, 'date'>) => {
    const newMood = { ...mood, date: new Date() };
    setMoods(prevMoods => [newMood, ...prevMoods]);
  }, []);

  const clearMoods = useCallback(() => {
    setMoods([]);
  }, []);


  const value = useMemo(() => ({ moods, addMood, clearMoods }), [moods, addMood, clearMoods]);

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
