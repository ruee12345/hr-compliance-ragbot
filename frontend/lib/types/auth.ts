// Authentication Types
export interface User {
  email: string;
  name: string;
  role: 'admin' | 'employee';
}

export interface LoginRequest {
  email: string;
  password: string;
  role?: 'admin' | 'employee';
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
