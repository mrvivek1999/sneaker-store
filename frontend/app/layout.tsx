import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SOLE — Premium Sneakers, Thoughtfully Made',
  description:
    'Shop performance running, basketball, lifestyle and casual sneakers from the brands people actually wear. Free shipping over $100.',
  openGraph: {
    title: 'SOLE — Premium Sneakers',
    description: 'Performance meets everyday. Shop the latest drops at SOLE.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="bg-white text-ink font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
