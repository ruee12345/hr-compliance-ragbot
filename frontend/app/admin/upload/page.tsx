"use client";

import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import { documentsApi } from '@/lib/api';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function AdminUploadPage() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [category, setCategory] = useState('hr_policies');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload PDF, DOCX, or TXT files only');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    await handleUpload(file);
  }, [category]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  const handleUpload = async (file: File) => {
    setUploadStatus('uploading');
    setError('');
    setUploadResult(null);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // The original `setUploading(true)` and `setError(null)` are already handled by the lines above.
      const response = await documentsApi.upload(file, category, (progress) => {
        setUploadProgress(progress);
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('success');
      setUploadResult(response.data);

      // Reset after 5 seconds
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadProgress(0);
      }, 5000);

    } catch (err: any) {
      setUploadStatus('error');
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
      setUploadProgress(0);
    }
  };

  const handleManualUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0084bd] mb-2" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
          Upload HR Documents
        </h1>
        <p className="text-gray-600">
          Upload PDF, DOCX, or TXT files containing HR policies. The AI will process and learn from them.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upload Area */}
        <div className="lg:col-span-2">
          <div
            {...getRootProps()}
            className={`border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
              ${isDragActive ? 'border-[#0084bd] bg-[#72deff]/20' : 'border-[#8c6c57] hover:border-[#0084bd] hover:bg-[#feffba]/10'}
              ${uploadStatus === 'uploading' ? 'border-[#feffba] bg-[#feffba]/10' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            {uploadStatus === 'uploading' ? (
              <div>
                <div className="text-6xl mb-4">⏳</div>
                <div className="text-xl font-bold text-[#0084bd] mb-2">Processing Document...</div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    className="bg-[#0084bd] h-4 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">
                  Extracting text, creating embeddings... {uploadProgress}%
                </p>
              </div>
            ) : uploadStatus === 'success' ? (
              <div>
                <div className="text-6xl mb-4 text-green-500">✅</div>
                <div className="text-xl font-bold text-[#0084bd] mb-2">Upload Successful!</div>
                <p className="text-gray-600 mb-4">
                  Document processed and added to AI knowledge base
                </p>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">📤</div>
                <div className="text-xl font-bold text-gray-800 mb-2">
                  {isDragActive ? 'Drop the file here!' : 'Drag & drop your document here'}
                </div>
                <p className="text-gray-600 mb-6">
                  Supports PDF, DOCX, TXT files up to 10MB
                </p>
                <button className="px-6 py-3 bg-[#0084bd] text-white font-bold rounded-lg hover:bg-[#006994] transition">
                  Or click to select file
                </button>
              </div>
            )}
          </div>

          {/* Manual Upload */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Or select file manually:
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                onChange={handleManualUpload}
                accept=".pdf,.docx,.txt"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#feffba] file:text-gray-700 hover:file:bg-yellow-100"
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-500 mr-3">⚠️</div>
                <div>
                  <div className="font-bold text-[#b22727]">Upload Error</div>
                  <p className="text-gray-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Info & Categories */}
        <div>
          {/* Category Selection */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#8c6c57] mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Document Category</h3>
            <div className="space-y-3">
              {[
                { id: 'hr_policies', label: 'HR Policies', color: 'bg-[#0084bd]' },
                { id: 'code_of_conduct', label: 'Code of Conduct', color: 'bg-[#b22727]' },
                { id: 'benefits', label: 'Benefits', color: 'bg-[#feffba] text-gray-800' },
                { id: 'procedures', label: 'Procedures', color: 'bg-[#8c6c57]' },
              ].map((cat) => (
                <label key={cat.id} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={category === cat.id}
                    onChange={(e) => setCategory(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${category === cat.id ? cat.color + ' border-transparent' : 'border-gray-300'}`}>
                    {category === cat.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-medium">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upload Result */}
          {uploadResult && (
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#feffba] mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Upload Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Filename:</span>
                  <span className="font-bold">{uploadResult.filename}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-bold capitalize">{uploadResult.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chunks Created:</span>
                  <span className="font-bold">{uploadResult.total_chunks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size:</span>
                  <span className="font-bold">{(uploadResult.file_size / 1024).toFixed(0)} KB</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-gradient-to-br from-[#feffba] to-[#fffbc8] rounded-xl p-6 border-2 border-yellow-300">
            <h3 className="font-bold text-gray-800 mb-3">💡 Upload Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <div>Clear, scanned PDFs work best</div>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <div>Documents should contain HR policies, guidelines, or procedures</div>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <div>Processing takes 10-30 seconds depending on file size</div>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <div>After upload, test questions in <Link href="/employee/chat" className="text-[#0084bd] font-bold hover:underline">Employee Chat</Link></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
