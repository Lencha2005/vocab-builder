'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isRegisterPage = pathname === '/register';
  return (
    <div className="pt-3 md:pt-[140px] xl:pt-16 flex flex-col xl:flex-row md:gap-[98px] xl:gap-20 mx-auto">
      <Image
        src="/images/main-mob.png"
        alt="VocabBuilder"
        width={247}
        height={191}
        className="block md:hidden mx-auto mb-2"
      />
      <Image
        src="/images/main-desk.png"
        alt="VocabBuilder"
        width={498}
        height={435}
        className="hidden xl:block mx-auto"
      />
      <ul
        className={`${isRegisterPage ? 'hidden md:flex' : 'flex'} justify-center mb-[42px] mt-2 text-sm font-medium text-black-50`}
      >
        <li>Word</li>
        <li className="before:content-['·'] before:mx-2">Translation</li>
        <li className="before:content-['·'] before:mx-2">Grammar</li>
        <li className="before:content-['·'] before:mx-2">Progress</li>
      </ul>
      <div className="bg-green-50 rounded-t-[25px] md:rounded-[30px] px-4 md:px-16 pt-8 md:py-12 w-full min-h-screen md:min-h-0 max-w-[375px] sm:max-w-[375px] md:max-w-[627px] mx-auto ">
        {children}
      </div>
    </div>
  );
}
