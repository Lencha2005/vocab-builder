'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import AuthLayout from '../components/auth-layout';
import RegisterForm from '../components/register-form';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@/redux/auth/selectors';

export default function RegisterPage() {
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
