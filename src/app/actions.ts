'use server';

import { aiHealthConsultation } from '@/ai/flows/ai-health-consultation';
import type { AIHealthConsultationOutput } from '@/ai/flows/ai-health-consultation';

export async function getAiReply(
  query: string
): Promise<AIHealthConsultationOutput> {
  if (!query) {
    throw new Error('Query cannot be empty.');
  }

  try {
    const result = await aiHealthConsultation({ query });
    return result;
  } catch (error) {
    console.error('Error getting AI reply:', error);
    throw new Error('Failed to get a response from the AI assistant.');
  }
}
