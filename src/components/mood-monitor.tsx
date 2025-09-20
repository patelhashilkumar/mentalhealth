'use client';

import { useMood } from '@/context/mood-context';
import { cn } from '@/lib/utils';

export default function MoodMonitor() {
  const { moodEmoji } = useMood();

  if (!moodEmoji) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-card/80 backdrop-blur-lg shadow-lg border border-border'
      )}
    >
      <span className="text-4xl animate-in fade-in zoom-in-50">{moodEmoji}</span>
    </div>
  );
}
