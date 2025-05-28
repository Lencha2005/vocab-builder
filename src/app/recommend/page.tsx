import { Suspense } from 'react';
import Recommend from './recommend';
import Loader from '@/components/ui/loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Recommend />
    </Suspense>
  );
}
