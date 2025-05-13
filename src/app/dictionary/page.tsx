import React from 'react';
import Icon from '../components/ui/icon';

type DictionaryPageProps = {};

export default function DictionaryPage({}: DictionaryPageProps) {
  return (
    // <div className="bg-white">
    <div
      className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px]
    pt-8 md:pt-20 pb-12 px-4 md:px-8 xl:px-[100px] mx-auto "
    >
      <div className="relative">
        <input
          type="text"
          // name="find"
          // onChange={() => {}}
          placeholder="Find the word"
          className="w-full py-3 px-6 font-medium rounded-[15px] border border-black-10 placeholder-black"
        />
        <Icon
          name="icon-search"
          className="absolute top-[14px] right-6 w-[20px] h-[20px] fill-transparent stroke-black"
        />
        <select>
          <option></option>
        </select>
      </div>
    </div>
    // </div>
  );
}
