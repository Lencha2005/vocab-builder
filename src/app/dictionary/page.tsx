import { Suspense } from 'react';
import Dictionary from './dictionary';
import Loader from '@/components/ui/loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Dictionary />
    </Suspense>
  );
}
