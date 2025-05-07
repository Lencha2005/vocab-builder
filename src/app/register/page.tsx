// 'use client';

import Link from 'next/link';
import React from 'react';
import AuthLayout from '../components/auth-layout';
import RegisterForm from '../components/register-form';

// type Props = {};

export default function RegisterPage() {
  return (
    <>
      <AuthLayout>
        {/* <div className="bg-green-dark"> */}
        <h3 className="text-3xl font-semibold mb-4">Register</h3>
        <p className="">
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
        <RegisterForm />
        <Link href="/login" className="p-4">
          Login
        </Link>
        {/* </div> */}
      </AuthLayout>
    </>
  );
}
