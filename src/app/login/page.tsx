// 'use client';

import Link from 'next/link';
import React from 'react';
import AuthLayout from '../components/auth-layout';

// type Props = {};

export default function LoginPage() {
  return (
    <>
      <AuthLayout>
        <Link href="/register">Register</Link>
      </AuthLayout>
    </>
  );
}
