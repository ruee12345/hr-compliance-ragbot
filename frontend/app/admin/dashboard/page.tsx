"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.documentStats);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-[#0084bd] to-[#72deff] text-white rounded-2xl p-8 mb-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
          Welcome to Admin Dashboard
        </h1>
        <p className="text-lg opacity-90">Manage HR policy documents and monitor AI assistant performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Uploaded Files */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#feffba]">
          <div className="text-4xl font-bold text-[#0084bd] mb-2">
            {loading ? '...' : stats?.total_documents || 0}
          </div>
          <div className="font-bold text-gray-800">Uploaded Files</div>
          <p className="text-sm text-gray-600 mt-2">HR documents in system</p>
        </div>

        {/* Card 2: AI Memory Chunks */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#8c6c57]">
          <div className="text-4xl font-bold text-[#8c6c57] mb-2">
            {loading ? '...' : stats?.total_chunks || 0}
          </div>
          <div className="font-bold text-gray-800">AI Memory Chunks</div>
          <p className="text-sm text-gray-600 mt-2">Searchable text pieces</p>
        </div>

        {/* Card 3: Vector Store Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#b22727]">
          <div className="text-4xl font-bold text-[#b22727] mb-2">
            {loading ? '...' : stats?.vector_store_loaded ? '✅' : '❌'}
          </div>
          <div className="font-bold text-gray-800">Vector Store</div>
          <p className="text-sm text-gray-600 mt-2">
            {loading ? 'Checking...' : stats?.vector_store_loaded ? 'Loaded & Ready' : 'Not Loaded'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border-2 border-[#0084bd]/20">
        <h2 className="text-xl font-bold text-[#0084bd] mb-4" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/documents"
            className="p-4 bg-gradient-to-r from-[#feffba] to-[#fffbc8] rounded-lg border-2 border-[#8c6c57] hover:border-[#0084bd] transition group"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-bold text-gray-800">View Documents</div>
            <p className="text-sm text-gray-600">Manage uploaded files</p>
          </Link>

          <Link
            href="/admin/upload"
            className="p-4 bg-gradient-to-r from-[#72deff] to-[#b3ebff] rounded-lg border-2 border-[#0084bd] hover:border-[#8c6c57] transition group"
          >
            <div className="text-2xl mb-2">📤</div>
            <div className="font-bold text-gray-800">Upload New PDF</div>
            <p className="text-sm text-gray-600">Add HR policy documents</p>
          </Link>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#feffba]">
        <h2 className="text-xl font-bold text-[#0084bd] mb-4" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
          How to Use Admin Panel
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="text-[#0084bd] font-bold text-xl">1.</div>
            <div>
              <div className="font-bold text-gray-800">View Documents</div>
              <p className="text-gray-600">Navigate to the Documents page to see all uploaded HR policy files</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-[#0084bd] font-bold text-xl">2.</div>
            <div>
              <div className="font-bold text-gray-800">Upload New Documents</div>
              <p className="text-gray-600">Go to the Upload page to add new PDF files containing company policies</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-[#0084bd] font-bold text-xl">3.</div>
            <div>
              <div className="font-bold text-gray-800">Documents are processed automatically</div>
              <p className="text-gray-600">The system extracts text, creates embeddings, and stores in vector database</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-[#0084bd] font-bold text-xl">4.</div>
            <div>
              <div className="font-bold text-gray-800">Employees can ask questions</div>
              <p className="text-gray-600">Go to Employee Chat page to test questions about uploaded policies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}