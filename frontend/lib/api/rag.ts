import apiClient from './client';
import type { ChatRequest, ChatResponse } from '../types';

/**
 * RAG/Chat API functions
 */
export const ragApi = {
  /**
   * Send a question to the RAG system
   */
  query: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>('/api/rag/query', request);
    return response.data;
  },

  /**
   * Clear conversation history
   */
  clearHistory: async (conversationId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/api/rag/conversations/${conversationId}`);
    return response.data;
  },
};
