'use client';

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { WordItem } from '@/redux/types/types';
import { ProgressBar } from './progress-bar';
import { ActionsMenu } from './actions-menu';
import Icon from './ui/icon';
// import Icon from './ui/icon';
// import ProgressBar from './progress-bar';
// import ActionsMenu from './actions-menu';

interface CustomColumnMeta {
  hideOnMobile?: boolean;
}
type TypedColumnDef<T> = ColumnDef<T, unknown> & {
  meta?: CustomColumnMeta;
};

type WordsTableProps = {
  words: WordItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  variant?: 'default' | 'recommend';
};

export default function WordsTable({
  words,
  onEdit,
  onDelete,
  variant = 'default',
}: WordsTableProps) {
  const baseColumns: TypedColumnDef<WordItem>[] = [
    { accessorKey: 'en', header: 'Word', cell: info => info.getValue() },
    { accessorKey: 'ua', header: 'Translation', cell: info => info.getValue() },
  ];

  const defaultColumns: TypedColumnDef<WordItem>[] = [
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => info.getValue(),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
      cell: ({ row }) => <ProgressBar value={row.original.progress ?? 0} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <ActionsMenu
          onEdit={() => onEdit(row.original._id!)}
          onDelete={() => onDelete(row.original._id!)}
        />
      ),
    },
  ];

  const recommendColumns: TypedColumnDef<WordItem>[] = [
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => info.getValue(),
    },
    {
      id: 'addToDictionary',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => onEdit(row.original._id!)}
          className="text-green-primary underline text-sm md:text-base"
        >
          <span className="hidden md:block">Add to dictionary</span>
          <Icon
            name="icon-switch-horizontal"
            className="w-[20px] h-[20px] stroke-green-dark"
          />
        </button>
      ),
    },
  ];

  const columns =
    variant === 'default'
      ? [...baseColumns, ...defaultColumns]
      : [...baseColumns, ...recommendColumns];

  const table = useReactTable<WordItem>({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {},
  });

  return (
    <div className="w-full md:rounded-[15px] border-0 md:border-[18px] border-white-true md:bg-white-true">
      <div className="w-full overflow-hidden rounded-[15px]">
        <table className="rounded-[15px] max-w-[343px] border-hidden">
          <thead className=" bg-gray-10 text-left font-medium">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`p-4 font-medium border border-gray ${
                      (header.column.columnDef as TypedColumnDef<WordItem>).meta
                        ?.hideOnMobile
                        ? 'hidden md:table-cell'
                        : ''
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="font-medium text-sm bg-white">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className={`pl-3 pr-2 py-4 border border-gray break-all ${
                      (cell.column.columnDef as TypedColumnDef<WordItem>).meta
                        ?.hideOnMobile
                        ? 'hidden md:table-cell'
                        : ''
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
