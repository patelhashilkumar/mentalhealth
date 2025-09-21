'use client';
import {
  Gamepad2,
  ArrowLeft,
  Play,
  ShieldCheck,
  HeartPulse,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useProfile } from '@/context/profile-context';
import { SerpentIcon } from '@/components/icons/serpent-icon';

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
  title:string;
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

const GameCardPlaceholder = ({
  gameTitle,
  description,
}: {
  gameTitle: string;
  description?: string;
}) => (
  <Card className="bg-card/80">
    <CardHeader>
      <CardTitle>{gameTitle}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Coming Soon!</p>
    </CardContent>
  </Card>
);

export default function GamesPage() {
  const { profileData } = useProfile();
  const age = profileData.age;

  const renderGameSection = () => {
    if (!age) {
      return (
         <div className="w-full max-w-sm text-center">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">
                  What's your age?
                </CardTitle>
                 <CardDescription>
                  Please set your age in your profile to see available games.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/profile">
                      Go to Profile
                    </Link>
                  </Button>
              </CardContent>
            </Card>
          </div>
      )
    };

    if (age >= 12 && age <= 17) {
      return (
        <GameSection title="Games for Teens (12-17)">
          <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
          />
          <GameCard
            title="Mindful Maze"
            description="A calming puzzle game where you collect positive thoughts."
            href="/games/mindful-maze"
            icon={<Workflow className="w-8 h-8 text-primary" />}
          />
          <GameCardPlaceholder
            gameTitle="Echo Grove"
            description="A creative space to turn your feelings into a beautiful, growing forest."
          />
        </GameSection>
      );
    } else if (age >= 18 && age <= 25) {
      return (
        <GameSection title="Games for Young Adults (18-25)">
          <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
          />
          <GameCard
            title="PulseRunner"
            description="Flap your way to a high score in this relaxing classic."
            href="/games/pulserunner"
            icon={<HeartPulse className="w-8 h-8 text-primary" />}
          />
          <GameCardPlaceholder gameTitle="Zenith Zone" description="A competitive strategy game that sharpens focus and decision-making skills."/>
        </GameSection>
      );
    } else if (age >= 26 && age <= 59) {
      return (
        <GameSection title="Games for Adults (26-59)">
           <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
          />
          <GameCardPlaceholder gameTitle="Cogni-Craft" description="Engaging puzzles that challenge your logic and problem-solving abilities."/>
          <GameCardPlaceholder gameTitle="Mindful Manager" description="A simulation game about balancing life and work to achieve harmony."/>
        </GameSection>
      );
    } else {
      return (
        <GameSection title="Games for Seniors (60+)">
           <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
          />
           <GameCard
            title="Serene Serpent"
            description="A classic snake game with a calm and relaxing twist."
            href="/games/serene-serpent"
            icon={<SerpentIcon className="w-8 h-8 text-primary" />}
          />
          <GameCardPlaceholder gameTitle="Memory Lane" description="A gentle game to reminisce and train your memory."/>
        </GameSection>
      );
    }
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
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        {renderGameSection()}
      </main>
    </div>
  );
}
