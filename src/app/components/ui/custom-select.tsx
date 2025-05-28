'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '@/redux/dictionary/selectors';
import { AppDispatch } from '@/redux/store';
import { getCategories } from '@/redux/dictionary/operations';
import clsx from 'clsx';
import Icon from './icon';

interface CustomSelectProps {
  selected: string;
  isIrregular?: boolean | null;
  onIrregularChange?: (value: boolean) => void;
  onSelect: (value: string) => void;
  variant?: 'dashboard' | 'modal';
}

export default function CustomSelect({
  selected,
  onSelect,
  isIrregular = null,
  onIrregularChange,
  variant = 'dashboard',
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

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onIrregularChange?.(e.target.value === 'irregular');
  };

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 justify-start relative',
        variant === 'dashboard' && 'md:flex-row'
      )}
    >
      <div ref={ref} className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'w-full xs:min-w-[220px] xs:max-w-[283px] sm:min-w-[283px] rounded-[15px] border  py-3 px-6 text-left font-medium',
            'flex justify-between items-center gap-2 cursor-pointer',
            variant === 'dashboard'
              ? 'md:min-w-[164px] text-black  bg-white-secondary border-black-10 hover:border-green-dark focus:border-green-dark'
              : 'md:w-fit md:min-w-[204px] text-white  bg-green-dark border-white-70 hover:border-white-true focus:border-white-true'
          )}
        >
          {selected || 'Categories'}
          <Icon
            name="icon-toggle"
            className={clsx(
              'w-5 h-3 transition-transform fill-black stroke-[1.5px] stroke-transparent',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <ul
            className={clsx(
              'absolute top-full left-0 z-20 font-medium px-6 py-3 w-full',
              'flex flex-col gap-2 mt-2 mx-0 rounded-[15px] bg-white-true border border-black-10',
              'shadow-[0_4px_47px_0_rgba(18,20,23,0.08)] z-10 ',
              variant === 'modal' &&
                'max-h-[240px] overflow-y-auto custom-scrollbar md:w-[204px]'
            )}
          >
            {options.map(option => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={clsx(
                  'hover:text-green-dark cursor-pointer',
                  variant === 'dashboard' ? 'text-black' : 'text-black-50'
                )}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selected.toLowerCase() === 'verb' && (
        <fieldset className="flex gap-4">
          <label
            className={clsx(
              'flex items-center gap-2 text-xs',
              variant === 'dashboard' ? 'md:text-sm' : 'md:text-base text-white'
            )}
          >
            <input
              type="radio"
              name="verb"
              value="regular"
              checked={isIrregular === false}
              onChange={handleRadioChange}
              className="peer hidden"
            />
            <span
              className={clsx(
                'h-[16px] w-[16px] rounded-full outline-2 flex items-center justify-center peer-checked:border-3 transition',
                variant === 'dashboard'
                  ? 'outline-black-10 peer-checked:outline-green-dark peer-checked:border-white-secondary peer-checked:bg-green-dark'
                  : 'md:h-[18px] md:w-[18px] outline-white-20 peer-checked:outline-white peer-checked:border-green-dark peer-checked:bg-white'
              )}
            ></span>
            Regular
          </label>
          <label
            className={clsx(
              'flex items-center gap-2 text-xs',
              variant === 'dashboard' ? 'md:text-sm' : 'md:text-base text-white'
            )}
          >
            <input
              type="radio"
              name="verb"
              value="irregular"
              checked={isIrregular === true}
              onChange={handleRadioChange}
              className="peer hidden"
            />
            <span
              className={clsx(
                'h-[16px] w-[16px] rounded-full outline-2 flex items-center justify-center peer-checked:border-3 transition',
                variant === 'dashboard'
                  ? 'outline-black-10 peer-checked:outline-green-dark peer-checked:border-white-secondary peer-checked:bg-green-dark'
                  : 'md:h-[18px] md:w-[18px] outline-white-20 peer-checked:outline-white peer-checked:border-green-dark peer-checked:bg-white'
              )}
            ></span>
            Irregular
          </label>
        </fieldset>
      )}
      {variant === 'modal' && isIrregular === true && (
        <p className="text-[10px] md:text-xs text-white absolute -bottom-6">
          Such data must be entered in the format V1-V2-V3.
        </p>
      )}
    </div>
  );
}
