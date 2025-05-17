'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import AuthLayout from '../components/auth-layout';
import LoginForm from '../components/login-form';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@/redux/auth/selectors';

export default function LoginPage() {
  const router = useRouter();
  const isLogginIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLogginIn) {
      router.replace('/dictionary');
    }
  }, [isLogginIn, router]);

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
          className="flex justify-center font-bold text-black-50 underline underline-offset-
           hover:text-black focus:text-black"
        >
          Register
        </Link>
      </AuthLayout>
    </>
  );
}
