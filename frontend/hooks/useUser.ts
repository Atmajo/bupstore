'use client';

import { useEffect, useState } from 'react';
import { apiClient } from './useApi';

interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  avatar?: string;
  createdAt?: string;
}

interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUser = (): UseUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiClient.get<{ user: User }>('/api/auth/me');
      setUser(data.user);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
  };
};
