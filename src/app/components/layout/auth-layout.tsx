'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isRegisterPage = pathname === '/register';
  return (
    <div
      className="relative max-w-[375px] md:max-w-[768px] xl:max-w-[1440px]
      md:min-h-screen xl:min-h-0
        pt-3 md:pt-[140px] md:px-[70px] xl:px-[100px] md:pb-[104px] xl:pt-16 xl:pb-20
        flex flex-col xl:flex-row xl:gap-20 mx-auto"
    >
      <div
        className="order-1 bg-green-50 rounded-t-[25px] md:rounded-[30px]
        px-4 md:px-16 pt-8 md:py-12 w-full min-h-[70vh] md:min-h-0 xl:max-w-[627px] mx-auto"
      >
        {children}
      </div>
      <div className="md:order-2 xl:order-1 flex flex-col w-full xl:w-1/2">
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
          className={`${isRegisterPage ? 'hidden md:flex' : 'flex'} justify-center
          md:absolute md:bottom-[106px] md:left-1/2 md:translate-x-[-50%]
          xl:static xl:left-auto xl:translate-x-0
          mb-[42px] mt-2 md:m-0 text-sm font-medium text-black-80 md:order-1`}
        >
          <li>Word</li>
          <li className="before:content-['·'] before:mx-2">Translation</li>
          <li className="before:content-['·'] before:mx-2">Grammar</li>
          <li className="before:content-['·'] before:mx-2">Progress</li>
        </ul>
      </div>
      <div
        className="fixed bottom-0 right-0 bg-[url(/images/bg.svg)] bg-no-repeat bg-contain
      hidden md:block md:w-[525px] md:h-[437px] xl:w-[564px] xl:h-[466px] pointer-events-none"
      />
    </div>
  );
}
