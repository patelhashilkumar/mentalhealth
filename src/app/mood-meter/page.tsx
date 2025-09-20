'use client';
import { BookHeart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MoodDial from '@/components/mood-dial';

export default function MoodMeterPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <BookHeart className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            State of Mind
          </h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4 font-headline">
          How are you feeling?
        </h2>
        <p className="text-muted-foreground mb-12">
          Select the mood that best describes your current state.
        </p>
        <MoodDial />
      </main>
    </div>
  );
}
