
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Stethoscope } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please enter both email and password.',
      });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you'd get the name from your backend
      const name = email.split('@')[0];
      login({ name, email });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50">
      <Card className="w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
             <div className="flex justify-center items-center mb-4">
                <Stethoscope className="w-12 h-12 text-primary" />
             </div>
            <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline text-primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
