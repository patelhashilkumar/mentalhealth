'use client';
import { type Mood } from '@/context/mood-context';

const moodColors: { [key: string]: string } = {
  'Very Unpleasant': '#ff6b6b',
  Unpleasant: '#ff8e72',
  'Slightly Unpleasant': '#ffb37c',
  Neutral: '#a9b7c1',
  'Slightly Pleasant': '#87d0a2',
  Pleasant: '#62dca5',
  'Very Pleasant': '#2ce69b',
};

const DailyMood = ({ mood }: { mood: Mood | null }) => {
  const color = mood ? moodColors[mood.name] : moodColors['Neutral'];

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 40px 10px ${color}33, 0 0 20px 5px ${color}55`,
        }}
      />
      {/* Outer Ring */}
      <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
      {/* Middle Ring */}
      <div className="absolute inset-4 border border-white/20 rounded-full" />
      {/* Inner Ring */}
      <div className="absolute inset-8 border border-white/30 rounded-full" />

      {mood ? (
        <div className="relative text-6xl">{mood.emoji}</div>
      ) : (
        <>
          {/* Inner Orb for when no mood is logged */}
          <div
            className="absolute w-20 h-20 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color} 0%, ${color}aa 70%)`,
            }}
          />
          {/* Center Dot for when no mood is logged */}
          <div className="absolute w-2 h-2 rounded-full bg-black/50" />
        </>
      )}
    </div>
  );
};

export default DailyMood;
