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
  response: z.string().optional().describe('A conversational response from the AI psychiatrist.'),
  recommendations: z.array(RecommendationSchema).optional().describe('A list of recommendations and advice in a tabular format.'),
});
export type AIHealthConsultationOutput = z.infer<typeof AIHealthConsultationOutputSchema>;

export async function aiHealthConsultation(input: AIHealthConsultationInput): Promise<AIHealthConsultationOutput> {
  return aiHealthConsultationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthConsultationPrompt',
  input: {schema: AIHealthConsultationInputSchema},
  output: {schema: AIHealthConsultationOutputSchema},
  prompt: `You are an expert AI psychiatrist with over 30 years of experience and have successfully treated thousands of patients. Engage in a supportive and empathetic conversation.

If the user's query is about a specific disease, provide the information in a tabular format using the 'recommendations' field. Otherwise, provide a conversational response using the 'response' field.

Query: {{{query}}}`,
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
