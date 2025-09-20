'use client';

import { useMood } from '@/context/mood-context';
import { cn } from '@/lib/utils';

export default function MoodMonitor() {
  const { moodEmoji } = useMood();

  return null;
}
