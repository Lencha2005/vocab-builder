import { Suspense } from 'react';
import Recommend from './recommend';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Recommend />
    </Suspense>
  );
}
