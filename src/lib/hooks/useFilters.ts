'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Filters {
  category: string;
  search: string;
}

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || 'all',
      search: searchParams.get('search') || '',
    });
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  }, [filters, router]);

  const resetFilters = useCallback(() => {
    setFilters({ category: 'all', search: '' });
    router.push('');
  }, [router]);

  return { filters, updateFilters, resetFilters };
}

