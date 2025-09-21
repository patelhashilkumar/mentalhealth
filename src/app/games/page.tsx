
'use client';
import { Gamepad2, ArrowLeft, Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AuthGuard from '@/components/auth-guard';
import { cn } from '@/lib/utils';

const games = [
  {
    title: 'Blocky Blast Puzzle',
    genre: 'Puzzle solve',
    recommendedAge: '10+',
    link: 'https://poki.com/en/g/blocky-blast-puzzle',
    tags: ['Calm', 'Focus'],
    imageHint: 'abstract blocks',
    imageSeed: 'blocky',
  },
  {
    title: 'Merge & Double',
    genre: 'Number merge',
    recommendedAge: '8+',
    link: 'https://poki.com/en/g/merge-and-double',
    tags: ['Focus', 'Quick'],
    imageHint: 'number puzzle',
    imageSeed: 'merge',
  },
  {
    title: 'Sweet World',
    genre: 'Match-3 candy',
    recommendedAge: '7+',
    link: 'https://poki.com/en/g/sweet-world',
    tags: ['Calm', 'Casual'],
    imageHint: 'candy world',
    imageSeed: 'sweet',
  },
  {
    title: 'Chess Multiplayer',
    genre: 'Strategy board',
    recommendedAge: '7+',
    link: 'https://poki.com/en/g/chess-multiplayer',
    tags: ['Strategy', 'Focus', 'Social'],
    imageHint: 'chess board',
    imageSeed: 'chess',
  },
  {
    title: 'Four in a Row',
    genre: 'Classic connect-4',
    recommendedAge: '7+',
    link: 'https://poki.com/en/g/four-in-a-row',
    tags: ['Strategy', 'Quick'],
    imageHint: 'classic boardgame',
    imageSeed: 'connect',
  },
  {
    title: 'SmashKarts',
    genre: 'Arcade kart shooter',
    recommendedAge: '13+',
    link: 'https://smashkarts.io/',
    tags: ['Action', 'Competitive'],
    imageHint: 'kart racing',
    imageSeed: 'smash',
    safetyNote: 'May include intense action.',
  },
  {
    title: 'Mario Kart 8',
    genre: 'Racing (official site)',
    recommendedAge: '10+',
    link: 'https://mariokart8.nintendo.com/',
    tags: ['Racing', 'Joyful'],
    imageHint: 'cartoon race',
    imageSeed: 'mariokart',
  },
  {
    title: 'Call of Duty: Warzone',
    genre: 'Online shooter',
    recommendedAge: '18+',
    link: 'https://www.callofduty.com/warzone',
    tags: ['Shooter', 'Competitive'],
    imageHint: 'soldier action',
    imageSeed: 'warzone',
    safetyNote: 'May include intense action.',
  },
  {
    title: 'Snake',
    genre: 'Classic arcade',
    recommendedAge: '7+',
    link: 'https://www.google.com/search?q=snake+game',
    tags: ['Quick', 'Nostalgia'],
    imageHint: 'classic snake',
    imageSeed: 'snakegame',
  },
];

const GameCard = ({
  game,
}: {
  game: (typeof games)[0];
}) => (
  <Card className="group flex flex-col overflow-hidden bg-card transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
    <div className="relative h-40 w-full">
      <Image
        src={`https://source.unsplash.com/600x400/?${game.imageHint}`}
        alt={game.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        data-ai-hint={game.imageHint}
      />
      <Badge className="absolute top-2 right-2 bg-black/70 text-white border-none text-xs">
        {game.recommendedAge}
      </Badge>
    </div>
    <CardHeader className="p-4">
      <CardTitle className="font-bold text-lg text-foreground">
        {game.title}
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        {game.genre}
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
      <div className="flex flex-wrap gap-2 mb-4 h-5 items-center">
        <div className="flex flex-wrap gap-2">
          {game.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
       {game.safetyNote && (
          <p className="text-xs text-destructive/80 mb-2">{game.safetyNote}</p>
        )}
    </CardContent>
    <div className="border-t p-4 flex items-center justify-between">
      <Button asChild className="w-full">
        <a href={game.link} target="_blank" rel="noopener noreferrer">
          <Play className="mr-2 h-4 w-4" /> Play
        </a>
      </Button>
      <a
        href={game.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${game.title} in a new tab`}
        className="ml-2 text-muted-foreground hover:text-foreground"
      >
        <ExternalLink className="h-5 w-5" />
      </a>
    </div>
  </Card>
);

function GamesPageContent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 text-gray-800">
      <header className="flex items-center justify-between p-4 border-b bg-transparent">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/home">
              <ArrowLeft />
            </Link>
          </Button>
          <Gamepad2 className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 font-headline">
            Games
          </h1>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {games.map(game => (
            <GameCard key={game.title} game={game} />
          ))}
        </div>
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
