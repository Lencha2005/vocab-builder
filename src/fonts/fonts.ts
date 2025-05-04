import localFont from 'next/font/local';

export const fixelDisplay = localFont({
  src: [
    { path: './MacPawFixelDisplay-Regular.woff2', weight: '400' },
    { path: './MacPawFixelDisplay-Medium.woff2', weight: '500' },
    { path: './MacPawFixelDisplay-SemiBold.woff2', weight: '600' },
    { path: './MacPawFixelDisplay-Bold.woff2', weight: '700' },
  ],
  variable: '--font-fixel-display',
});
