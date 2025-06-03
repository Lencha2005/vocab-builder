import './globals.css';

import { Metadata } from 'next';
import { fixelDisplay } from '@/fonts/fonts';
import { Toaster } from 'react-hot-toast';

import SessionWrapper from '../components/wrappers/session-wrapper';
import ClientProvider from '../components/wrappers/client-provider';
import Header from '../components/layout/header';
import GlobalLoader from '@/components/ui/global-loader';

export const metadata: Metadata = {
  title: {
    template: '%s | Vocab Builder',
    default: 'VocabBuilder',
  },
  description:
    'A smart English-Ukrainian dictionary with progress tracking and personalized learning.',
  metadataBase: new URL('https://vocab-builder-green.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fixelDisplay.variable} antialiased`}>
        <SessionWrapper>
          <ClientProvider>
            <Header />
            <GlobalLoader />
            <main>{children}</main>
            <Toaster position="top-center" />
          </ClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
