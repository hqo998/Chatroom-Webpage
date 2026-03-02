import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const bitcount = localFont({
  src: '/fonts/BitcountGridSingle-Regular.ttf',
  variable: '--font-bitcount'
});

export const intern = Inter({subsets: ['latin']});