'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { documentsApi } from '../api';
import type { UploadProgress, UploadResponse } from '../types';

export function useUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadProgress({
        filename: file.name,
        progress: 0,
        status: 'uploading',
      });

      try {
        const response = await documentsApi.upload(file, (progress) => {
          setUploadProgress({
            filename: file.name,
            progress,
            status: progress < 100 ? 'uploading' : 'processing',
          });
        });

        setUploadProgress({
          filename: file.name,
          progress: 100,
          status: 'complete',
        });

        return response;
      } catch (error: any) {
        setUploadProgress({
          filename: file.name,
          progress: 0,
          status: 'error',
          error: error.detail || 'Upload failed',
        });
        throw error;
      }
    },
  });

  const upload = async (file: File): Promise<UploadResponse> => {
    return uploadMutation.mutateAsync(file);
  };

  const reset = () => {
    setUploadProgress(null);
    uploadMutation.reset();
  };

  return {
    upload,
    uploadProgress,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
    reset,
  };
}
