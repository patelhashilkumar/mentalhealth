'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useMood } from '@/context/mood-context';
import DailyMood from '@/components/daily-mood';

export default function StateOfMindPage() {
  const { mood } = useMood();
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(format(new Date(), 'd LLL'));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4">
        <Button variant="ghost" size="sm" asChild>
          {/* This would ideally link to a parent "Summary" page, for now it goes to itself */}
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Summary
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">State of Mind</h1>
        <Button variant="ghost" size="icon">
          <CalendarDays className="h-5 w-5" />
        </Button>
      </header>
      <main className="flex-1 flex-col items-center p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Today, {today}</h2>
          <Button asChild className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/mood-meter">Log</Link>
          </Button>
        </div>

        <Card className="w-full bg-card/80 border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-xs font-medium text-muted-foreground tracking-widest">
              DAILY MOOD
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6 pt-6 pb-12">
            <DailyMood mood={mood} />
            <h3 className="text-2xl font-medium">
              {mood ? `A ${mood.name} Day` : 'No mood logged'}
            </h3>
          </CardContent>
        </Card>

        <Card className="w-full bg-transparent border-0 shadow-none mt-6">
          <CardHeader className="p-0">
            <CardTitle className="text-xs font-medium text-muted-foreground tracking-widest mb-2">
              MOMENTARY EMOTIONS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-lg bg-card/80 p-4 text-center">
              <p className="text-muted-foreground">No Entries</p>
            </div>
            <Button variant="link" className="text-blue-500 w-full mt-2">
              Show in Charts
            </Button>
          </CardContent>
        </Card>

        <Separator className="my-6 bg-border/50" />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">About State of Mind</h3>
          <p className="text-muted-foreground text-sm">
            State of Mind refers to your momentary emotions or daily moods.
            Keeping a log of your momentary emotions and daily moods can
            help you understand yourself better.
          </p>
        </div>
      </main>
    </div>
  );
}
