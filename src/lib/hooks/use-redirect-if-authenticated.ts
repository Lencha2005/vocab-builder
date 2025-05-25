'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useRedirectIfAuthenticated(redirectTo = '/dictionary') {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      router.replace(redirectTo);
    }
  }, [status, session, router, redirectTo]);

  const isLoadingOrRedirecting =
    status === 'loading' || status === 'authenticated';

  return { isLoadingOrRedirecting };
}
