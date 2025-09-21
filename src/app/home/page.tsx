
'use client';
import {
  Flame,
  Heart,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MoodDial from '@/components/mood-dial';
import { useMood } from '@/context/mood-context';
import MoodHistory from '@/components/mood-history';
import { useMemo } from 'react';
import type { Mood } from '@/context/mood-context';

const SummaryCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm rounded-2xl">
    <CardHeader className="flex flex-row items-center justify-between pb-2 text-muted-foreground">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="w-4 h-4" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function HomePage() {
  const { moods } = useMood();
  const recentMood = moods[0] || null;

  const averageMood = useMemo(() => {
    if (moods.length === 0) return null;

    const moodCounts = moods.reduce((acc: { [key: string]: number }, mood: Mood) => {
      acc[mood.name] = (acc[mood.name] || 0) + 1;
      return acc;
    }, {});

    const mostFrequentMoodName = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );

    return moods.find(mood => mood.name === mostFrequentMoodName) || null;
  }, [moods]);

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-lg border border-gray-200/60 rounded-3xl p-8 shadow-sm text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          How are you feeling today?
        </h2>
        <p className="text-gray-500 mb-12">
          Select the emotion that best describes your current state.
        </p>

        <div className="flex items-center justify-center">
          <MoodDial />
        </div>
      </div>
      
      <MoodHistory />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SummaryCard icon={Clock} title="Recent Mood">
          {recentMood ? (
            <div className="flex items-center gap-4">
              <p className="text-5xl">{recentMood.emoji}</p>
              <div>
                <p className="text-xl font-bold text-gray-800">{recentMood.name}</p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p className="text-5xl">🤔</p>
              <div>
                <p className="text-xl font-bold text-gray-800">No Mood</p>
                <p className="text-sm text-gray-500">Log your mood!</p>
              </div>
            </div>
          )}
        </SummaryCard>
        <SummaryCard icon={Flame} title="Streak">
          <p className="text-5xl font-bold text-gray-800">{moods.length}</p>
          <p className="text-sm text-gray-500">Days logged</p>
        </SummaryCard>
        <SummaryCard icon={Heart} title="Average Mood">
          {averageMood ? (
            <div className="flex items-center gap-4">
              <p className="text-5xl">{averageMood.emoji}</p>
              <div>
                <p className="text-xl font-bold text-gray-800">{averageMood.name}</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p className="text-5xl">🤔</p>
              <div>
                <p className="text-xl font-bold text-gray-800">No Data</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>
          )}
        </SummaryCard>
      </div>
    </div>
  );
}
