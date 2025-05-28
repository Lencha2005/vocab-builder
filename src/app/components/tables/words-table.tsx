'use client';

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { WordItem } from '../../../types/word';
import { ProgressBar } from './progress-bar';
import { ActionsMenu } from '../modals/actions-menu';
import toast from 'react-hot-toast';
import Icon from '../ui/icon';
import TableHeaderWithIcon from './table-header-with-icon';

interface CustomColumnMeta {
  hideOnMobile?: boolean;
}
type TypedColumnDef<T> = ColumnDef<T, unknown> & {
  meta?: CustomColumnMeta;
};

type WordsTableProps = {
  words: WordItem[];
  onAdd?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  variant?: 'default' | 'recommend';
};

export default function WordsTable({
  words,
  onAdd,
  onEdit,
  onDelete,
  variant = 'default',
}: WordsTableProps) {
  const baseColumns: TypedColumnDef<WordItem>[] = [
    {
      accessorKey: 'en',
      header: () => (
        <TableHeaderWithIcon iconName="icon-united-kingdom" label="Word" />
      ),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'ua',
      header: () => (
        <TableHeaderWithIcon iconName="icon-ukraine" label="Translation" />
      ),
      cell: info => info.getValue(),
    },
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
      cell: ({ row }) =>
        onEdit && onDelete ? (
          <ActionsMenu
            onEdit={() => onEdit(row.original._id!)}
            onDelete={() => onDelete(row.original._id!)}
          />
        ) : null,
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
      cell: ({ row }) =>
        onAdd ? (
          <button
            onClick={() => {
              onAdd(row.original._id!);
              toast.success('Word added to dictionary');
            }}
            className="text-green-primary text-sm xl:text-base font-medium 
            flex flex-col gap-[2px] xl:flex-row xl:gap-2 xl:items-center cursor-pointer"
          >
            <span className="hidden md:block whitespace-nowrap">
              Add to dictionary
            </span>
            <Icon
              name="icon-switch-horizontal"
              className="w-[20px] h-[20px] stroke-green-dark"
            />
          </button>
        ) : null,
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
    <div className="w-full md:rounded-[15px] border-0 md:border-[18px] border-white-true md:bg-white-true mb-8 md:mb-7">
      <div className="w-full overflow-hidden rounded-[15px]">
        <table className="rounded-[15px] w-full border-hidden">
          <thead className=" bg-gray-10 text-left xs:text-sm sm:text-base md:text-lg xl:text-xl">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`font-medium xs:p-3 sm:p-4 md:p-[22px] md:pr-3 border border-gray ${
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
              <tr
                key={row.id}
                className="font-medium xs:text-xs sm:text-sm md:text-lg xl:text-xl bg-white"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className={`xs:p-3 sm:pl-3 sm:pr-2 sm:py-4 md:p-[22px] border border-gray break-anywhere  whitespace-pre-line align-top ${
                      (cell.column.columnDef as TypedColumnDef<WordItem>).meta
                        ?.hideOnMobile
                        ? 'hidden md:table-cell'
                        : ''
                    }
                    ${
                      cell.column.id === 'addToDictionary'
                        ? 'px-[9px] py-[14px] md:px-[14px] xl:px-[22px] align-center'
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
