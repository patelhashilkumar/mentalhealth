'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const moods = [
  { name: 'Very Pleasant', color: 'hsl(120, 100%, 75%)', value: 5 },
  { name: 'Pleasant', color: 'hsl(90, 100%, 75%)', value: 4 },
  { name: 'Slightly Pleasant', color: 'hsl(60, 100%, 75%)', value: 3 },
  { name: 'Neutral', color: 'hsl(0, 0%, 75%)', value: 2 },
  { name: 'Slightly Unpleasant', color: 'hsl(30, 100%, 75%)', value: 1 },
  { name: 'Unpleasant', color: 'hsl(0, 100%, 75%)', value: 0 },
  { name: 'Very Unpleasant', color: 'hsl(0, 100%, 60%)', value: -1 },
];

const MoodDial = () => {
  const [selectedMood, setSelectedMood] = useState<(typeof moods)[number] | null>(moods[3]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-80 h-80 rounded-full border-4 border-primary/20 flex items-center justify-center">
        {/* Radial Glow */}
        {selectedMood && (
          <div
            className="absolute w-full h-full rounded-full transition-all duration-500"
            style={{
              background: `radial-gradient(circle, ${selectedMood.color} -20%, transparent 60%)`,
              opacity: 0.5,
              transform: 'scale(1.2)',
            }}
          />
        )}
        
        {/* Center Dot */}
        <div className="absolute w-4 h-4 rounded-full bg-primary" />

        {/* Mood Labels */}
        {moods.map((mood, index) => {
          const angle = (index / moods.length) * 360 - 90;
          const isSelected = selectedMood?.name === mood.name;

          return (
            <div
              key={mood.name}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <button
                onClick={() => setSelectedMood(mood)}
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 w-24 h-10 flex items-center justify-center transition-all duration-300',
                  'origin-left'
                )}
                style={{
                  transform: 'translateX(8.5rem) rotate(90deg)',
                }}
              >
                <span
                  className={cn(
                    'text-sm transition-all duration-300',
                    isSelected
                      ? 'font-bold text-foreground scale-110'
                      : 'text-muted-foreground'
                  )}
                  style={{ color: isSelected ? mood.color : undefined }}
                >
                  {mood.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="h-20 flex flex-col items-center justify-center">
        {selectedMood && (
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: selectedMood.color }}>
              {selectedMood.name}
            </p>
            <p className="text-muted-foreground">You have selected a mood</p>
          </div>
        )}
      </div>
      
      <Button disabled={!selectedMood} size="lg">
        Next
      </Button>
    </div>
  );
};

export default MoodDial;
