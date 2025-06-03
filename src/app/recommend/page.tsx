import { Metadata } from 'next';
import { Suspense } from 'react';
import Recommend from './recommend';
import Loader from '@/components/ui/loader';

export const metadata: Metadata = {
  title: 'Recommend',
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Recommend />
    </Suspense>
  );
}
