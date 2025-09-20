import { Stethoscope, Newspaper, Gamepad2, BookHeart } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'State of Mind',
    description: 'Log and reflect on your mood and emotions.',
    href: '/state-of-mind',
    icon: <BookHeart className="w-8 h-8 text-primary" />,
  },
  {
    title: 'AI Doc',
    description: 'Get AI-powered medical advice and recommendations.',
    href: '/ai-doc',
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Feed',
    description: 'Read articles and tips for your mental well-being.',
    href: '/feed',
    icon: <Newspaper className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Games',
    description: 'Play games designed to relax and challenge your mind.',
    href: '/games',
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 border-b shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-center text-foreground font-headline">
          AI Health App
        </h1>
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map(feature => (
            <Link href={feature.href} key={feature.href}>
              <Card className="flex flex-col h-full transition-all duration-300 transform bg-card hover:bg-card/90 hover:scale-105 hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-2xl font-bold font-headline">
                    {feature.title}
                  </CardTitle>
                  {feature.icon}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-4 mt-auto text-xs text-center text-muted-foreground">
        <p>Your personal AI health companion.</p>
      </footer>
    </div>
  );
}
