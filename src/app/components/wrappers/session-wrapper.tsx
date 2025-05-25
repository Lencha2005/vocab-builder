'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import authInstance from '@/lib/axios/authInstance';

function TokenSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      authInstance.defaults.headers.common.Authorization = `Bearer ${session.user.token}`;
    } else {
      delete authInstance.defaults.headers.common.Authorization;
    }
  }, [session]);

  return null;
}

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TokenSync />
      {children}
    </SessionProvider>
  );
}
