import { fixelDisplay } from '@/fonts/fonts';
import './globals.css';
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
        <Header />
        <main>
          <ClientProvider>{children}</ClientProvider>
        </main>
      </body>
    </html>
  );
}
