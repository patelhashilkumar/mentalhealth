'use server';
/**
 * @fileOverview Generates a list of unique, high-quality articles for the user's feed.
 *
 * - generateFeed - A function that returns a list of feed articles.
 * - GenerateFeedOutput - The return type for the generateFeed function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FeedItemSchema = z.object({
  id: z.number().describe('A unique identifier for the article.'),
  author: z.string().describe("The fictional author's name (e.g., a doctor or specialist)."),
  title: z.string().describe('The compelling title of the article.'),
  description: z.string().describe('A brief, engaging summary of the article content.'),
  imageHint: z.string().describe('One or two keywords for a relevant stock photo (e.g., "nature person").'),
  minutesToRead: z.number().describe('The estimated time it takes to read the article.'),
});

const GenerateFeedOutputSchema = z.object({
  articles: z.array(FeedItemSchema).length(4).describe('An array of 4 unique feed articles.'),
});

export type GenerateFeedOutput = z.infer<typeof GenerateFeedOutputSchema>;

export async function generateFeed(): Promise<GenerateFeedOutput> {
  return generateFeedFlow();
}

const prompt = ai.definePrompt({
  name: 'generateFeedPrompt',
  output: { schema: GenerateFeedOutputSchema },
  prompt: `You are an expert content creator for a mental wellness app called MindWell.

Your task is to generate a list of 4 unique, high-quality, and engaging articles for the user's feed. The topics should be diverse but centered around mental health, mindfulness, personal growth, resilience, and overall well-being.

For each article, provide a realistic author name (like a doctor, therapist, or wellness coach), a catchy title, a concise description, a hint for a relevant image (1-2 words), and an estimated reading time.

Ensure the articles are different from each other and offer practical, positive, and supportive advice. Do not repeat topics within the same batch of 4 articles.`,
});

const generateFeedFlow = ai.defineFlow(
  {
    name: 'generateFeedFlow',
    outputSchema: GenerateFeedOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
