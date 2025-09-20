'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const moods = [
  { name: 'Very Pleasant', color: 'hsl(120, 100%, 75%)', value: 5 },
  { name: 'Pleasant', color: 'hsl(90, 100%, 75%)', value: 4 },
  { name: 'Slightly Pleasant', color: 'hsl(60, 100%, 75%)', value: 3 },
  { name: 'Neutral', color: 'hsl(0, 0%, 75%)', value: 2 },
  { name: 'Slightly Unpleasant', color: 'hsl(30, 100%, 75%)', value: 1 },
  { name: 'Unpleasant', color: 'hsl(0, 100%, 75%)', value: 0 },
  { name: 'Very Unpleasant', color: 'hsl(0, 100%, 60%)', value: -1 },
].reverse();

const DIAL_RADIUS = 140;
const HANDLE_SIZE = 24;
const LABEL_RADIUS = DIAL_RADIUS + 40;

const MoodDial = () => {
  const dialRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(-Math.PI / 2);
  const { toast } = useToast();

  useEffect(() => {
    const neutralIndex = moods.findIndex(m => m.name === 'Neutral');
    const step = (Math.PI * 2) / moods.length;
    const initialAngle = -Math.PI / 2 + neutralIndex * step;
    setAngle(initialAngle);
  }, []);

  const selectedMood = useMemo(() => {
    const numMoods = moods.length;
    const step = (2 * Math.PI) / numMoods;
    let normalizedAngle = (angle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
    let moodIndex = Math.round(normalizedAngle / step) % numMoods;
    return moods[moodIndex];
  }, [angle]);

  const bind = useDrag(({ xy, down }) => {
    if (dialRef.current) {
      const { left, top, width, height } =
        dialRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const newAngle = Math.atan2(xy[1] - centerY, xy[0] - centerX);
      setAngle(newAngle);
    }
  });

  const handleLogMood = () => {
    if (selectedMood) {
      toast({
        title: 'Mood Logged',
        description: `You're feeling: ${selectedMood.name}`,
      });
    }
  };

  const handleX = DIAL_RADIUS * Math.cos(angle);
  const handleY = DIAL_RADIUS * Math.sin(angle);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={dialRef}
        className="relative w-[360px] h-[360px] rounded-full flex items-center justify-center cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20"
        {...bind()}
        style={{ touchAction: 'none' }}
      >
        {selectedMood && (
          <div
            className="absolute w-full h-full rounded-full transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${selectedMood.color} -20%, transparent 60%)`,
              opacity: 0.3,
              transform: 'scale(1.2)',
            }}
          />
        )}

        <div className="absolute w-[280px] h-[280px] border-4 border-primary/20 rounded-full" />

        {moods.map((mood, index) => {
          const numMoods = moods.length;
          const moodAngle = -Math.PI / 2 + (index / numMoods) * (2 * Math.PI);
          const labelX = LABEL_RADIUS * Math.cos(moodAngle);
          const labelY = LABEL_RADIUS * Math.sin(moodAngle);
          const isSelected = selectedMood?.name === mood.name;

          return (
            <div
              key={mood.name}
              className="absolute w-24 h-10 flex items-center justify-center"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              }}
            >
              <span
                className={cn(
                  'text-sm transition-all duration-300 text-center',
                  isSelected
                    ? 'font-bold text-foreground scale-110'
                    : 'text-muted-foreground'
                )}
              >
                {mood.name}
              </span>
            </div>
          );
        })}

        <div
          className="absolute rounded-full bg-primary border-4 border-background shadow-lg"
          style={{
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            transform: `translate(-50%, -50%) translate(${handleX}px, ${handleY}px)`,
            left: '50%',
            top: '50%',
          }}
        />
      </div>

      <div className="h-20 flex flex-col items-center justify-center">
        {selectedMood && (
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: selectedMood.color }}
            >
              {selectedMood.name}
            </p>
            <p className="text-muted-foreground">You have selected a mood</p>
          </div>
        )}
      </div>

      <Button disabled={!selectedMood} size="lg" onClick={handleLogMood}>
        Log Mood
      </Button>
    </div>
  );
};

export default MoodDial;
