
'use client';
import { Newspaper, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import AuthGuard from '@/components/auth-guard';
import { useEffect, useState } from 'react';
import { getAiFeed } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type FeedItem = {
  id: number;
  author: string;
  title: string;
  description: string;
  imageHint: string;
  minutesToRead: number;
};

const FeedSkeleton = () => (
  <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col overflow-hidden bg-card border rounded-lg shadow-sm"
      >
        <Skeleton className="w-full h-48" />
        <div className="flex flex-col flex-1 p-6">
          <Skeleton className="w-3/4 h-6 mb-4" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-full h-4 mb-4" />
          <div className="flex items-center justify-between mt-auto">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

function FeedPageContent() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeed = async () => {
    setIsLoading(true);
    try {
      const { articles } = await getAiFeed();
      setFeedItems(articles);
    } catch (error) {
      console.error('Failed to fetch feed:', error);
      // Optionally set some error state to show to the user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/home">
              <ArrowLeft />
            </Link>
          </Button>
          <Newspaper className="w-8 h-8 mr-3 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Feed
          </h1>
        </div>
        <Button onClick={fetchFeed} variant="secondary" disabled={isLoading}>
          <RefreshCw
            className={cn('mr-2 h-4 w-4', isLoading && 'animate-spin')}
          />
          Refresh Feed
        </Button>
      </header>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {isLoading ? (
            <FeedSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
              {feedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden transition-all duration-300 bg-card border rounded-lg shadow-sm hover:scale-105 hover:shadow-primary/20"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={`https://picsum.photos/seed/${item.imageHint.replace(
                        ' ',
                        ''
                      )}/600/400`}
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
          )}
        </ScrollArea>
      </main>
    </div>
  );
}

export default function FeedPage() {
  return (
    <AuthGuard>
      <FeedPageContent />
    </AuthGuard>
  );
}
