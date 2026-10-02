'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ChevronDown,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  Truck,
} from 'lucide-react';

import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';

import { Badge } from './ui/Badge';
import { Stars } from './ui/Stars';

const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
const COLORS = [
  { name: 'Ink', hex: '#0a0a0a' },
  { name: 'Cream', hex: '#faf7f2' },
  { name: 'Flame', hex: '#ff5a1f' },
  { name: 'Fog', hex: '#9ca3af' },
];

const FEATURES = [
  'Carbon-infused midsole for responsive push-off',
  'Engineered knit upper breathes under heat',
  'Reinforced heel counter for stability',
  'Recycled rubber outsole, 60% lower CO₂',
];

const ACCORDIONS = [
  {
    title: 'Shipping & delivery',
    icon: Truck,
    body: 'Free standard shipping on orders over $100 (3–5 business days). Express 2-day shipping $14. International delivery available at checkout.',
  },
  {
    title: 'Returns & exchanges',
    icon: RotateCcw,
    body: '30-day free returns on unworn pairs. Try them on inside, keep the box. We cover the return label.',
  },
  {
    title: 'Materials & care',
    icon: ShieldCheck,
    body: 'Upper: recycled polyester knit. Midsole: TPE foam. Outsole: 30% recycled rubber. Wipe with damp cloth; air dry.',
  },
];

export function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const price = parseFloat(product.price);
  const comparePrice = product.compare_at_price
    ? parseFloat(product.compare_at_price)
    : null;

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image_url];

  const [activeImage, setActiveImage] = useState(gallery[0] || product.image_url);
  const [size, setSize] = useState<number | null>(null);
  const [color, setColor] = useState(COLORS[0].name);
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<number | null>(0);
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (size === null) {
      setError('Please select a size.');
      return;
    }
    setError('');
    addItem({
      slug: product.slug,
      name: product.name,
      price,
      image: product.image_url,
      size,
      quantity: qty,
    });
  };

  return (
    <section className="container-x py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-sand to-cream">
            {product.discount_percent > 0 && (
              <Badge tone="flame" className="absolute left-5 top-5 z-10">
                -{product.discount_percent}% off
              </Badge>
            )}
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-6 md:p-10"
              priority
              unoptimized
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(src)}
                  className={`relative aspect-square overflow-hidden rounded-xl border bg-cream transition-all ${
                    activeImage === src
                      ? 'border-ink shadow-card'
                      : 'border-transparent hover:border-ink/20'
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:pl-4">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
            {product.brand}
          </div>
          <h1 className="headline mt-2 text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <Stars
              rating={parseFloat(product.rating)}
              size={16}
              showNumber
              reviewCount={product.review_count}
            />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">
              ${price.toFixed(2)}
            </span>
            {comparePrice && (
              <>
                <span className="text-lg text-ink/40 line-through">
                  ${comparePrice.toFixed(2)}
                </span>
                <Badge tone="flame">Save ${(comparePrice - price).toFixed(0)}</Badge>
              </>
            )}
          </div>

          <p className="mt-6 max-w-prose leading-relaxed text-ink/70">
            {product.description}
          </p>

          {/* Color */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold">Color</span>
              <span className="text-ink/60">{color}</span>
            </div>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    color === c.name
                      ? 'border-ink scale-105'
                      : 'border-ink/10 hover:border-ink/30'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold">Size (US)</span>
              <button className="text-xs text-ink/60 underline-offset-4 hover:underline">
                Size guide
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setError('');
                  }}
                  className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${
                    size === s
                      ? 'border-ink bg-ink text-white'
                      : 'border-ink/10 text-ink/80 hover:border-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && (
              <div className="mt-2 text-xs font-medium text-flame">{error}</div>
            )}
          </div>

          {/* Qty + Add */}
          <div className="mt-7 flex items-center gap-3">
            <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/10">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-12 w-12 text-ink/70 hover:bg-cream"
                aria-label="Decrease"
              >
                <Minus size={16} className="mx-auto" />
              </button>
              <span className="w-10 text-center font-semibold tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-12 w-12 text-ink/70 hover:bg-cream"
                aria-label="Increase"
              >
                <Plus size={16} className="mx-auto" />
              </button>
            </div>
            <button onClick={handleAdd} className="btn-accent btn-lg flex-1">
              Add to bag · ${(price * qty).toFixed(2)}
            </button>
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:border-flame hover:text-flame"
              aria-label="Save"
            >
              <Heart size={18} />
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/60">
            <div className="inline-flex items-center gap-1.5">
              <Truck size={14} /> Free shipping over $100
            </div>
            <div className="inline-flex items-center gap-1.5">
              <RotateCcw size={14} /> 30-day returns
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Package size={14} /> In stock
            </div>
          </div>

          {/* Feature list */}
          <ul className="mt-8 space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-ink/80">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-flame" />
                {f}
              </li>
            ))}
          </ul>

          {/* Accordions */}
          <div className="mt-8 divide-y divide-ink/5 border-y border-ink/5">
            {ACCORDIONS.map((a, i) => {
              const Icon = a.icon;
              const open = openAcc === i;
              return (
                <div key={a.title}>
                  <button
                    onClick={() => setOpenAcc(open ? null : i)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="inline-flex items-center gap-3 text-sm font-semibold">
                      <Icon size={16} className="text-ink/60" />
                      {a.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="pr-8 text-sm leading-relaxed text-ink/60">
                        {a.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
