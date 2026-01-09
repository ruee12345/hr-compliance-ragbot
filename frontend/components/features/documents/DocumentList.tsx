import React from 'react';
import DocumentCard from './DocumentCard';
import { useDocuments } from '@/lib/hooks';
import { Card, LoadingSkeleton } from '@/components/ui';

const DocumentList: React.FC = () => {
  const { documents, isLoading, deleteDocument, isDeleting } = useDocuments();

  if (isLoading) {
    return <LoadingSkeleton type="list" count={3} />;
  }

  if (documents.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by uploading a document.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onDelete={deleteDocument}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default DocumentList;
