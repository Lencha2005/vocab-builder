'use client';

import React, { useState } from 'react';
import Icon from './ui/icon';
import CustomSelect from './ui/custom-select';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { selectStatistics } from '@/redux/userWords/selectors';
import Link from 'next/link';

type DashboardProps = {};

export default function Dashboard({}: DashboardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(selectStatistics);
  console.log('statistics: ', statistics);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
  }, 300);

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className="flex flex-col gap-10 md:gap-7 xl:flex-row xl:justify-between mb-8 md:mb-7">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative">
          <input
            type="text"
            name="search"
            onChange={e => {
              handleSearch(e.target.value.trim());
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
        <CustomSelect selected={selectedCategory} onSelect={handleSelect} />
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <p className="text-sm md:text-base font-medium text-black-50 flex items-center">
          To study:
          <span className="ml-2 text-xl text-black">{statistics}</span>
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            className="font-medium flex items-center gap-2 cursor-pointer"
          >
            Add word
            <Icon
              name="icon-plus"
              className="w-[20px] h-[20px] stroke-green-dark"
            />
          </button>
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
