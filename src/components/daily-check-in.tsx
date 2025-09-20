'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Sun, Moon, Sparkles } from 'lucide-react';

const moodOptions = [
  { emoji: '😠', label: 'Very Unpleasant' },
  { emoji: '😟', label: 'Unpleasant' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Pleasant' },
  { emoji: '😄', label: 'Very Pleasant' },
];

export default function DailyCheckIn() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [sleepHours, setSleepHours] = useState([8]);
  const [gratitudeNote, setGratitudeNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        variant: 'destructive',
        title: 'Please select a mood.',
        description: 'Your mood is required for the daily check-in.',
      });
      return;
    }
    console.log({
      mood: selectedMood,
      sleep: sleepHours[0],
      gratitude: gratitudeNote,
    });
    setSubmitted(true);
    toast({
      title: 'Check-In Complete!',
      description: 'You have unlocked a new area. Go explore!',
    });
  };

  if (submitted) {
    return (
      <Card className="text-center bg-card/80 animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Thank you for checking in!
          </CardTitle>
          <CardDescription>
            You've unlocked a new zone in the world. Ready for an adventure?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse" />
        </CardContent>
        <CardFooter className="justify-center">
          <Button>Explore</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-card/80">
      <CardHeader>
        <CardTitle className="font-headline">Your Status</CardTitle>
        <CardDescription>
          How are you feeling today? This helps shape your adventure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mood Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">1. How is your mood?</Label>
          <RadioGroup
            value={selectedMood ?? undefined}
            onValueChange={setSelectedMood}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {moodOptions.map(({ emoji, label }) => (
              <div key={label} className="flex flex-col items-center">
                <RadioGroupItem
                  value={label}
                  id={label}
                  className="sr-only"
                />
                <Label
                  htmlFor={label}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-lg border-2 border-transparent cursor-pointer transition-all duration-200 w-24 h-24',
                    selectedMood === label
                      ? 'bg-primary/20 border-primary text-primary-foreground'
                      : 'bg-secondary/50 hover:bg-secondary'
                  )}
                >
                  <span className="text-4xl">{emoji}</span>
                  <span className="text-xs mt-2 text-center">{label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Sleep Tracker */}
        <div className="space-y-4">
          <Label htmlFor="sleep-slider" className="text-lg font-medium">
            2. How much did you sleep last night?
          </Label>
          <div className="flex items-center gap-4 pt-2">
            <Moon className="text-muted-foreground" />
            <Slider
              id="sleep-slider"
              min={0}
              max={16}
              step={0.5}
              value={sleepHours}
              onValueChange={setSleepHours}
            />
            <Sun className="text-muted-foreground" />
          </div>
          <p className="text-center text-lg font-bold text-primary">
            {sleepHours[0]} hours
          </p>
        </div>

        {/* Gratitude Journal */}
        <div className="space-y-4">
          <Label htmlFor="gratitude" className="text-lg font-medium">
            3. What are you grateful for today? (Optional)
          </Label>
          <Textarea
            id="gratitude"
            placeholder="A warm cup of coffee, a call with a friend..."
            value={gratitudeNote}
            onChange={(e) => setGratitudeNote(e.target.value)}
            className="bg-background"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Complete Check-In
        </Button>
      </CardFooter>
    </Card>
  );
}
