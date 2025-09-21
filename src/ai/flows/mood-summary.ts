'use server';
/**
 * @fileOverview Provides AI-generated summaries and wellness tips based on user's mood and profile.
 *
 * - getMoodSummary - A function that handles the mood summary and tips generation process.
 * - MoodSummaryInput - The input type for the getMoodSummary function.
 * - MoodSummaryOutput - The return type for the getMoodSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProfileSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.string(),
  country: z.string(),
  sleepHours: z.number(),
  interests: z.array(z.string()),
  stressors: z.array(z.string()),
});

export const MoodSummaryInputSchema = z.object({
  mood: z.string().describe('The mood logged by the user (e.g., "Pleasant", "Unpleasant", "Neutral").'),
  profile: ProfileSchema.describe('The user\'s profile data.'),
});
export type MoodSummaryInput = z.infer<typeof MoodSummaryInputSchema>;

const WellnessTipSchema = z.object({
  title: z.string().describe('A short, catchy title for the wellness tip.'),
  description: z.string().describe('A brief explanation of the wellness tip.'),
});

export const MoodSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A personalized, 1-2 sentence summary of the user\'s mood, taking their profile into account.'),
  tips: z
    .array(WellnessTipSchema)
    .min(2)
    .max(3)
    .describe('A list of 2-3 actionable wellness tips tailored to the user\'s mood and profile.'),
});
export type MoodSummaryOutput = z.infer<typeof MoodSummaryOutputSchema>;

export async function getMoodSummary(input: MoodSummaryInput): Promise<MoodSummaryOutput> {
  return moodSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodSummaryPrompt',
  input: { schema: MoodSummaryInputSchema },
  output: { schema: MoodSummaryOutputSchema },
  prompt: `You are a compassionate AI assistant. A user has logged their mood as '{{{mood}}}'. 

Analyze their mood in the context of their profile:
- Name: {{{profile.name}}}
- Age: {{{profile.age}}}
- Interests: {{{profile.interests}}}
- Common Stressors: {{{profile.stressors}}}
- Typical Sleep: {{{profile.sleepHours}}} hours

Based on this, provide a personalized, 1-2 sentence summary of their mood.

Then, provide 2-3 actionable wellness tips tailored to their mood and profile. Connect the tips to their interests and stressors. For example, if they like 'Music' and are 'Stressed', suggest listening to a calming playlist.`,
});

const moodSummaryFlow = ai.defineFlow(
  {
    name: 'moodSummaryFlow',
    inputSchema: MoodSummaryInputSchema,
    outputSchema: MoodSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
