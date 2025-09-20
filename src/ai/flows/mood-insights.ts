'use server';
/**
 * @fileOverview Provides AI-generated insights based on the user's logged mood.
 *
 * - getMoodInsight - A function that handles the mood insight generation process.
 * - MoodInsightInput - The input type for the getMoodInsight function.
 * - MoodInsightOutput - The return type for the getMoodInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodInsightInputSchema = z.object({
  mood: z.string().describe('The mood logged by the user (e.g., "Pleasant", "Unpleasant", "Neutral").'),
});
export type MoodInsightInput = z.infer<typeof MoodInsightInputSchema>;

const MoodInsightOutputSchema = z.object({
  insight: z
    .string()
    .describe('A short, compassionate, and insightful message for the user based on their mood. It should be 1-2 sentences.'),
});
export type MoodInsightOutput = z.infer<typeof MoodInsightOutputSchema>;

export async function getMoodInsight(input: MoodInsightInput): Promise<MoodInsightOutput> {
  return moodInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodInsightPrompt',
  input: {schema: MoodInsightInputSchema},
  output: {schema: MoodInsightOutputSchema},
  prompt: `You are a compassionate friend and AI assistant. A user has logged their mood as '{{{mood}}}'. 

Provide a short, 1-2 sentence, encouraging, and insightful message that acknowledges their feeling without being overly clinical. 

If the mood is positive, celebrate it. If it's negative, offer gentle support and acknowledgement. If it's neutral, provide a mindful observation.`,
});

const moodInsightsFlow = ai.defineFlow(
  {
    name: 'moodInsightsFlow',
    inputSchema: MoodInsightInputSchema,
    outputSchema: MoodInsightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
