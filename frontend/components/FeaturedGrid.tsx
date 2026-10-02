import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { Product } from '@/lib/types';

import { ProductCard } from './ProductCard';

interface FeaturedGridProps {
  products: Product[];
  title?: string;
  eyebrow?: string;
  description?: string;
  viewAllHref?: string;
}

export function FeaturedGrid({
  products,
  title = 'This week\'s heat',
  eyebrow = 'Featured',
  description = 'Hand-picked silhouettes our team is wearing right now.',
  viewAllHref = '/products',
}: FeaturedGridProps) {
  if (products.length === 0) return null;

  return (
    <section className="container-x py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
            {eyebrow}
          </div>
          <h2 className="headline mt-3 text-4xl text-ink md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-ink/60">{description}</p>
        </div>
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-flame"
        >
          View all
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
