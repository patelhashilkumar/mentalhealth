import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { MoodProvider } from '@/context/mood-context';
import AppLayout from '@/components/app-layout';
import { ProfileProvider } from '@/context/profile-context';
import { AuthProvider } from '@/context/auth-context';

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
        <AuthProvider>
          <ProfileProvider>
            <MoodProvider>
              <AppLayout>{children}</AppLayout>
              <Toaster />
            </MoodProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
