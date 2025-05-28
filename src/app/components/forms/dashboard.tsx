'use client';

import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import Icon from '../ui/icon';
import CustomSelect from '../ui/custom-select';

type DashboardProps = {
  onAddClick?: () => void;
  onResetFilters?: () => void;
  category: string;
  isIrregular: boolean | null;
  onSelect: (value: string) => void;
  onIrregularChange: (value: boolean) => void;
  searchTerm: string;
  onSearch: (value: string) => void;
  statistics?: number;
  isDictionaryPage?: boolean;
};

export default function Dashboard({
  onAddClick,
  onResetFilters,
  category,
  isIrregular,
  onSelect,
  onIrregularChange,
  searchTerm,
  onSearch,
  statistics,
  isDictionaryPage = true,
}: DashboardProps) {
  const handleSearch = useDebouncedCallback((term: string) => {
    onSearch(term.trim());
  }, 300);

  return (
    <div className="flex flex-col gap-10 md:gap-7 xl:flex-row xl:justify-between mb-8 md:mb-7">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={e => {
              handleSearch(e.target.value);
            }}
            placeholder="Find the word"
            className="w-full md:w-[274px] py-3 px-6 font-medium rounded-[15px] border border-black-10
             placeholder-black hover:border-green-dark focus:border-green-dark outline-hidden"
          />

          <Icon
            name="icon-search"
            className="absolute top-[14px] right-6 w-[20px] h-[20px] fill-transparent stroke-black"
          />
        </div>
        <div className="flex gap-3 items-start">
          <CustomSelect
            selected={category}
            onSelect={onSelect}
            isIrregular={isIrregular}
            onIrregularChange={onIrregularChange}
          />
          <button onClick={onResetFilters} className="p-4 cursor-pointer ">
            <Icon
              name="icon-spinner11"
              className="w-4 h-4 fill-black hover:fill-green-dark focus:fill-green-dark"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <p className="text-sm md:text-base font-medium text-black-50 flex items-center">
          To study:
          <span className="ml-2 text-xl text-black">{statistics}</span>
        </p>
        <div className="flex gap-4">
          {isDictionaryPage && (
            <button
              type="button"
              className="font-medium flex items-center gap-2 cursor-pointer"
              onClick={onAddClick}
            >
              Add word
              <Icon
                name="icon-plus"
                className="w-[20px] h-[20px] stroke-green-dark"
              />
            </button>
          )}
          <Link
            href="/training"
            className="font-medium flex items-center gap-2"
          >
            Train oneself{' '}
            <Icon
              name="icon-switch-horizontal"
              className="w-[20px] h-[20px] stroke-green-dark"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
