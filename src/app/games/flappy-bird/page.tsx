'use client';
import { ArrowLeft, Bird } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FlappyBird from '@/components/flappy-bird';

export default function FlappyBirdPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#87ceeb] text-foreground">
       <header className="absolute top-0 left-0 flex items-center p-4">
        <Button asChild variant="ghost" size="icon" className="mr-2 hover:bg-white/20 text-[#033]">
          <Link href="/games">
            <ArrowLeft />
          </Link>
        </Button>
         <h1 className="text-2xl font-bold tracking-tight text-[#033] font-headline">
            Flappy Bird
          </h1>
      </header>
      <FlappyBird />
    </div>
  );
}
