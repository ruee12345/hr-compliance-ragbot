'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUpload } from '@/lib/hooks';
import { Card } from '@/components/ui';

interface UploadZoneProps {
  onUploadComplete?: () => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUploadComplete }) => {
  const { upload, uploadProgress, isUploading, reset } = useUpload();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      try {
        await upload(acceptedFiles[0]);
        onUploadComplete?.();
        setTimeout(reset, 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  }, [upload, onUploadComplete, reset]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <Card>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {uploadProgress ? (
          <div className="space-y-4">
            <div className="text-4xl">
              {uploadProgress.status === 'complete' ? '✅' : '📤'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {uploadProgress.filename}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {uploadProgress.status === 'uploading' && 'Uploading...'}
                {uploadProgress.status === 'processing' && 'Processing...'}
                {uploadProgress.status === 'complete' && 'Upload complete!'}
                {uploadProgress.status === 'error' && `Error: ${uploadProgress.error}`}
              </p>
            </div>
            {uploadProgress.status !== 'error' && uploadProgress.status !== 'complete' && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.progress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">
                {isDragActive ? 'Drop the file here' : 'Drag and drop a file here'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                or click to select a file
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Supported: PDF, DOCX, TXT (Max 10MB)
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default UploadZone;
