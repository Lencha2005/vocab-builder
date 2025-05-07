import React from 'react';
import Icon from './ui/icon';

// export interface HeaderProps {
//   // add props here
// }

export default function Header() {
  return (
    <header className="px-4 pt-4 md:px-8 md:pt-6 lg:px-[100px]">
      <div className="flex gap-4 items-center ">
        <Icon name="icon-logo" className="w-8 h-8 md:w-10 md:h-10" />
        <p className="text-lg font-semibold md:text-[22px]">VocabBuilder</p>
      </div>
    </header>
  );
}
