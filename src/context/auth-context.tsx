
'use client';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  register: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This is a mock implementation.
    // In a real app, you would verify a token from localStorage/cookies.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/home');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };
  
  const register = (userData: User) => {
    // In a real app, this would involve an API call.
    // For now, we'll just log the user in.
    login(userData);
  }

  const value = useMemo(
    () => ({ user, login, logout, register }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
