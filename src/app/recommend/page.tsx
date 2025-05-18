'use client';

import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteWordById } from '@/redux/userWords/operations';
import EditWordModal from '../components/edit-word-modal';
import WordsTable from '../components/words-table';
import { selectWords } from '@/redux/dictionary/selectors';
import { getAllWords } from '@/redux/dictionary/operations';

export default function RecommendPage() {
  const dispatch = useDispatch<AppDispatch>();

  const dictionary = useSelector(selectWords);
  console.log('dictionary: ', dictionary);

  const [editWordId, setEditWordId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllWords());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    setEditWordId(id);
    setIsEditModalOpen(true);
  };

  const wordToEdit = dictionary.find(word => word._id === editWordId);

  const handleDelete = (id: string) => {
    dispatch(deleteWordById(id));
  };

  return (
    // <div className="bg-white">
    <div
      className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px]
    pt-8 md:pt-20 pb-12 px-4 md:px-8 xl:px-[100px] mx-auto "
    >
      <Dashboard />
      <WordsTable
        words={dictionary}
        onEdit={handleEdit}
        onDelete={handleDelete}
        variant="recommend"
      />
      {isEditModalOpen && wordToEdit && (
        <EditWordModal
          word={wordToEdit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
    // </div>
  );
}
