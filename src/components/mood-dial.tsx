'use client';
import React, { useState, useRef, useMemo } from 'react';
import { useDrag } from '@use-gesture/react';
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

const DIAL_RADIUS = 140;
const HANDLE_SIZE = 24;

const MoodDial = () => {
  const dialRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(-Math.PI / 2 + (3 / (moods.length -1)) * (Math.PI * 2 / moods.length)); // Start at Neutral

  const selectedMood = useMemo(() => {
    let normalizedAngle = (angle + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
    let moodIndex = Math.round((normalizedAngle / (Math.PI * 2)) * (moods.length));
    moodIndex = (moodIndex + moods.length -1) % moods.length;
    moodIndex = Math.min(moods.length - 1, Math.max(0, moodIndex));
    
    // Reverse the index to match the visual layout
    const visualIndex = (moods.length - 1 - moodIndex + moods.length) % moods.length;

    return moods[visualIndex];
  }, [angle]);

  const bind = useDrag(({ xy }) => {
    if (dialRef.current) {
      const { left, top, width, height } = dialRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const newAngle = Math.atan2(xy[1] - centerY, xy[0] - centerX);
      setAngle(newAngle);
    }
  });

  const handleX = DIAL_RADIUS * Math.cos(angle);
  const handleY = DIAL_RADIUS * Math.sin(angle);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={dialRef}
        className="relative w-80 h-80 rounded-full flex items-center justify-center cursor-pointer"
        {...bind()}
        style={{ touchAction: 'none' }}
      >
        {/* Radial Glow */}
        {selectedMood && (
          <div
            className="absolute w-full h-full rounded-full transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${selectedMood.color} -20%, transparent 60%)`,
              opacity: 0.5,
              transform: 'scale(1.2)',
            }}
          />
        )}
        
        {/* The Dial Track */}
        <div className="absolute w-full h-full border-4 border-primary/20 rounded-full" />
        
        {/* Mood Labels */}
        {moods.map((mood, index) => {
          const moodAngle = -Math.PI / 2 + (index / moods.length) * Math.PI * 2;
          const isSelected = selectedMood?.name === mood.name;

          return (
            <div
              key={mood.name}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${(moodAngle * 180) / Math.PI}deg)` }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 w-24 h-10 flex items-center justify-center origin-left"
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
              </div>
            </div>
          );
        })}
        
        {/* Center Dot */}
        <div className="absolute w-4 h-4 rounded-full bg-primary" />
        
        {/* Draggable Handle */}
        <div
          className="absolute rounded-full bg-primary border-4 border-background shadow-lg"
          style={{
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            transform: `translate(${handleX}px, ${handleY}px) translate(-50%, -50%)`,
            left: '50%',
            top: '50%',
          }}
        />
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
        Log Mood
      </Button>
    </div>
  );
};

export default MoodDial;
