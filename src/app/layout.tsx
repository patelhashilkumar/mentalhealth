import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { MoodProvider } from '@/context/mood-context';
import MoodMonitor from '@/components/mood-monitor';

export const metadata: Metadata = {
  title: 'AI Doc',
  description: 'Your personal AI health assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <MoodProvider>
          {children}
          <MoodMonitor />
          <Toaster />
        </MoodProvider>
      </body>
    </html>
  );
}
