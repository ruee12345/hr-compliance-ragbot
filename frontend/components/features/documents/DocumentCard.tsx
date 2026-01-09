'use client';

import React from 'react';
import type { Document } from '@/lib/types';
import { format } from 'date-fns';

interface DocumentCardProps {
  document: Document;
  onDelete?: (filename: string) => void;
  isDeleting?: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onDelete,
  isDeleting = false,
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'docx':
      case 'doc':
        return '📝';
      case 'txt':
        return '📃';
      default:
        return '📎';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-3xl">{getFileIcon(document.file_type)}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {document.filename}
            </h3>
            <div className="mt-1 space-y-1">
              <p className="text-sm text-gray-500">
                {formatFileSize(document.file_size)} • {document.total_chunks} chunks
              </p>
              <p className="text-xs text-gray-400">
                Uploaded {format(new Date(document.upload_date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
        
        {onDelete && (
          <button
            onClick={() => onDelete(document.filename)}
            disabled={isDeleting}
            className="ml-2 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete document"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
