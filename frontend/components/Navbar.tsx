'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCart } from '@/lib/cart';
import { cn } from '@/lib/cn';

const NAV = [
  { href: '/products', label: 'Shop' },
  { href: '/products?category=running', label: 'Running' },
  { href: '/products?category=basketball', label: 'Basketball' },
  { href: '/products?category=lifestyle', label: 'Lifestyle' },
  { href: '/products?featured=true', label: 'Featured' },
];

export function Navbar() {
  const openCart = useCart((s) => s.openCart);
  const count = useCart((s) => s.getCount());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-ink/5 bg-white/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tightest md:text-[26px]"
          aria-label="SOLE home"
        >
          SOLE<span className="text-flame">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="link-underline text-sm font-medium text-ink/80 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 md:inline-flex"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-flame px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-white p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="font-display text-2xl font-bold">
                SOLE<span className="text-flame">.</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-10 w-10 rounded-full hover:bg-ink/5"
                aria-label="Close menu"
              >
                <X className="mx-auto" size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg font-medium text-ink/80 hover:bg-cream hover:text-ink"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-ink/5 pt-6 text-xs text-muted">
              Free shipping on orders over $100.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
