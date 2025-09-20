'use client';
import { Smile, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MoodMeterPage() {
  return (
    <div className="flex flex-col h-screen bg-background/80 backdrop-blur-xl">
      <header className="flex items-center justify-between p-4 border-b border-white/10 shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <Smile className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Mood Meter
          </h1>
        </div>
      </header>
      <main className="flex-1 p-6 text-center">
        <div className="py-20">
          <Smile className="w-16 h-16 mx-auto mb-4 text-primary/50" />
          <h2 className="text-2xl font-bold text-foreground">Log Your Mood</h2>
          <p className="text-muted-foreground">
            This is where the mood logging interface will be.
          </p>
        </div>
      </main>
    </div>
  );
}