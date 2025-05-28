'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  selectCurrentPage,
  selectPerPages,
  selectTotalPages,
  selectWords,
} from '@/redux/dictionary/selectors';
import { getAllWords } from '@/redux/dictionary/operations';
import { addWordById } from '@/redux/userWords/operations';
import { setCurrentPage } from '@/redux/dictionary/slice';
import { useProtectRoute } from '@/lib/hooks/use-protect-route';
import Dashboard from '../../components/forms/dashboard';
import WordsTable from '../../components/tables/words-table';
import WordsPagination from '../../components/tables/words-pagination';
import { useFilters } from '@/lib/hooks/use-filters';
import { selectStatistics } from '@/redux/userWords/selectors';
import toast from 'react-hot-toast';

export default function Recommend() {
  const { isLoading, status } = useProtectRoute();
  const dispatch = useDispatch<AppDispatch>();

  const dictionary = useSelector(selectWords);
  const page = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPages);
  const totalPages = useSelector(selectTotalPages);
  const statistics = useSelector(selectStatistics);

  const { filters, updateFilters, resetFilters, ready } = useFilters(page =>
    dispatch(setCurrentPage(page))
  );

  useEffect(() => {
    if (status !== 'authenticated') return;
    dispatch(
      getAllWords({
        ...filters,
        keyword: filters.search,
        page,
        limit: perPage,
      })
    );
  }, [dispatch, filters, page, perPage, status]);

  const handleAddWord = async (id: string) => {
    try {
      await dispatch(addWordById(id)).unwrap();
      toast.success('Word added to dictionary');
    } catch (error) {
      if (error && typeof error === 'string' && error.includes('409')) {
        toast.error('This word already exists in your dictionary');
      } else {
        toast.error('Failed to add word');
      }
    }
  };

  if (isLoading || !ready) return null;

  return (
    <div className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px] pt-8 md:pt-20 pb-12 px-4 md:px-8 xl:px-[100px] mx-auto">
      <Dashboard
        isDictionaryPage={false}
        onResetFilters={resetFilters}
        category={filters.category}
        isIrregular={filters.isIrregular}
        searchTerm={filters.search}
        statistics={statistics}
        onSelect={val =>
          updateFilters({
            category: val,
            isIrregular:
              val.toLowerCase() === 'verb' ? filters.isIrregular : null,
          })
        }
        onIrregularChange={val => updateFilters({ isIrregular: val })}
        onSearch={val => updateFilters({ search: val })}
      />
      {dictionary.length === 0 ? (
        <p className="text-center text-black font-medium mt-6">
          No words found
        </p>
      ) : (
        <>
          <WordsTable
            words={dictionary}
            onAdd={handleAddWord}
            variant="recommend"
          />
          <WordsPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={page => updateFilters({ page })}
          />
        </>
      )}
    </div>
  );
}
