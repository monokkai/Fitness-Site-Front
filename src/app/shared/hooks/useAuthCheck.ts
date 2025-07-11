'use client';

import { useRouter } from 'next/navigation';
import { AUTH_ENDPOINTS } from '../config/api.config';

export const useAuthCheck = () => {
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.ME, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        router.push('/auth');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/auth');
      return false;
    }
  };

  const handleProtectedAction = async (action: () => void) => {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      action();
    }
  };

  const handleProtectedRoute = async (route: string) => {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      router.push(route);
    }
  };

  return {
    checkAuth,
    handleProtectedAction,
    handleProtectedRoute
  };
}; 