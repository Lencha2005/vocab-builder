import './globals.css';
import { fixelDisplay } from '@/fonts/fonts';
import ClientProvider from './components/сlient-provider';
import Header from './components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fixelDisplay.variable} antialiased`}>
        <ClientProvider>
          <Header />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
