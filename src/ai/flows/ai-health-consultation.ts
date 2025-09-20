'use server';
/**
 * @fileOverview Provides doctor-like responses and medical recommendations based on user input.
 *
 * - aiHealthConsultation - A function that handles the health consultation process.
 * - AIHealthConsultationInput - The input type for the aiHealthConsultation function.
 * - AIHealthConsultationOutput - The return type for the aiHealthConsultation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHealthConsultationInputSchema = z.object({
  query: z.string().describe('The medical query from the user.'),
});
export type AIHealthConsultationInput = z.infer<typeof AIHealthConsultationInputSchema>;

const RecommendationSchema = z.object({
  condition: z.string().describe('The name of the possible medical condition.'),
  description: z.string().describe('A brief description of the condition.'),
  advice: z.string().describe('The recommended course of action or advice.'),
});

const AIHealthConsultationOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A list of recommendations and advice.'),
});
export type AIHealthConsultationOutput = z.infer<typeof AIHealthConsultationOutputSchema>;

export async function aiHealthConsultation(input: AIHealthConsultationInput): Promise<AIHealthConsultationOutput> {
  return aiHealthConsultationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthConsultationPrompt',
  input: {schema: AIHealthConsultationInputSchema},
  output: {schema: AIHealthConsultationOutputSchema},
  prompt: `You are a helpful AI assistant providing medical advice. Please answer the following medical query with doctor-like responses and medical recommendations. Structure your response as a list of recommendations with a condition, description, and advice for each.\n\nQuery: {{{query}}}`,
});

const aiHealthConsultationFlow = ai.defineFlow(
  {
    name: 'aiHealthConsultationFlow',
    inputSchema: AIHealthConsultationInputSchema,
    outputSchema: AIHealthConsultationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
