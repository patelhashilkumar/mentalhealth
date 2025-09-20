'use client';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GamesPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/home">
              <ArrowLeft />
            </Link>
          </Button>
          <Gamepad2 className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Games
          </h1>
        </div>
      </header>
      <main className="flex items-center justify-center flex-1">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Coming Soon!</h2>
          <p className="text-muted-foreground">
            Exciting games are on the way.
          </p>
        </div>
      </main>
    </div>
  );
}
