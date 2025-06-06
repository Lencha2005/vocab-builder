'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

import Icon from '../ui/icon';
import MobileMenu from './mobile-menu';

export default function Header() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const user = session?.user;
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const [openMenu, setOpenMenu] = useState(false);

  const links = [
    { href: '/dictionary', label: 'Dictionary' },
    { href: '/recommend', label: 'Recommend' },
    { href: '/training', label: 'Training' },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className={clsx(isAuthPage ? 'bg-white-secondary' : 'bg-white')}>
      <div
        className={clsx(
          'max-w-[375px] md:max-w-[768px] xl:max-w-[1440px]',
          'px-4 md:px-8 xl:px-[100px] mx-auto',
          'flex justify-between items-center',
          isAuthPage ? 'pt-4 md:pt-6' : 'py-4 md:py-5'
        )}
      >
        <div className="flex gap-4 items-center ">
          <Icon name="icon-logo" className="w-8 md:w-10 h-8 md:h-10" />
          <p className="text-lg font-semibold md:text-[22px]">VocabBuilder</p>
        </div>
        {isLoggedIn && user ? (
          <>
            <ul className="hidden xl:flex xl:gap-7 xl:text-sm xL:font-medium ">
              {links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      pathname === link.href &&
                        'bg-green-dark text-white py-3 px-5 rounded-[15px]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <p className="font-medium mr-2 md:mr-4 md:text-xl">{user.name}</p>
              <div
                className="rounded-[50px] w-[36px] h-[36px] md:w-[48px] md:h-[48px]
            mr-2 md:mr-7 bg-green-dark
            flex justify-center items-center"
              >
                <Icon
                  name="icon-user"
                  className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]
              stroke-white-70 fill-white-70"
                />
              </div>
              <button
                type="button"
                onClick={() => setOpenMenu(true)}
                className="cursor-pointer xl:hidden"
              >
                <Icon
                  name="icon-burger1"
                  className="w-[32px] h-[22px] md:w-[40px] md:h-[28px] fill-transparent stroke-black"
                />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="xl:font-medium hidden xl:flex xl:justify-between xl:items-center xl:gap-[6px]
            cursor-pointer"
              >
                Log out{' '}
                <Icon
                  name="icon-arrow-right"
                  className=" xl:w-[16px] xl:h-[16px] fill-transparent stroke-black"
                />
              </button>
            </div>
          </>
        ) : null}
        {openMenu && user && (
          <MobileMenu
            isOpen={openMenu}
            name={user.name}
            onClose={() => setOpenMenu(false)}
            logout={handleLogout}
          />
        )}
      </div>
    </header>
  );
}
