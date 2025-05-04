import './globals.css';
import { fixelDisplay } from '../fonts/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fixelDisplay.variable}`}>{children}</body>
    </html>
  );
}
