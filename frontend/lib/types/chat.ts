// Chat/RAG Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: DocumentSource[];
}

export interface DocumentSource {
  filename: string;
  chunk_id: number;
  text: string;
  score: number;
}

export interface ChatRequest {
  question: string;
  conversation_id?: string;
}

export interface ChatResponse {
  answer: string;
  sources: DocumentSource[];
  conversation_id: string;
}

export interface ConversationHistory {
  conversation_id: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
}
