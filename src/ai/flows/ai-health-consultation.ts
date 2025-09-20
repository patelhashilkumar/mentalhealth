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

const AIHealthConsultationOutputSchema = z.object({
  reply: z.string().describe('The doctor-like response and medical recommendations from the AI.'),
});
export type AIHealthConsultationOutput = z.infer<typeof AIHealthConsultationOutputSchema>;

export async function aiHealthConsultation(input: AIHealthConsultationInput): Promise<AIHealthConsultationOutput> {
  return aiHealthConsultationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthConsultationPrompt',
  input: {schema: AIHealthConsultationInputSchema},
  output: {schema: AIHealthConsultationOutputSchema},
  prompt: `You are a helpful AI assistant providing medical advice. Please answer the following medical query with doctor-like responses and medical recommendations.\n\nQuery: {{{query}}}`,
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
