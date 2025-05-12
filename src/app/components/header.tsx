'use client';

import React, { useState } from 'react';
import Icon from './ui/icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '@/redux/auth/selectors';
import { AppDispatch } from '@/redux/store';
import { logoutUser } from '@/redux/auth/operations';
import { useRouter } from 'next/navigation';
import MobileMenu from './mobile-menu';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log('user: ', user);

  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  return (
    <header
      className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px]
    pt-4 md:pt-6 px-4 md:px-8 xl:px-[100px] mx-auto
    flex justify-between items-center"
    >
      <div className="flex gap-4 items-center ">
        <Icon name="icon-logo" className="w-8 md:w-10 h-8 md:h-10" />
        <p className="text-lg font-semibold md:text-[22px]">VocabBuilder</p>
      </div>
      {isLoggedIn ? (
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
      ) : null}
      {openMenu && (
        <MobileMenu
          isOpen={openMenu}
          name={user.name}
          onClose={() => setOpenMenu(false)}
          logout={handleLogout}
        />
      )}
    </header>
  );
}
