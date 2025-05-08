import React from 'react';
import Icon from './ui/icon';

// export interface HeaderProps {
//   // add props here
// }

export default function Header() {
  return (
    <header className="px-4 md:px-8 xl:px-[100px] pt-4 md:pt-6 max-w-[375px] md:max-w-[768px] xl:max-w-[1440px] mx-auto">
      <div className="flex gap-4 items-center ">
        <Icon name="icon-logo" className="w-8 md:w-10 h-8 md:h-10" />
        <p className="text-lg font-semibold md:text-[22px]">VocabBuilder</p>
      </div>
    </header>
  );
}
