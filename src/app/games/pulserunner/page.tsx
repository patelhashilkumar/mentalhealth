'use client';
import { ArrowLeft, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PulseRunner from '@/components/pulse-runner';

export default function PulseRunnerPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <header className="flex items-center justify-between p-4 border-b border-white/20 shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2 hover:bg-white/10">
            <Link href="/games">
              <ArrowLeft />
            </Link>
          </Button>
          <HeartPulse className="w-8 h-8 mr-3 text-red-400" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            PulseRunner
          </h1>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <PulseRunner />
      </main>
    </div>
  );
}
