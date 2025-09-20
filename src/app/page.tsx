'use client';

import { useState, useEffect } from 'react';
import { Calendar, Layers, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DailyMood from '@/components/daily-mood';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    setDate(today.toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm">
        <h1 className="text-xl font-bold">State of Mind</h1>
        <Button variant="ghost" size="icon">
          <Calendar className="w-5 h-5" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Today, {date}</h2>
          <Button asChild>
            <Link href="/mood-meter">Log</Link>
          </Button>
        </div>

        <div className="space-y-6">
          <DailyMood />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                MOMENTARY EMOTIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">No Entries</p>
              <Button variant="link" className="w-full mt-2 text-primary">
                Show in Charts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                About State of Mind
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                State of Mind refers to your momentary emotions or daily moods.
                Keeping a log of your momentary emotions and daily moods can help
                you identify patterns and improve your well-being.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
