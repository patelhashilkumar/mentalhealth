
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AuthGuard from '@/components/auth-guard';
import { useState, useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';


const games = [
  {
    title: 'Blocky Blast Puzzle',
    genre: 'Puzzle',
    recommendedAge: '10+',
    link: 'https://poki.com/en/g/blocky-blast-puzzle',
    tags: ['Calm', 'Focus'],
    imageHint: 'abstract blocks',
    playtime: 5,
    recommended: true,
    newest: false,
    mostPlayed: false,
  },
  {
    title: 'Merge & Double',
    genre: 'Puzzle',
    recommendedAge: '8+',
    link: 'https://poki.com/en/g/merge-and-double',
    tags: ['Focus', 'Quick'],
    imageHint: 'number puzzle',
    playtime: 3,
    recommended: false,
    newest: true,
    mostPlayed: false,
  },
  {
    title: 'Sweet World',
    genre: 'Puzzle',
    recommendedAge: '7+',
    link: 'https://poki.com/en/g/sweet-world',
    tags: ['Calm_Casual'],
    imageHint: 'candy world',
    playtime: 5,
    recommended: false,
    newest: false,
    mostPlayed: true,
  },
  {
    title: 'Chess Multiplayer',
    genre: 'Strategy',
    recommendedAge: '7+',
    link: 'https://poki.com/en/g/chess-multiplayer',
    tags: ['Strategy', 'Focus', 'Social'],
    imageHint: 'chess board',
    playtime: 15,
    recommended: true,
    newest: false,
    mostPlayed: true,
  },
  {
    title: 'Four in a Row',
    genre: 'Strategy',
    recommendedAge: '7+',
    link: 'https://poki.com/en/g/four-in-a-row   ',
    tags: ['Strategy', 'Quick'],
    imageHint: 'classic boardgame',
    playtime: 3,
    recommended: false,
    newest: false,
    mostPlayed: false,
  },
  {
    title: 'SmashKarts',
    genre: 'Arcade',
    recommendedAge: '13+',
    link: 'https://smashkarts.io/',
    tags: ['Action', 'Competitive'],
    imageHint: 'kart racing',
    playtime: 8,
    recommended: true,
    newest: true,
    mostPlayed: true,
    safetyNote: 'May include intense action.',
  },
  {
    title: 'Mario Kart 8',
    genre: 'Racing',
    recommendedAge: '10+',
    link: 'https://mariokart8.nintendo.com/',
    tags: ['Racing', 'Joyful'],
    imageHint: 'cartoon race',
    playtime: 5,
    recommended: true,
    newest: false,
    mostPlayed: false,
  },
  {
    title: 'Call of Duty: Warzone',
    genre: 'Shooter',
    recommendedAge: '18+',
    link: 'https://www.callofduty.com/warzone',
    tags: ['Shooter', 'Competitive'],
    imageHint: 'soldier action',
    playtime: 20,
    recommended: false,
    newest: false,
    mostPlayed: true,
    safetyNote: 'May include intense action.',
  },
  {
    title: 'Snake',
    genre: 'Arcade',
    recommendedAge: '7+',
    link: 'https://www.google.com/search?q=snake+game&rlz=1C1ONGR_enIN1063IN1067&oq=snake+game&gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyEggBEC4YQxjUAhixAxiABBiKBTINCAIQABiDARixAxiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIKCAcQABixAxiABDIHCAgQABiABDIHCAkQABiABNIBCDcyMTFqMGo5qAIGsAIB8QV6R9Rdmp82mQ&sourceid=chrome&ie=UTF-8',
    tags: ['Quick', 'Nostalgia'],
    imageHint: 'classic snake',
    playtime: 2,
    recommended: false,
    newest: false,
    mostPlayed: false,
  },
];

const GameCard = ({ game }: { game: (typeof games)[0] }) => (
  <Card className="group flex flex-col overflow-hidden bg-card transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
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
      <div className="flex flex-wrap gap-2 mb-4">
        {game.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
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

const allGenres = ['All', ...Array.from(new Set(games.map(g => g.genre)))];
const allTags = ['All', 'Calm', 'Focus', 'Quick', 'Strategy', 'Competitive', 'Action', 'Social', 'Joyful', 'Nostalgia', 'Calm_Casual', 'Shooter', 'Racing', 'Arcade', 'Puzzle'];
const playtimeOptions = [
    { value: 'all', label: 'All' },
    { value: '2', label: '≤ 2 min' },
    { value: '5', label: '≤ 5 min' },
    { value: '10', label: '≤ 10 min' },
    { value: '10+', label: '> 10 min' },
];

function GamesPageContent() {
    const [genre, setGenre] = useState('All');
    const [tag, setTag] = useState('All');
    const [playtime, setPlaytime] = useState('all');
    const [sort, setSort] = useState('recommended');


  const filteredGames = useMemo(() => {
    let filtered = games;

    if (genre !== 'All') {
      filtered = filtered.filter(game => game.genre === genre);
    }
    if (tag !== 'All') {
      filtered = filtered.filter(game => game.tags.includes(tag));
    }
    if (playtime !== 'all') {
        if (playtime === '10+') {
            filtered = filtered.filter(game => game.playtime > 10);
        } else {
            filtered = filtered.filter(game => game.playtime <= parseInt(playtime, 10));
        }
    }

    switch (sort) {
      case 'mostPlayed':
        return filtered.sort((a, b) => (b.mostPlayed ? 1 : -1));
      case 'newest':
        return filtered.sort((a, b) => (b.newest ? 1 : -1));
      case 'recommended':
      default:
        return filtered.sort((a, b) => (b.recommended ? 1 : -1));
    }
  }, [genre, tag, playtime, sort]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-transparent">
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

      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
                <Label htmlFor="genre-filter">Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre-filter">
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        {allGenres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="tag-filter">Tag</Label>
                <Select value={tag} onValueChange={setTag}>
                    <SelectTrigger id="tag-filter">
                        <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                        {allTags.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="playtime-filter">Playtime</Label>
                <Select value={playtime} onValueChange={setPlaytime}>
                    <SelectTrigger id="playtime-filter">
                        <SelectValue placeholder="Playtime" />
                    </SelectTrigger>
                    <SelectContent>
                        {playtimeOptions.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="sort-by">Sort By</Label>
                <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="mostPlayed">Most Played</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <main className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.map(game => (
              <GameCard key={game.title} game={game} />
            ))}
             {filteredGames.length === 0 && (
                <div className="col-span-full text-center py-16">
                    <p className="text-lg text-muted-foreground">No games match your filters.</p>
                </div>
            )}
          </div>
        </main>
      </div>
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
