"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api';

interface Document {
  filename: string;
  chunks: number;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  file_path: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.documents);
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }

    setDeleting(filename);
    try {
      const encodedFilename = encodeURIComponent(filename);
      await axios.delete(`${API_BASE_URL}/api/documents/${encodedFilename}`);
      
      // Refresh the list
      await fetchDocuments();
      
      alert('Document deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting document:', error);
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0084bd] to-[#72deff] text-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
              Document Library
            </h1>
            <p className="text-lg opacity-90">Manage your uploaded HR policy documents</p>
          </div>
          <Link
            href="/admin/upload"
            className="bg-white text-[#0084bd] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            + Upload New
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-xl p-4 shadow-lg mb-6 border-2 border-[#feffba]">
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-2xl font-bold text-[#0084bd]">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#8c6c57]">
              {documents.reduce((sum, doc) => sum + doc.chunks, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Chunks</div>
          </div>
          <div className="flex-1"></div>
          <button
            onClick={fetchDocuments}
            className="bg-[#feffba] text-gray-800 px-4 py-2 rounded-lg font-bold border-2 border-[#8c6c57] hover:bg-[#fffbc8] transition"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-[#0084bd]/20 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📚</div>
            <div className="text-xl text-gray-600">Loading documents...</div>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">Upload some HR policy documents to get started</p>
            <Link
              href="/admin/upload"
              className="bg-gradient-to-r from-[#0084bd] to-[#72deff] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              Upload Your First Document
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-700 border-b">Document</th>
                  <th className="p-4 text-left font-bold text-gray-700 border-b">Type</th>
                  <th className="p-4 text-left font-bold text-gray-700 border-b">Size</th>
                  <th className="p-4 text-left font-bold text-gray-700 border-b">Chunks</th>
                  <th className="p-4 text-left font-bold text-gray-700 border-b">Uploaded</th>
                  <th className="p-4 text-left font-bold text-gray-700 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={doc.filename} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 border-b">
                      <div className="font-bold text-gray-800">{doc.filename}</div>
                      <div className="text-sm text-gray-600 truncate max-w-md">{doc.file_path}</div>
                    </td>
                    <td className="p-4 border-b">
                      <span className="px-3 py-1 bg-[#feffba] text-gray-800 rounded-full text-sm font-bold">
                        {doc.file_type.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 border-b text-gray-700">{formatFileSize(doc.file_size)}</td>
                    <td className="p-4 border-b">
                      <span className="px-3 py-1 bg-[#8c6c57] text-white rounded-full text-sm font-bold">
                        {doc.chunks} chunks
                      </span>
                    </td>
                    <td className="p-4 border-b text-gray-700">{formatDate(doc.uploaded_at)}</td>
                    <td className="p-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(doc.filename)}
                          disabled={deleting === doc.filename}
                          className={`px-4 py-2 rounded-lg font-bold transition ${
                            deleting === doc.filename
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                              : 'bg-[#b22727] text-white hover:bg-red-700'
                          }`}
                        >
                          {deleting === doc.filename ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                          onClick={() => router.push(`/employee/chat?doc=${encodeURIComponent(doc.filename)}`)}
                          className="px-4 py-2 bg-[#0084bd] text-white rounded-lg font-bold hover:bg-blue-700 transition"
                        >
                          Query
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Note about deletion */}
      {documents.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-yellow-600 mr-3">⚠️</div>
            <div>
              <div className="font-bold text-yellow-800">Note about deletion:</div>
              <p className="text-yellow-700 text-sm">
                In the current implementation, deleting a document will clear ALL documents from the vector store. 
                This is a simplified version. Future updates will allow selective deletion.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
