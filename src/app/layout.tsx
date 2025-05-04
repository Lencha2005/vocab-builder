import { fixelDisplay } from '@/fonts/fonts';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fixelDisplay.variable} antialiased`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
