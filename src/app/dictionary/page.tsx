import { Metadata } from 'next';
import { Suspense } from 'react';
import Dictionary from './dictionary';
import Loader from '@/components/ui/loader';

export const metadata: Metadata = {
  title: 'Dictionary',
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Dictionary />
    </Suspense>
  );
}
