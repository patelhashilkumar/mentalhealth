'use client';

import { Stethoscope, Newspaper, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'AI Doc',
    description: 'Get AI-powered medical advice.',
    icon: Stethoscope,
    href: '/ai-doc',
  },
  {
    title: 'Feed',
    description: 'Discover content about mental health.',
    icon: Newspaper,
    href: '/feed',
  },
  {
    title: 'Games',
    description: 'Relax with some fun games.',
    icon: Gamepad2,
    href: '/games',
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <main className="container flex flex-col items-center justify-center flex-1 p-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tighter font-headline">
            AI Health Assistant
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your all-in-one companion for better well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl w-full">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} passHref>
              <Card className="flex flex-col h-full transition-all duration-300 transform hover:scale-105 hover:shadow-primary/20 bg-card/50 backdrop-blur-xl hover:border-primary/50">
                <CardHeader className="flex-row items-center gap-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl font-bold font-headline">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/mood-meter">
            <button className="px-8 py-3 text-lg font-semibold text-primary-foreground bg-primary rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all duration-300 transform hover:scale-110">
              How are you feeling today?
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
