import React from 'react';

type WordsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
};

export default function WordsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: WordsPaginationProps) {
  return <div>WordsPagination</div>;
}
