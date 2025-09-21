
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SmilePlus } from 'lucide-react';

const moods = [
  { emoji: '😡', angle: 0 },
  { emoji: '😟', angle: 60 },
  { emoji: '😐', angle: 120 },
  { emoji: '🙂', angle: 180 },
  { emoji: '😄', angle: 240 },
  { emoji: '🤩', angle: 300 },
];

export default function MoodSelector() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-80 h-80">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex flex-col items-center justify-center text-gray-400 text-sm">
          <SmilePlus className="w-6 h-6 mb-1" />
          Select
        </div>
      </div>
      {isClient &&
        moods.map(({ emoji, angle }) => {
          const x = 110 * Math.cos((angle * Math.PI) / 180);
          const y = 110 * Math.sin((angle * Math.PI) / 180);
          return (
            <Button
              key={angle}
              size="icon"
              variant="ghost"
              className="absolute w-20 h-20 text-4xl bg-white/50 rounded-full shadow-md transition-transform hover:scale-110"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              {emoji}
            </Button>
          );
        })}
    </div>
  );
}
