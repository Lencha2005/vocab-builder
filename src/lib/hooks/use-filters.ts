'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiltersState } from '@/types';
import { getUrlWithParams } from '@/lib/hooks/set-page-and-filters';

const getBoolean = (val: string | null): boolean | null =>
  val === 'true' ? true : val === 'false' ? false : null;

export function useFilters(setPage: (page: number) => void) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FiltersState>({
    category: '',
    search: '',
    isIrregular: null,
  });
  const [ready, setReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const search = searchParams.get('search') ?? '';
    const category = searchParams.get('category') ?? '';
    const isIrregular = getBoolean(searchParams.get('isIrregular'));

    const pageParam = Number(searchParams.get('page')) || 1;

    setFilters({ category, search, isIrregular });
    setPage(pageParam);
    setReady(true);
  }, [searchParams, setPage]);

  const updateFilters = (
    updates: Partial<FiltersState> & { page?: number }
  ) => {
    const newFilters = { ...filters, ...updates };
    const hasFilters =
      !!newFilters.search ||
      !!newFilters.category ||
      newFilters.isIrregular !== null;

    const newPage = updates.page ?? 1;
    setPage(newPage);
    setFilters(newFilters);

    const onlyPageChanged =
      updates.page !== undefined &&
      updates.search === undefined &&
      updates.category === undefined &&
      updates.isIrregular === undefined &&
      !hasFilters;

    if (onlyPageChanged) return;

    const url = getUrlWithParams(pathname, {
      category: newFilters.category,
      isIrregular: newFilters.isIrregular,
      search: newFilters.search,
      page: hasFilters ? undefined : newPage,
    });

    router.replace(url);
  };

  const resetFilters = () => {
    const noFilters =
      filters.category === '' &&
      filters.search === '' &&
      filters.isIrregular === null;

    if (noFilters) return;

    setFilters({ category: '', search: '', isIrregular: null });
    setPage(1);
    router.replace(pathname);
  };

  return {
    filters,
    updateFilters,
    resetFilters,
    ready,
  };
}
