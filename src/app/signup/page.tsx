'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { Stethoscope } from 'lucide-react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password);
      toast({
        title: 'Sign up successful!',
        description: 'You can now sign in with your new account.',
      });
      router.push('/login');
    } catch (error: any) {
      let description = 'Failed to sign up. Please try again.';
      if (error.code === 'auth/weak-password') {
        description = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/email-already-in-use') {
        description = 'This email is already in use. Please use a different email.';
      }
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
        description,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/80 backdrop-blur-xl">
      <div className="w-full max-w-md p-8 space-y-6 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg">
        <div className="text-center">
          <Stethoscope className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Create an Account</h1>
          <p className="text-muted-foreground">
            Get started with your personal AI health assistant
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
