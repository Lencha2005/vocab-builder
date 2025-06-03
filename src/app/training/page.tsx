import { Metadata } from 'next';
import Training from './training';

export const metadata: Metadata = {
  title: 'Training',
};

export default function Page() {
  return <Training />;
}
