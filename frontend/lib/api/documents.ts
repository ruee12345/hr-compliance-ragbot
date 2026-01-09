import apiClient from './client';
import type { Document, DocumentStats, UploadResponse } from '../types';

/**
 * Documents API functions
 */
export const documentsApi = {
  /**
   * Get all documents
   */
  getAll: async (): Promise<Document[]> => {
    const response = await apiClient.get<{ documents: any[] }>('/api/documents');
    // Backend returns { total_documents, documents } - we need just the documents array
    return response.data.documents || [];
  },

  /**
   * Get document statistics
   */
  getStats: async (): Promise<DocumentStats> => {
    const response = await apiClient.get<DocumentStats>('/api/documents/stats');
    return response.data;
  },

  /**
   * Upload a document
   */
  upload: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadResponse>('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  },

  /**
   * Delete a document
   */
  delete: async (filename: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/api/documents/${filename}`);
    return response.data;
  },
};
