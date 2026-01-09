'use client';

import Link from 'next/link';
import { useDocuments } from '@/lib/hooks';
import { Card } from '@/components/ui';

export default function AdminDashboardPage() {
  const { stats, documents, isLoading, isLoadingStats } = useDocuments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-100 mt-2">
            Manage documents and monitor system activity
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoadingStats ? '...' : stats?.total_documents || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Chunks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoadingStats ? '...' : stats?.total_chunks || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoadingStats ? '...' : `${((stats?.total_size || 0) / (1024 * 1024)).toFixed(1)} MB`}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600 mt-1">Active</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Quick Actions" padding="md" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/upload"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="bg-blue-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Upload Document</p>
                <p className="text-sm text-gray-600">Add new policy</p>
              </div>
            </Link>

            <Link
              href="/admin/documents"
              className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="bg-green-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">View Documents</p>
                <p className="text-sm text-gray-600">Manage library</p>
              </div>
            </Link>

            <Link
              href="/employee/chat"
              className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="bg-purple-600 p-2 rounded">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Test Chat</p>
                <p className="text-sm text-gray-600">Try the assistant</p>
              </div>
            </Link>
          </div>
        </Card>

        {/* Recent Documents */}
        <Card title="Recent Documents" padding="md">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No documents uploaded yet
            </div>
          ) : (
            <div className="space-y-3">
              {documents.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {doc.file_type === 'pdf' ? '📄' : doc.file_type === 'docx' ? '📝' : '📃'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.filename}</p>
                      <p className="text-sm text-gray-500">
                        {doc.total_chunks} chunks • {(doc.file_size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/admin/documents"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}