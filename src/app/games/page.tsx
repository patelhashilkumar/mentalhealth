'use client';
import {
  Gamepad2,
  ArrowLeft,
  Play,
  ShieldCheck,
  HeartPulse,
  Bird,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, type FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const GameSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="w-full max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

const GameCard = ({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}) => (
  <Card className="bg-card/80 flex flex-col">
    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
      {icon && <div className="p-1">{icon}</div>}
      <div className="flex-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="flex-1" />
    <CardFooter>
      <Button asChild className="w-full">
        <Link href={href}>
          <Play className="mr-2 h-4 w-4" /> Play
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const GameCardPlaceholder = ({ gameTitle }: { gameTitle: string }) => (
  <Card className="bg-card/80">
    <CardHeader>
      <CardTitle>{gameTitle}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Coming Soon!</p>
    </CardContent>
  </Card>
);

export default function GamesPage() {
  const [age, setAge] = useState<number | null>(null);
  const [ageInput, setAgeInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedAge = parseInt(ageInput, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      setError('Please enter a valid age.');
    } else if (parsedAge < 12) {
      setError('You must be at least 12 years old to play.');
    } else {
      setAge(parsedAge);
      setError('');
    }
  };

  const renderGameSection = () => {
    if (!age) return null;

    if (age >= 12 && age <= 17) {
      return (
        <GameSection title="Games for ages 12-17">
          <GameCardPlaceholder gameTitle="Creative Canvas" />
          <GameCardPlaceholder gameTitle="Focus Flow" />
          <GameCardPlaceholder gameTitle="Rhythm Arena" />
        </GameSection>
      );
    } else if (age >= 18 && age <= 25) {
      return (
        <GameSection title="Games for ages 18-25">
          <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
          />
          <GameCard
            title="PulseRunner"
            description="Endless runner where your tap rhythm controls the speed."
            href="/games/pulserunner"
            icon={<HeartPulse className="w-8 h-8 text-primary" />}
          />
          <GameCardPlaceholder gameTitle="Zenith Zone" />
        </GameSection>
      );
    } else if (age >= 26 && age <= 40) {
      return (
        <GameSection title="Games for ages 26-40">
          <GameCardPlaceholder gameTitle="Cogni-Craft" />
          <GameCardPlaceholder gameTitle="Mindful Manager" />
          <GameCardPlaceholder gameTitle="Pattern Puzzles" />
        </GameSection>
      );
    } else {
      return (
        <GameSection title="Games for ages 40+">
          <GameCardPlaceholder gameTitle="Serene Sudoku" />
          <GameCardPlaceholder gameTitle="Memory Lane" />
          <GameCardPlaceholder gameTitle="Calm Crosswords" />
        </GameSection>
      );
    }
  };

  const resetAge = () => {
    setAge(null);
    setAgeInput('');
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/home">
              <ArrowLeft />
            </Link>
          </Button>
          <Gamepad2 className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Games
          </h1>
        </div>
        {age && (
          <Button variant="outline" onClick={resetAge}>
            Change Age
          </Button>
        )}
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        {age === null ? (
          <div className="w-full max-w-sm">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">
                  What's your age?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="number"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    placeholder="Enter your age"
                    className="text-center text-lg h-12"
                    aria-label="Age"
                  />
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" size="lg" className="w-full">
                    Continue
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          renderGameSection()
        )}
      </main>
    </div>
  );
}
