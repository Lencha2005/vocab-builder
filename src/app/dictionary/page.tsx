import { Suspense } from 'react';
import Dictionary from './dictionary';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dictionary />
    </Suspense>
  );
}
