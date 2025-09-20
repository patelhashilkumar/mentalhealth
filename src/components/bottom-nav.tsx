
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Share2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Summary', icon: Heart },
  { href: '/sharing', label: 'Sharing', icon: Share2 },
  { href: '/browse', label: 'Browse', icon: Layers },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/80 backdrop-blur-sm">
      <div className="flex justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center w-full gap-1 text-xs',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon
                className="w-6 h-6"
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
