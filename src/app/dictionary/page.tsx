import dynamic from 'next/dynamic';
import Loader from '@/components/ui/loader';

const Dictionary = dynamic(() => import('./dictionary'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Page() {
  return <Dictionary />;
}
