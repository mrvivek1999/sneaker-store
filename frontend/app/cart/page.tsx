'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { items, updateQty, removeItem, getTotal } = useCart();
  const subtotal = getTotal();
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  return (
    <section className="container-x py-14">
      <h1 className="headline mb-10 text-5xl md:text-6xl">Your bag.</h1>

      {items.length === 0 ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-ink/10 bg-cream text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <ShoppingBag size={28} className="text-ink/30" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold">
            Your bag is empty.
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink/60">
            Looks like you haven&apos;t added anything yet. Our featured drops
            are a good place to start.
          </p>
          <Link href="/products" className="btn-primary btn-md mt-6">
            Shop sneakers
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <ul className="divide-y divide-ink/5 border-y border-ink/5">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.size}`}
                className="flex gap-5 py-6"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-cream md:h-36 md:w-36">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="144px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-display text-lg font-semibold hover:text-flame"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-1 text-xs text-ink/50">
                        Size {item.size}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug, item.size)}
                      className="inline-flex items-center gap-1 text-xs text-ink/50 hover:text-flame"
                      aria-label="Remove"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/10">
                      <button
                        onClick={() =>
                          updateQty(item.slug, item.size, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="h-9 w-9 text-ink/70 hover:bg-cream disabled:opacity-30"
                        aria-label="Decrease"
                      >
                        <Minus size={14} className="mx-auto" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.slug, item.size, item.quantity + 1)
                        }
                        className="h-9 w-9 text-ink/70 hover:bg-cream"
                        aria-label="Increase"
                      >
                        <Plus size={14} className="mx-auto" />
                      </button>
                    </div>
                    <div className="font-display text-xl font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-ink/5 bg-cream p-7">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Subtotal</dt>
                <dd className="font-medium tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Shipping</dt>
                <dd className="font-medium tabular-nums">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Taxes</dt>
                <dd className="font-medium text-ink/50">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-5">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-3xl font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>
            <Link href="/checkout" className="btn-accent btn-lg mt-6 w-full">
              Secure checkout
            </Link>
            <Link
              href="/products"
              className="mt-3 block text-center text-xs text-ink/50 hover:text-ink"
            >
              or continue shopping
            </Link>
            <div className="mt-6 border-t border-ink/10 pt-5 text-xs text-ink/50">
              Secure checkout powered by Stripe. 30-day free returns on all
              unworn pairs.
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
