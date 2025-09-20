'use client';
import { useMood } from '@/context/mood-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DailyMood() {
  const { mood } = useMood();

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          DAILY MOOD
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pb-8">
        <div className="relative flex items-center justify-center w-32 h-32">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${mood?.color || 'hsl(var(--primary))'} 0%, transparent 70%)`,
              opacity: 0.3,
            }}
          />
          <div className="w-24 h-24 rounded-full bg-card" />
          <div className="absolute w-20 h-20 bg-background rounded-full" />
          <div
            className="absolute w-16 h-16 rounded-full"
            style={{
              background: `radial-gradient(circle, ${mood?.color || 'hsl(var(--primary))'} 0%, hsl(var(--background)) 70%)`,
              opacity: 0.8,
            }}
          />
           <div className="absolute w-2 h-2 rounded-full bg-foreground" />
        </div>
        <p className="text-lg font-semibold">
          {mood ? `A ${mood.name} Day` : 'No mood logged'}
        </p>
      </CardContent>
    </Card>
  );
}
