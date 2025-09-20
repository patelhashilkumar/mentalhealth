'use client';
import { Stethoscope, LogOut } from 'lucide-react';
import ChatInterface from '@/components/chat-interface';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.replace('/login');
    return null;
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
        <Button variant="ghost" onClick={logout}>
          <LogOut className="mr-2" />
          Logout
        </Button>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
