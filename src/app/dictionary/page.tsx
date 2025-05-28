import dynamic from 'next/dynamic';

const DictionaryClientWrapper = dynamic(
  () => import('./dictionary-client-wrapper'),
  {
    ssr: false,
  }
);

export default function Page() {
  return <DictionaryClientWrapper />;
}
