'use client';

import { Stethoscope, BookHeart, Smile, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-transparent">
        <div className="flex items-center">
          <BookHeart className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            State of Mind
          </h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="AI Doc"
            description="Your personal AI health assistant."
            href="/ai-doc"
            icon={<Stethoscope className="w-8 h-8 text-primary" />}
          />
          <FeatureCard
            title="Mood Meter"
            description="Log and track your daily mood."
            href="/mood-meter"
            icon={<Smile className="w-8 h-8 text-primary" />}
          />
          <FeatureCard
            title="Feed"
            description="Discover content and connect with others."
            href="/feed"
            icon={<Newspaper className="w-8 h-8 text-primary" />}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
  icon,
  disabled = false,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
}) {
  const content = (
    <div
      className={`flex flex-col items-center justify-center p-6 text-center transition-all duration-300 bg-background/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-primary/10 hover:scale-105'
      }`}
    >
      <div className="p-4 mb-4 bg-primary/10 rounded-full">{icon}</div>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
}
