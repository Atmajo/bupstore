'use client';

import { useEffect, useState } from 'react';
import { apiClient } from './useApi';
import { Domain } from './useDomains';

export interface Code {
  id: string;
  code: string;
  slot: number;
  status: 'active' | 'used' | 'expired';
  usedAt?: string;
  createdAt: string;
}

interface UseCodesResult {
  codes: Code[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateCodeStatus: (codeId: string, status: 'active' | 'used' | 'expired') => Promise<void>;
}

export const useCodes = (domainId: string | undefined): UseCodesResult => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCodes = async () => {
    if (!domainId) {
      setIsLoading(false);
      return;
    }

    try {
      const domain: Domain = await apiClient.get(`/api/backup/${domainId}`)

      setIsLoading(true);
      setError(null);
      setCodes(domain.codes || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch codes');
      setCodes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCodeStatus = async (codeId: string, status: 'active' | 'used' | 'expired') => {
    if (!domainId) {
      throw new Error('Domain ID is required');
    }

    try {
      await apiClient.put(`/api/backup/${domainId}/${codeId}`, { status });

      await fetchCodes();
    } catch (err: any) {
      setError(err.message || 'Failed to update code status');
      throw err;
    }
  };

  useEffect(() => {
    fetchCodes();
  }, [domainId]);

  return {
    codes,
    isLoading,
    error,
    refetch: fetchCodes,
    updateCodeStatus,
  };
};
