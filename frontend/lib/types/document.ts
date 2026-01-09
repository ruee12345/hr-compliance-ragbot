// Document Types
export interface Document {
  id: string;
  filename: string;
  file_type: string;
  upload_date: string;
  file_size: number;
  total_chunks: number;
}

export interface DocumentStats {
  total_documents: number;
  total_chunks: number;
  total_size: number;
}

export interface UploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface UploadResponse {
  message: string;
  filename: string;
  file_type: string;
  total_chunks: number;
  total_characters: number;
}
