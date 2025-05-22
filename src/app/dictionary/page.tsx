'use client';

import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteWordById, getUserWords } from '@/redux/userWords/operations';
import EditWordModal from '../components/edit-word-modal';
import {
  selectCurrentPage,
  selectPerPages,
  selectTotalPages,
  selectUserWords,
} from '@/redux/userWords/selectors';
import WordsTable from '../components/words-table';
import {
  selectCategory,
  selectIsIrregular,
  selectSearchTerm,
} from '@/redux/filters/selectors';
import { resetFilters } from '@/redux/filters/slice';
import { setCurrentPage } from '@/redux/userWords/slice';
import WordsPagination from '../components/words-pagination';

export default function DictionaryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const dictionary = useSelector(selectUserWords);

  const page = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPages);
  const totalPages = useSelector(selectTotalPages);
  const category = useSelector(selectCategory);
  const searchTerm = useSelector(selectSearchTerm);
  const isIrregular = useSelector(selectIsIrregular);

  const [editWordId, setEditWordId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getUserWords({
        category,
        isIrregular,
        keyword: searchTerm,
        page,
        limit: perPage,
      })
    );
  }, [dispatch, category, isIrregular, searchTerm, page, perPage]);

  const handleEdit = (id: string) => {
    setEditWordId(id);
    setIsEditModalOpen(true);
  };

  const wordToEdit = dictionary.find(word => word._id === editWordId);

  const handleDelete = (id: string) => {
    dispatch(deleteWordById(id));
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
      <WordsTable
        words={dictionary}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isEditModalOpen && wordToEdit && (
        <EditWordModal
          word={wordToEdit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      <WordsPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
