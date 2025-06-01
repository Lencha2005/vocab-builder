'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  deleteWordById,
  getUserWordsWithPagination,
} from '@/redux/userWords/operations';
import {
  selectUserWords,
  selectCurrentPage,
  selectPerPages,
  selectTotalPages,
  selectStatistics,
} from '@/redux/userWords/selectors';
import { setCurrentPage } from '@/redux/userWords/slice';
import { useProtectRoute } from '@/lib/hooks/use-protect-route';
import { useFilters } from '@/lib/hooks/use-filters';

import Dashboard from '../../components/forms/dashboard';
import WordsTable from '../../components/tables/words-table';
import WordsPagination from '../../components/tables/words-pagination';
import EditWordModal from '../../components/modals/edit-word-modal';
import AddWordModal from '../../components/modals/add-word-modal';
import { useSearchParams } from 'next/navigation';

export default function Dictionary() {
  const { isLoading, status } = useProtectRoute();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const dictionary = useSelector(selectUserWords);
  console.log('dictionary: ', dictionary);
  const page = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPages);
  const totalPages = useSelector(selectTotalPages);
  const statistics = useSelector(selectStatistics);

  const [modals, setModals] = useState({
    editId: null as string | null,
    add: false,
  });

  useEffect(() => {
    if (searchParams.get('addWord') === 'true') {
      setModals(prev => ({ ...prev, add: true }));
    }
  }, [searchParams]);

  const { filters, updateFilters, resetFilters, ready } = useFilters(page =>
    dispatch(setCurrentPage(page))
  );

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(
        getUserWordsWithPagination({
          ...filters,
          keyword: filters.search,
          page,
          limit: perPage,
        })
      );
    }
  }, [dispatch, filters, page, perPage, status]);

  if (isLoading || !ready) return null;

  return (
    <div className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px] pt-8 md:pt-20 pb-12 px-4 md:px-8 xl:px-[100px] mx-auto">
      <Dashboard
        onAddClick={() => setModals(prev => ({ ...prev, add: true }))}
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

      <WordsTable
        words={dictionary}
        onEdit={id => setModals({ ...modals, editId: id })}
        onDelete={id => dispatch(deleteWordById(id))}
      />

      <WordsPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={page => updateFilters({ page })}
      />

      {modals.add && (
        <AddWordModal
          onClose={() => setModals({ ...modals, add: false })}
          filters={filters}
          page={page}
          limit={perPage}
        />
      )}
      {modals.editId && (
        <EditWordModal
          word={dictionary.find(w => w._id === modals.editId)!}
          onClose={() => setModals({ ...modals, editId: null })}
        />
      )}
    </div>
  );
}
