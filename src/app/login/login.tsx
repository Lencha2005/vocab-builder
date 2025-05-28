'use client';

import React from 'react';
import Link from 'next/link';
import { useRedirectIfAuthenticated } from '@/lib/hooks/use-redirect-if-authenticated';
import AuthLayout from '../components/layout/auth-layout';
import LoginForm from '../components/forms/login-form';

export default function Login() {
  const { isLoadingOrRedirecting } = useRedirectIfAuthenticated();

  if (isLoadingOrRedirecting) return null;

  return (
    <>
      <AuthLayout>
        <h3 className="text-3xl md:text-[40px] font-semibold mb-4 md:mb-5">
          Login
        </h3>
        <p className="md:text-xl mb-4 md:mb-8">
          Please enter your login details to continue using our service:
        </p>
        <LoginForm />
        <Link
          href="/register"
          className="flex justify-center font-bold text-black-50 underline underline-offset-2
           hover:text-black focus:text-black"
        >
          Register
        </Link>
      </AuthLayout>
    </>
  );
}
