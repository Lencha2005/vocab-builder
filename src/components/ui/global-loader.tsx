'use client';

import { useSelector } from 'react-redux';
import { selectDictionaryLoading } from '@/redux/dictionary/selectors';
import { selectUserWordsLoading } from '@/redux/userWords/selectors';
import Loader from './loader';

export default function GlobalLoader() {
  const dictionaryLoading = useSelector(selectDictionaryLoading);
  const userWordsLoading = useSelector(selectUserWordsLoading);

  const isLoading = dictionaryLoading || userWordsLoading;

  if (!isLoading) return null;
  return <Loader />;
}
