'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

type MoodContextType = {
  moodEmoji: string | null;
  setMoodEmoji: (emoji: string | null) => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [moodEmoji, setMoodEmoji] = useState<string | null>(null);

  const value = useMemo(
    () => ({ moodEmoji, setMoodEmoji }),
    [moodEmoji]
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
