'use client';

import React, { useEffect } from 'react';
import Dashboard from '../components/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import WordsTable from '../components/words-table';
import {
  selectCurrentPage,
  selectPerPages,
  selectTotalPages,
  selectWords,
} from '@/redux/dictionary/selectors';
import { getAllWords } from '@/redux/dictionary/operations';
import { addWordById } from '@/redux/userWords/operations';
import {
  selectCategory,
  selectIsIrregular,
  selectSearchTerm,
} from '@/redux/filters/selectors';
import { setCurrentPage } from '@/redux/dictionary/slice';
import WordsPagination from '../components/words-pagination';
import { resetFilters } from '@/redux/filters/slice';

export default function RecommendPage() {
  const dispatch = useDispatch<AppDispatch>();

  const dictionary = useSelector(selectWords);
  const page = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPages);
  const totalPages = useSelector(selectTotalPages);
  const category = useSelector(selectCategory);
  const searchTerm = useSelector(selectSearchTerm);
  const isIrregular = useSelector(selectIsIrregular);

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAllWords({
        category,
        isIrregular,
        keyword: searchTerm,
        page,
        limit: perPage,
      })
    );
  }, [dispatch, category, isIrregular, searchTerm, page, perPage]);

  const handleAddWord = (id: string) => {
    dispatch(addWordById(id));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div
      className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px]
    pt-8 md:pt-20 pb-12 px-4 md:px-8 xl:px-[100px] mx-auto "
    >
      <Dashboard />
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
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
