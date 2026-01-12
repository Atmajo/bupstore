import { useEffect, useState } from 'react';
import { apiClient } from './useApi';
import { Code } from './useCodes';

export interface Domain {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  remainingCodes: number;
  totalCodes: number;
  lastSync?: string;
  status: 'active' | 'low' | 'inactive';
  createdAt?: string;
  codes?: Code[];
}

interface UseDomainsResult {
  domains: Domain[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDomains = (): UseDomainsResult => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiClient.get<{ domains: Domain[] }>('/api/backup/');
      setDomains(data.domains || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch domains');
      setDomains([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return {
    domains,
    isLoading,
    error,
    refetch: fetchDomains,
  };
};
