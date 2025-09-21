
'use client';
import {
  LayoutGrid,
  MessageSquare,
  Activity,
  User,
  Gamepad2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    name: 'Summary',
    href: '/home',
    icon: LayoutGrid,
  },
  {
    name: 'Chat',
    href: '/ai-doc',
    icon: MessageSquare,
  },
  {
    name: 'Activity',
    href: '/feed',
    icon: Activity,
  },
  {
    name: 'Games',
    href: '/games',
    icon: Gamepad2,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 text-gray-800">
      <aside className="w-56 p-4">
        <div className="sticky top-4">
          <Link href="/home">
            <h1 className="text-2xl font-bold text-gray-900 mb-8 px-2">
              MindWell
            </h1>
          </Link>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? 'default' : 'ghost'}
                  className={`justify-start text-base font-normal h-12 px-4 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md'
                      : 'text-gray-500 hover:bg-blue-100/50 hover:text-gray-900'
                  }`}
                >
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5 mr-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
