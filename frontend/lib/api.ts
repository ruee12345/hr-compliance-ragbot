// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
  
  // Documents
  documents: `${API_BASE_URL}/api/documents/`,
  uploadDocument: `${API_BASE_URL}/api/documents/upload`,
  documentStats: `${API_BASE_URL}/api/documents/stats`,
  
  // RAG
  askQuestion: `${API_BASE_URL}/api/rag/ask`,
};

export { API_BASE_URL };
