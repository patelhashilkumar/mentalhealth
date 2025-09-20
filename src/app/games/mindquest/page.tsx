'use client';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DailyCheckIn from '@/components/daily-check-in';

export default function MindQuestPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/games">
              <ArrowLeft />
            </Link>
          </Button>
          <ShieldCheck className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            MindQuest
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Daily Check-In
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Log your mood and sleep to unlock new zones in the world.
          </p>
          <DailyCheckIn />
        </div>
      </main>
    </div>
  );
}
