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
// import Icon from './ui/icon';
// import ProgressBar from './progress-bar';
// import ActionsMenu from './actions-menu';

type WordsTableProps = {
  words: WordItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function WordsTable({
  words,
  onEdit,
  onDelete,
}: WordsTableProps) {
  const columns: ColumnDef<WordItem>[] = [
    { accessorKey: 'en', header: 'Word', cell: info => info.getValue() },
    { accessorKey: 'ua', header: 'Translation', cell: info => info.getValue() },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => info.getValue(),
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

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full md:rounded-[15px] border-0 md:border-[18px] border-white-true ">
      <table className="rounded-[15px] w-full border-hidden">
        <thead className="bg-gray-10 text-left font-medium">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-4 font-medium border border-gray"
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
            <tr key={row.id} className="font-medium text-sm">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-3 border border-gray">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
