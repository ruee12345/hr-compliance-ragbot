'use client';

import { useState, useEffect } from 'react';
import { authApi } from '../api';
import type { User, LoginRequest, AuthState } from '../types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const user = authApi.getCurrentUser();
    const isAuthenticated = authApi.isAuthenticated();
    
    setAuthState({
      user,
      isAuthenticated,
      isLoading: false,
      error: null,
    });
  }, []);

  const login = async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authApi.login(credentials);
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.detail || 'Login failed',
      }));
      throw error;
    }
  };

  const logout = async () => {
    await authApi.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}
