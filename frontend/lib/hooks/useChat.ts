'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ragApi } from '../api';
import type { ChatMessage, ChatRequest } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>('');

  const queryMutation = useMutation({
    mutationFn: ragApi.query,
    onSuccess: (response) => {
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setConversationId(response.conversation_id);
    },
  });

  const sendMessage = async (question: string) => {
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Send to API
    const request: ChatRequest = {
      question,
      conversation_id: conversationId || undefined,
    };

    try {
      await queryMutation.mutateAsync(request);
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setConversationId('');
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading: queryMutation.isPending,
    error: queryMutation.error,
  };
}
