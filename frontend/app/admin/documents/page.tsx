'use client';

import Link from 'next/link';
import { DocumentList } from '@/components/features/documents';
import { useDocuments } from '@/lib/hooks';
import { Card } from '@/components/ui';

export default function DocumentsPage() {
  const { stats, isLoadingStats } = useDocuments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Library</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your HR policy documents
              </p>
            </div>
            <Link
              href="/admin/upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload Document
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {!isLoadingStats && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card padding="md">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.total_documents}</p>
                <p className="text-sm text-gray-600 mt-1">Total Documents</p>
              </div>
            </Card>
            <Card padding="md">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{stats.total_chunks}</p>
                <p className="text-sm text-gray-600 mt-1">Total Chunks</p>
              </div>
            </Card>
            <Card padding="md">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {(stats.total_size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <p className="text-sm text-gray-600 mt-1">Total Size</p>
              </div>
            </Card>
          </div>
        )}

        {/* Document List */}
        <DocumentList />
      </div>
    </div>
  );
}
