import './globals.css';
import { fixelDisplay } from '@/fonts/fonts';
import SessionWrapper from './components/wrappers/session-wrapper';
import ClientProvider from './components/wrappers/client-provider';
import Header from './components/layout/header';

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
            <main>{children}</main>
          </ClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
