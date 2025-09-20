'use client';
import { Stethoscope, LogOut } from 'lucide-react';
import ChatInterface from '@/components/chat-interface';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background/80 backdrop-blur-xl">
      <header className="flex items-center justify-between p-4 border-b border-white/10 shadow-sm">
        <div className="flex items-center">
          <Stethoscope className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            AI Doc
          </h1>
        </div>
        <Button variant="ghost" onClick={signOut}>
          <LogOut className="mr-2" /> Sign Out
        </Button>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
