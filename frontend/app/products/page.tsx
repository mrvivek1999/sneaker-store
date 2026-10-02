import Link from 'next/link';

import { ProductCard } from '@/components/ProductCard';
import { fetchProducts } from '@/lib/api';

export const revalidate = 60;

const CATEGORIES = [
  { slug: '', label: 'All' },
  { slug: 'running', label: 'Running' },
  { slug: 'basketball', label: 'Basketball' },
  { slug: 'lifestyle', label: 'Lifestyle' },
  { slug: 'casual', label: 'Casual' },
];

interface Props {
  searchParams: { category?: string; featured?: string; search?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const products = await fetchProducts({
    category: searchParams.category,
    featured: searchParams.featured === 'true',
    search: searchParams.search,
  });

  const activeCategory = searchParams.category || '';
  const currentLabel =
    CATEGORIES.find((c) => c.slug === activeCategory)?.label || 'All';

  return (
    <>
      {/* Page header */}
      <section className="border-b border-ink/5 bg-cream">
        <div className="container-x py-14 md:py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
            {searchParams.featured === 'true' ? 'Featured' : 'The shop'}
          </div>
          <h1 className="headline mt-3 text-5xl text-ink md:text-7xl">
            {searchParams.featured === 'true' ? 'Featured drops.' : `${currentLabel} sneakers.`}
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink/60">
            {products.length} silhouettes in stock. Free shipping over $100,
            30-day returns, and real humans on support.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-20 border-b border-ink/5 bg-white/80 backdrop-blur md:top-20">
        <div className="container-x flex items-center gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => {
            const href = c.slug ? `/products?category=${c.slug}` : '/products';
            const active = c.slug === activeCategory;
            return (
              <Link
                key={c.label}
                href={href}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? 'bg-ink text-white'
                    : 'bg-cream text-ink/70 hover:bg-sand hover:text-ink'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
          <div className="ml-auto hidden items-center gap-2 text-xs text-ink/50 md:flex">
            Showing {products.length} items
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-x py-14">
        {products.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-ink/10 bg-cream text-center">
            <div className="font-display text-2xl font-semibold">No products yet.</div>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              Nothing matching this filter right now. Try another category or
              make sure the backend is running + seeded (<code>python seed.py</code>).
            </p>
            <Link href="/products" className="btn-primary btn-md mt-6">
              View all
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
