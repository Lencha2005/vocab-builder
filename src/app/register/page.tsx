import { Metadata } from 'next';
import Register from './register';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return <Register />;
}
