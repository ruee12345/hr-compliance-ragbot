// Common/Shared Types
export interface ApiError {
  message: string;
  status: number;
  detail?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  isLoading: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
