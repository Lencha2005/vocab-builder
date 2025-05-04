import localFont from 'next/font/local';

export const fixelDisplay = localFont({
  src: [
    { path: './src/fonts/MacPawFixelDisplay-Regular.woff2', weight: '400' },
    { path: './src/fonts/MacPawFixelDisplay-Medium.woff2', weight: '500' },
    { path: './src/fonts/MacPawFixelDisplay-SemiBold.woff2', weight: '600' },
    { path: './src/fonts/MacPawFixelDisplay-Bold.woff2', weight: '700' },
  ],
  variable: '--font-fixel-display',
});
