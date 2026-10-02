import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All sneakers', href: '/products' },
      { label: 'Running', href: '/products?category=running' },
      { label: 'Basketball', href: '/products?category=basketball' },
      { label: 'Lifestyle', href: '/products?category=lifestyle' },
      { label: 'Sale', href: '/products?category=casual' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Size guide', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/5 bg-cream">
      <div className="container-x pb-10 pt-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-16">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="font-display text-3xl font-bold tracking-tightest"
            >
              SOLE<span className="text-flame">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              Performance footwear and everyday classics, thoughtfully designed and
              responsibly made. Join 10,000+ runners, hoopers and city walkers.
            </p>
            <form className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-ink/15 bg-white focus-within:border-ink">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ink/40"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="shrink-0 bg-ink px-5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-flame"
              >
                Join
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink/50">
                {col.title}
              </div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink/80 transition-colors hover:text-flame"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 text-ink/50">
            <a href="#" className="hover:text-flame" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-flame" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-flame" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs text-ink/50">
            <span>&copy; {new Date().getFullYear()} SOLE Footwear Co.</span>
            <span className="hidden md:inline">Privacy · Terms</span>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <span className="rounded border border-ink/20 px-2 py-0.5">Visa</span>
              <span className="rounded border border-ink/20 px-2 py-0.5">MC</span>
              <span className="rounded border border-ink/20 px-2 py-0.5">Amex</span>
              <span className="rounded border border-ink/20 px-2 py-0.5">Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
