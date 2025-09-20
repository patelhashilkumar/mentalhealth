'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

type Mood = {
  name: string;
  emoji: string;
};

type MoodContextType = {
  mood: Mood | null;
  setMood: (mood: Mood | null) => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood | null>(null);

  const value = useMemo(() => ({ mood, setMood }), [mood]);

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
