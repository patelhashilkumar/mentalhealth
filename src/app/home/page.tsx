
'use client';
import {
  LayoutGrid,
  MessageSquare,
  Activity,
  User,
  Clock,
  Flame,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodSelector from '@/components/mood-selector';

const navItems = [
  {
    name: 'Summary',
    href: '/home',
    icon: LayoutGrid,
    isActive: true,
  },
  {
    name: 'AI Doc',
    href: '/ai-doc',
    icon: MessageSquare,
    isActive: false,
  },
  {
    name: 'Feed',
    href: '/feed',
    icon: Activity,
    isActive: false,
  },
  {
    name: 'Games',
    href: '/games',
    icon: User,
    isActive: false,
  },
];

const SummaryCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm rounded-2xl">
    <CardHeader className="flex flex-row items-center justify-between pb-2 text-muted-foreground">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="w-4 h-4" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 text-gray-800">
      <aside className="w-56 p-4">
        <div className="sticky top-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 px-2">
            MindWell
          </h1>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => (
              <Button
                key={item.name}
                asChild
                variant={item.isActive ? 'default' : 'ghost'}
                className={`justify-start text-base font-normal h-12 px-4 ${
                  item.isActive
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md'
                    : 'text-gray-500 hover:bg-blue-100/50 hover:text-gray-900'
                }`}
              >
                <Link href={item.href}>
                  <item.icon className="w-5 h-5 mr-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="bg-white/60 backdrop-blur-lg border border-gray-200/60 rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How are you feeling today?
          </h2>
          <p className="text-gray-500 mb-12">
            Select the emotion that best describes your current state.
          </p>

          <div className="flex items-center justify-center h-80">
            <MoodSelector />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SummaryCard icon={Clock} title="Recent Mood">
            <div className="flex items-center gap-4">
              <p className="text-5xl">😠</p>
              <div>
                <p className="text-xl font-bold text-gray-800">Angry</p>
                <p className="text-sm text-gray-500">9/21/2025</p>
              </div>
            </div>
          </SummaryCard>
          <SummaryCard icon={Flame} title="Streak">
            <p className="text-5xl font-bold text-gray-800">1</p>
            <p className="text-sm text-gray-500">Days logged</p>
          </SummaryCard>
          <SummaryCard icon={Heart} title="Average Mood">
            <p className="text-5xl font-bold text-gray-800">
              3.7<span className="text-2xl text-gray-400">/10</span>
            </p>
            <p className="text-sm text-gray-500">This month</p>
          </SummaryCard>
        </div>
      </main>

      <div className="fixed bottom-8 right-8">
        <Button
          size="icon"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-red-400 to-orange-400 text-white shadow-xl shadow-red-200"
        >
          <Heart className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
