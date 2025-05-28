'use client';

import React from 'react';
import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'green' | 'white' | 'transparent';
  className: string;
}

export default function Button({
  children,
  disabled,
  variant = 'green',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'w-full text-base text-center font-bold rounded-[30px] md:text-lg transition duration-300 ease-in-out cursor-pointer',
        variant === 'green' &&
          'py-4 bg-green-dark text-white hover:bg-green-light focus:bg-green-light',
        variant === 'white' &&
          'bg-white text-black-default hover:text-green-dark',
        variant === 'transparent' &&
          'bg-transparent text-white border border-white-40 hover:bg-white hover:text-black',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
