import React from 'react';
import Icon from './ui/icon';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type MobileMenuProps = {
  isOpen: boolean;
  name: string | null;
  onClose: () => void;
  logout: () => void;
};

export default function MobileMenu({
  isOpen,
  name,
  onClose,
  logout,
}: MobileMenuProps) {
  const pathname = usePathname();

  const links = [
    { href: '/dictionary', label: 'Dictionary' },
    { href: '/recommend', label: 'Recommend' },
    { href: '/training', label: 'Training' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0  bg-black-20 z-10" />
      <div
        className={clsx(
          'absolute top-0 right-0 z-50 h-screen min-h-[812px] bg-green-dark p-4 shadow-lg transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          'w-1/2 md:w-1/3 overflow-hidden overflow-y-auto'
        )}
      >
        <div className="flex gap-2 items-center md:gap-4 mb-[166px]">
          <p className="font-medium text-white mr-2 md:mr-4 md:text-xl">
            {name}
          </p>
          <div
            className="rounded-[50px] w-[36px] h-[36px] md:w-[48px] md:h-[48px]
            mr-2 md:mr-7 bg-white
            flex justify-center items-center"
          >
            <Icon
              name="icon-user"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]
              stroke-green-dark fill-green-dark"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] p-1 absolute top-4 right-4 cursor-pointer"
        >
          <Icon
            name="icon-close"
            className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] stroke-white"
          />
        </button>
        <ul className="flex flex-col gap-[28px] text-sm font-medium text-white mb-[28px]">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  pathname === link.href &&
                    'bg-white text-black py-3 px-5 rounded-[15px]'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={logout}
          className="text-sm font-medium text-white flex justify-between items-center gap-[6px]
            cursor-pointer "
        >
          Log out{' '}
          <Icon
            name="icon-arrow-right"
            className=" w-[16px] h-[16px] fill-transparent stroke-white"
          />
        </button>
        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] w-[363px] h-[318px]">
          <Image
            src="/images/main-mob.png"
            alt="VocabBuilder"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
