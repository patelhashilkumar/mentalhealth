'use client';
import {
  Gamepad2,
  ArrowLeft,
  Play,
  ShieldCheck,
  HeartPulse,
  Workflow,
  BrainCircuit,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
import AuthGuard from '@/components/auth-guard';

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
  imageSrc,
  imageHint,
}: {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  imageSrc: string;
  imageHint: string;
}) => (
  <Card className="bg-card/80 flex flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-primary/20">
    <div className="relative h-48 w-full">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        data-ai-hint={imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <div className="flex items-start gap-4">
          {icon && <div className="p-1 text-white">{icon}</div>}
          <div className="flex-1">
            <CardTitle className="text-white">{title}</CardTitle>
            <CardDescription className="text-white/80 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </div>
    </div>
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
  imageSrc,
  imageHint,
}: {
  gameTitle: string;
  description?: string;
  imageSrc: string;
  imageHint: string;
}) => (
  <Card className="bg-card/80 flex flex-col overflow-hidden">
    <div className="relative h-48 w-full">
      <Image
        src={imageSrc}
        alt={gameTitle}
        fill
        className="object-cover"
        data-ai-hint={imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <CardTitle className="text-white">{gameTitle}</CardTitle>
        {description && (
          <CardDescription className="text-white/80 line-clamp-2">
            {description}
          </CardDescription>
        )}
      </div>
    </div>
    <CardContent className="flex-1 p-4">
      <p className="text-muted-foreground">Coming Soon!</p>
    </CardContent>
  </Card>
);

function GamesPageContent() {
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
                <Link href="/profile">Go to Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (age >= 12 && age <= 17) {
      return (
        <GameSection title="Games for Teens (12-17)">
          <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/adventure/600/400"
            imageHint="fantasy adventure"
          />
          <GameCard
            title="Mindful Maze"
            description="A calming puzzle game where you collect positive thoughts."
            href="/games/mindful-maze"
            icon={<Workflow className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/maze/600/400"
            imageHint="zen garden"
          />
          <GameCardPlaceholder
            gameTitle="Echo Grove"
            description="A creative space to turn your feelings into a beautiful, growing forest."
            imageSrc="https://picsum.photos/seed/forest/600/400"
            imageHint="magical forest"
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
            icon={<ShieldCheck className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/rpg/600/400"
            imageHint="role playing game"
          />
          <GameCard
            title="PulseRunner"
            description="Flap your way to a high score in this relaxing classic."
            href="/games/pulserunner"
            icon={<HeartPulse className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/runner/600/400"
            imageHint="abstract motion"
          />
          <GameCardPlaceholder
            gameTitle="Zenith Zone"
            description="A competitive strategy game that sharpens focus and decision-making skills."
            imageSrc="https://picsum.photos/seed/strategy/600/400"
            imageHint="strategy board"
          />
        </GameSection>
      );
    } else if (age >= 26 && age <= 59) {
      return (
        <GameSection title="Games for Adults (26-59)">
          <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/mindgame/600/400"
            imageHint="brain puzzle"
          />
          <GameCard
            title="Memory Grid"
            description="Test your memory with this colorful grid challenge."
            href="/games/memory-grid"
            icon={<BrainCircuit className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/memory/600/400"
            imageHint="colorful grid"
          />
          <GameCardPlaceholder
            gameTitle="Mindful Manager"
            description="A simulation game about balancing life and work to achieve harmony."
            imageSrc="https://picsum.photos/seed/balance/600/400"
            imageHint="work life balance"
          />
        </GameSection>
      );
    } else {
      return (
        <GameSection title="Games for Seniors (60+)">
          <GameCard
            title="MindQuest"
            description="Adventure RPG to relieve stress and connect with others."
            href="/games/mindquest"
            icon={<ShieldCheck className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/seniorquest/600/400"
            imageHint="calm journey"
          />
          <GameCard
            title="Serene Serpent"
            description="A classic snake game with a calm and relaxing twist."
            href="/games/serene-serpent"
            icon={<SerpentIcon className="w-8 h-8" />}
            imageSrc="https://picsum.photos/seed/serpent/600/400"
            imageHint="calm snake"
          />
          <GameCardPlaceholder
            gameTitle="Memory Lane"
            description="A gentle game to reminisce and train your memory."
            imageSrc="https://picsum.photos/seed/reminisce/600/400"
            imageHint="photo album"
          />
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

export default function GamesPage() {
  return (
    <AuthGuard>
      <GamesPageContent />
    </AuthGuard>
  );
}
