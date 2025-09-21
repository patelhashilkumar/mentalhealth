
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from './ui/skeleton';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If there's no user, redirect to login page.
    // The check is performed after the initial render to allow the auth context to load the user from localStorage.
    if (user === null) {
      // Small delay to prevent flash of content if user is found quickly
      const timer = setTimeout(() => {
         router.push('/login');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  // If user is not yet determined, show a loading state
  if (user === null) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
  }

  // If user is authenticated, render the children
  return <>{children}</>;
}
