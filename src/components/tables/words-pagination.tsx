'use client';

import React from 'react';
import { generatePagination } from '@/lib/utils/generatePagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import Icon from '../ui/icon';

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const isTablet = useMediaQuery('(min-width: 768px)');
  const visiblePages = isTablet ? 3 : 2;

  const allPages = generatePagination(currentPage, totalPages, visiblePages);
  if (!currentPage || !totalPages) return null;

  return (
    <div className="flex justify-center gap-[10px]">
      <PaginationArrowDouble
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
        currentPage={currentPage}
        onClick={onPageChange}
      />

      <div className="flex gap-[10px]">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
              onClick={onPageChange}
            />
          );
        })}
      </div>
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        currentPage={currentPage}
        onClick={onPageChange}
      />
      <PaginationArrowDouble
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  onClick,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  onClick: (value: number) => void;
}) {
  const className = clsx(
    'flex xs:h-6 xs:w-6 sm:h-7 sm:w-7 sm:h-8 sm:w-8 items-center justify-center xs:text-xs md:text-[13px] font-semibold rounded-lg border border-black-10',
    {
      'z-10 bg-green-dark border-green-dark text-white-true': isActive,
      'hover:border-green-dark': !isActive && position !== 'middle',
      'text-black': position === 'middle',
    }
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (typeof page === 'number') {
          onClick(page);
        }
      }}
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  currentPage,
  onClick,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
  currentPage: number;
  onClick: (value: number) => void;
}) {
  const className = clsx(
    'flex xs:h-6 xs:w-6 sm:h-7 sm:w-7 sm:w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-black-10',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:text-green-dark hover:border-green-dark': !isDisabled,
    }
  );

  const icon =
    direction === 'left' ? (
      <Icon name="icon-paginat" className="w-[16px] h-[16px] " />
    ) : (
      <Icon name="icon-paginat" className="w-[16px] h-[16px] rotate-180" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link
      className={className}
      href={href}
      onClick={() =>
        onClick(direction === 'left' ? currentPage - 1 : currentPage + 1)
      }
    >
      {icon}
    </Link>
  );
}

function PaginationArrowDouble({
  href,
  direction,
  isDisabled,
  totalPages,
  onPageChange,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
  totalPages: number;
  onPageChange: (value: number) => void;
}) {
  const className = clsx(
    'flex xs:h-6 xs:w-6 sm:h-7 sm:w-7 sm:w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-black-10 ',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:text-green-dark hover:border-green-dark': !isDisabled,
    }
  );

  const icon =
    direction === 'left' ? (
      <>
        <Icon name="icon-paginat-double" className="w-[16px] h-[16px] " />
      </>
    ) : (
      <>
        <Icon
          name="icon-paginat-double"
          className="w-[16px] h-[16px] rotate-180"
        />
      </>
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link
      className={className}
      href={href}
      onClick={() => onPageChange(direction === 'left' ? 1 : totalPages)}
    >
      {icon}
    </Link>
  );
}
