import { Stethoscope } from 'lucide-react';
import ChatInterface from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background/80 backdrop-blur-xl">
      <header className="flex items-center justify-center p-4 border-b border-white/10 shadow-sm">
        <Stethoscope className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
          AI Doc
        </h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
