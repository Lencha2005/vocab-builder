'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Icon from './icon';

const options = [
  'Verb',
  'Noun',
  'Adjective',
  'Adverb',
  'Pronoun',
  'Preposition',
];

interface CustomSelectProps {
  selected: string;
  onSelect: (value: string) => void;
}

export default function CustomSelect({
  selected,
  onSelect,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-[15px] border border-black-10 py-4 px-[18px] text-left
          text-black bg-white flex justify-between items-center hover:border-green-dark"
      >
        {selected}
        <Icon
          name="icon-chevron-down"
          className={clsx(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 w-full rounded-[15px] bg-white border border-black-10 shadow-md z-10 overflow-hidden">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-[18px] py-3 hover:bg-green-light cursor-pointer text-black"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
