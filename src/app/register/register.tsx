'use client';

import React from 'react';
import Link from 'next/link';
import { useRedirectIfAuthenticated } from '@/lib/hooks/use-redirect-if-authenticated';
import AuthLayout from '../components/layout/auth-layout';
import RegisterForm from '../components/forms/register-form';

export default function Register() {
  const { isLoadingOrRedirecting } = useRedirectIfAuthenticated();

  if (isLoadingOrRedirecting) return null;

  return (
    <>
      <AuthLayout>
        <h3 className="text-3xl md:text-[40px] font-semibold mb-4 md:mb-5">
          Register
        </h3>
        <p className="md:text-xl mb-4 md:mb-8">
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
        <RegisterForm />
        <Link
          href="/login"
          className="flex justify-center font-bold text-black-50 underline underline-offset-2
           hover:text-black focus:text-black"
        >
          Login
        </Link>
      </AuthLayout>
    </>
  );
}
