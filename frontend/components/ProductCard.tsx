'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';

import { Badge } from './ui/Badge';
import { Stars } from './ui/Stars';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image_url,
      size: 10,
      quantity: 1,
    });
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/10 hover:shadow-lift"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-sand to-cream">
        {product.discount_percent > 0 && (
          <Badge
            tone="flame"
            className="absolute left-3 top-3 z-10"
          >
            -{product.discount_percent}%
          </Badge>
        )}
        {product.is_featured && product.discount_percent === 0 && (
          <Badge tone="ink" className="absolute left-3 top-3 z-10">
            Featured
          </Badge>
        )}

        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={priority}
          unoptimized
        />

        {/* Quick add — slides up on hover */}
        <button
          onClick={handleQuickAdd}
          className="absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-flame"
          aria-label={`Quick add ${product.name}`}
        >
          <Plus size={16} />
          Quick add
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ink/40">
            {product.brand}
          </span>
          <Stars rating={parseFloat(product.rating)} size={12} />
        </div>
        <h3 className="line-clamp-1 font-display text-base font-semibold text-ink">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-display text-lg font-semibold text-ink">
            ${parseFloat(product.price).toFixed(0)}
          </span>
          {product.compare_at_price && (
            <span className="text-sm text-ink/40 line-through">
              ${parseFloat(product.compare_at_price).toFixed(0)}
            </span>
          )}
          <span className="ml-auto text-xs text-ink/40">
            ({product.review_count.toLocaleString()})
          </span>
        </div>
      </div>
    </Link>
  );
}
