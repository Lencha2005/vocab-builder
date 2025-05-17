'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from './icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '@/redux/dictionary/selectors';
import { AppDispatch } from '@/redux/store';
import { getCategories } from '@/redux/dictionary/operations';

interface CustomSelectProps {
  selected: string;
  isIrregular?: boolean | null;
  onIrregularChange?: (value: boolean) => void;
  onSelect: (value: string) => void;
}

export default function CustomSelect({
  selected,
  onSelect,
  isIrregular = null,
  onIrregularChange,
}: CustomSelectProps) {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log('selected: ', selected);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onIrregularChange?.(e.target.value === 'irregular');
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-start">
      <div ref={ref} className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full md:w-[164px] rounded-[15px] border border-black-10 py-3 px-6 text-left 
          text-black font-medium bg-white-secondary flex justify-between items-center cursor-pointer
          hover:border-green-dark focus:border-green-dark"
        >
          {selected || 'Categories'}
          {/* <div className="py-[6px] px-[3px] w-6 h-6"> */}
          <Icon
            name="icon-toggle"
            className={clsx(
              'w-5 h-3 transition-transform fill-black stroke-[1.5px] stroke-transparent',
              isOpen && 'rotate-180'
            )}
          />
          {/* </div> */}
        </button>

        {isOpen && (
          <ul
            className="absolute top-full left-0 font-medium px-6 py-3 w-full 
          flex flex-col gap-2 mt-2 mx-0 rounded-[15px] bg-white-true border border-black-10 shadow-[0_4px_47px_0_rgba(18,20,23,0.08)] z-10 
          custom-scrollbar"
          >
            {/* md:h-[205px] md:max-h-screen overflow-y-auto */}
            {options.map(option => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className=" hover:text-green-dark cursor-pointer text-black"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selected.toLowerCase() === 'verb' && (
        <fieldset className="flex gap-4">
          <label className="flex items-center gap-2 text-xs ">
            <input
              type="radio"
              name="verb"
              value="regular"
              // checked={isIrregular === false}
              onChange={handleRadioChange}
              className="peer hidden"
            />
            <span
              className="h-[16px] w-[16px] rounded-full outline-2 outline-black-10 
            flex items-center justify-center peer-checked:outline-green-dark peer-checked:border-3 peer-checked:border-white-secondary peer-checked:bg-green-dark transition"
            ></span>
            Regular
          </label>
          <label className="flex items-center gap-2 text-xs ">
            <input
              type="radio"
              name="verb"
              value="irregular"
              // checked={isIrregular === true}
              onChange={handleRadioChange}
              className="peer hidden"
            />
            <span
              className="h-[16px] w-[16px] rounded-full outline-2 outline-black-10 
              flex items-center justify-center peer-checked:outline-green-dark peer-checked:border-3 peer-checked:border-white-secondary peer-checked:bg-green-dark transition"
            ></span>
            Irregular
          </label>
        </fieldset>
      )}
    </div>
  );
}
