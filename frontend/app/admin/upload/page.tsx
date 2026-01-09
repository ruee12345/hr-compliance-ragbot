'use client';

import Link from 'next/link';
import { UploadZone } from '@/components/features/documents';
import { useDocuments } from '@/lib/hooks';

export default function UploadPage() {
  const { refetch } = useDocuments();

  const handleUploadComplete = () => {
    // Refresh documents list
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
              <p className="text-sm text-gray-600 mt-1">
                Add new HR policy documents to the knowledge base
              </p>
            </div>
            <Link
              href="/admin/documents"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              View All Documents
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <UploadZone onUploadComplete={handleUploadComplete} />
        
        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Upload Instructions
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Supported formats: PDF, DOCX, TXT</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Maximum file size: 10MB</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Documents will be automatically processed and indexed</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Processing time depends on document size (typically 10-30 seconds)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
