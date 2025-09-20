'use client';

import { ArrowLeft, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

import MindfulMaze from '@/components/mindful-maze';
import { Button } from '@/components/ui/button';

export default function MindfulMazePage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/games">
              <ArrowLeft />
            </Link>
          </Button>
          <BrainCircuit className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Mindful Maze
          </h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <MindfulMaze />
      </main>
    </div>
  );
}
