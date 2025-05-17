import { WordItem } from '@/redux/types/types';
import React from 'react';

type EditWordModalProps = {
  word: WordItem;
  onClose: () => void;
};

export default function EditWordModal({}: EditWordModalProps) {
  return <div>EditWordModal</div>;
}
