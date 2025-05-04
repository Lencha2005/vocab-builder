import React from 'react';
import Icon from './ui/icon';

// export interface HeaderProps {
//   // add props here
// }

export default function Header() {
  return (
    <header className="bg-red-500">
      <div className="flex gap-4 items-center bg-red-500">
        <Icon name="icon-logo" size={36} />
        <p className="text-lg font-semibold">VocabBuilder</p>
      </div>
    </header>
  );
}
