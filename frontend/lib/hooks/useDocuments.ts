'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '../api';
import type { Document, DocumentStats } from '../types';

export function useDocuments() {
  const queryClient = useQueryClient();

  // Fetch all documents
  const {
    data: documents = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: documentsApi.getAll,
  });

  // Fetch document stats
  const {
    data: stats,
    isLoading: isLoadingStats,
  } = useQuery<DocumentStats>({
    queryKey: ['documents', 'stats'],
    queryFn: documentsApi.getStats,
  });

  // Delete document mutation
  const deleteMutation = useMutation({
    mutationFn: documentsApi.delete,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['documents', 'stats'] });
    },
  });

  const deleteDocument = async (filename: string) => {
    return deleteMutation.mutateAsync(filename);
  };

  return {
    documents,
    stats,
    isLoading,
    isLoadingStats,
    error,
    refetch,
    deleteDocument,
    isDeleting: deleteMutation.isPending,
  };
}
