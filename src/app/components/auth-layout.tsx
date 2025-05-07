import Image from 'next/image';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="pt-3">
      <Image
        src="/images/main-mob.png"
        alt="VocabBuilder"
        width={247}
        height={191}
        className="mx-auto"
      />
      <div className="bg-green-50 rounded-t-[25px] px-4 pt-8 w-full min-h-screen max-w-[375px] sm:max-w-[375px] mx-auto md:rounded-[30px]">
        {children}
      </div>
    </div>
  );
}
