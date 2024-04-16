import { Metadata, Viewport } from 'next';
import { PropsWithChildren } from 'react';

import '@/app/global.css';

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: 'D3.js',
  description: 'Visualizing data with D3.js',
  authors: { url: 'https://github.com/8dong', name: '8dong' }
};

interface LayoutProps {}

export default function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
