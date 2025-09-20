'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMood } from '@/context/mood-context';

const moods = [
  { name: 'Very Unpleasant', emoji: '😠', color: 'hsl(0, 84%, 60%)', value: 0 },
  { name: 'Unpleasant', emoji: '😟', color: 'hsl(30, 84%, 60%)', value: 1 },
  {
    name: 'Slightly Unpleasant',
    emoji: '😕',
    color: 'hsl(60, 84%, 60%)',
    value: 2,
  },
  { name: 'Neutral', emoji: '😐', color: 'hsl(240, 5%, 65%)', value: 3 },
  {
    name: 'Slightly Pleasant',
    emoji: '🙂',
    color: 'hsl(120, 60%, 65%)',
    value: 4,
  },
  { name: 'Pleasant', emoji: '😊', color: 'hsl(140, 60%, 60%)', value: 5 },
  { name: 'Very Pleasant', emoji: '😄', color: 'hsl(160, 80%, 60%)', value: 6 },
];

const DIAL_RADIUS = 140;
const HANDLE_SIZE = 32;
const LABEL_RADIUS = DIAL_RADIUS + 50;

const MoodDial = () => {
  const dialRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const { toast } = useToast();
  const { setMoodEmoji } = useMood();

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

  const bind = useDrag(({ xy }) => {
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
      setMoodEmoji(selectedMood.emoji);
      toast({
        title: 'Mood Logged!',
        description: `You're feeling: ${selectedMood.name} ${selectedMood.emoji}`,
      });
    }
  };

  const handleX = DIAL_RADIUS * Math.cos(angle);
  const handleY = DIAL_RADIUS * Math.sin(angle);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={dialRef}
        className="relative w-[380px] h-[380px] rounded-full flex items-center justify-center cursor-pointer"
        {...bind()}
        style={{ touchAction: 'none' }}
      >
        <div className="absolute w-full h-full border-8 border-card rounded-full shadow-inner" />

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
                  'text-4xl transition-all duration-300 text-center',
                  isSelected ? 'scale-125' : 'opacity-50 scale-90'
                )}
              >
                {mood.emoji}
              </span>
            </div>
          );
        })}

        <div className="absolute w-[220px] h-[220px] bg-background rounded-full flex items-center justify-center shadow-lg">
          <span
            className="text-8xl transition-transform duration-300 ease-in-out"
            style={{ transform: `scale(${selectedMood ? 1 : 0.5})` }}
          >
            {selectedMood?.emoji}
          </span>
        </div>

        <div
          className="absolute rounded-full border-4 border-background shadow-lg transition-colors"
          style={{
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            transform: `translate(-50%, -50%) translate(${handleX}px, ${handleY}px)`,
            left: '50%',
            top: '50%',
            backgroundColor: selectedMood?.color || 'hsl(var(--primary))',
          }}
        />
      </div>

      <div className="h-20 flex flex-col items-center justify-center text-center">
        {selectedMood && (
          <>
            <p
              className="text-3xl font-bold transition-colors"
              style={{ color: selectedMood.color }}
            >
              {selectedMood.name}
            </p>
            <p className="text-muted-foreground mt-1">
              You have selected a mood.
            </p>
          </>
        )}
      </div>

      <Button
        disabled={!selectedMood}
        size="lg"
        onClick={handleLogMood}
        className="transition-colors"
        style={{
          backgroundColor: selectedMood
            ? selectedMood.color
            : 'hsl(var(--muted))',
          color: 'hsl(var(--primary-foreground))',
        }}
      >
        Log Mood
      </Button>
    </div>
  );
};

export default MoodDial;
