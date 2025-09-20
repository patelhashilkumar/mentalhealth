'use client';
import { Newspaper, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

const feedItems = [
  {
    id: 1,
    author: 'Dr. Evelyn Reed',
    title: 'The Surprising Benefits of a Digital Detox',
    description:
      "In our hyper-connected world, taking a break from screens can have profound effects on our mental well-being. Discover how a digital detox can improve your focus, reduce anxiety, and help you reconnect with the world around you.",
    imageUrl: 'https://picsum.photos/seed/feed1/600/400',
    imageHint: 'nature person',
    minutesToRead: 5,
  },
  {
    id: 2,
    author: 'Marcus Chen',
    title: 'Mindful Breathing: A Simple Trick to Calm Your Mind',
    description:
      'Anxiety can strike at any moment. This simple but powerful mindful breathing technique can be done anywhere, anytime, to bring a sense of calm and centeredness to your day. Learn the steps and start practicing today.',
    imageUrl: 'https://picsum.photos/seed/feed2/600/400',
    imageHint: 'yoga meditation',
    minutesToRead: 3,
  },
  {
    id: 3,
    author: 'Aisha Khan',
    title: 'Building Resilience: How to Bounce Back from Setbacks',
    description:
      "Life is full of challenges, but it's our ability to bounce back that defines us. Explore practical strategies for building mental and emotional resilience, turning adversity into an opportunity for growth.",
    imageUrl: 'https://picsum.photos/seed/feed3/600/400',
    imageHint: 'mountain sunrise',
    minutesToRead: 7,
  },
  {
    id: 4,
    author: 'Ben Carter',
    title: 'The Connection Between Nutrition and Mood',
    description:
      'Did you know that what you eat can directly impact how you feel? We dive into the science behind the gut-brain axis and offer tips on foods that can help boost your mood and support mental clarity.',
    imageUrl: 'https://picsum.photos/seed/feed4/600/400',
    imageHint: 'healthy food',
    minutesToRead: 6,
  },
];

export default function FeedPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-transparent border-b border-white/10 shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <Newspaper className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Feed
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
            {feedItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden transition-all duration-300 border shadow-lg bg-background/30 backdrop-blur-xl border-white/10 rounded-2xl hover:scale-105 hover:shadow-primary/20"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={item.imageHint}
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="mb-2 text-xl font-bold text-foreground font-headline">
                    {item.title}
                  </h2>
                  <p className="flex-1 mb-4 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {item.author}</span>
                    <span>{item.minutesToRead} min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
