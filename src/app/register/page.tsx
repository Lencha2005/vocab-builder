// 'use client';

import Link from 'next/link';
import React from 'react';
// import RegisterForm from '../components/register-form';

// type Props = {};

export default function RegisterPage() {
  return (
    <>
      {/* <RegisterForm /> */}
      <Link href="/login">Login</Link>
    </>
  );
}
