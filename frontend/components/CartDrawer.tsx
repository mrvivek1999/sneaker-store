'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';

import { useCart } from '@/lib/cart';

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQty, removeItem, getTotal } = useCart();
  const total = getTotal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-lift transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/5 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2 className="font-display text-lg font-semibold">
              Your bag
              <span className="ml-2 text-sm font-normal text-ink/50">
                ({items.length} item{items.length === 1 ? '' : 's'})
              </span>
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="h-9 w-9 rounded-full hover:bg-ink/5"
            aria-label="Close cart"
          >
            <X className="mx-auto" size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
              <ShoppingBag size={28} className="text-ink/30" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Your bag is empty</h3>
              <p className="mt-1 text-sm text-ink/60">
                Nothing here yet — go pick up something you love.
              </p>
            </div>
            <Link
              onClick={closeCart}
              href="/products"
              className="btn-primary btn-md mt-2"
            >
              Shop sneakers
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/5 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.size}`}
                  className="flex gap-4 px-6 py-5"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-semibold text-ink">
                          {item.name}
                        </h3>
                        <div className="mt-0.5 text-xs text-ink/50">
                          Size {item.size}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-ink/40 hover:text-flame"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/10">
                        <button
                          onClick={() =>
                            updateQty(item.slug, item.size, item.quantity - 1)
                          }
                          className="h-8 w-8 text-ink/70 hover:bg-cream hover:text-ink disabled:opacity-30"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} className="mx-auto" />
                        </button>
                        <span className="w-7 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.slug, item.size, item.quantity + 1)
                          }
                          className="h-8 w-8 text-ink/70 hover:bg-cream hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} className="mx-auto" />
                        </button>
                      </div>
                      <div className="font-display text-base font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink/5 bg-cream/50 px-6 py-5">
              <div className="mb-1 flex items-center justify-between text-sm text-ink/60">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mb-4 flex items-center justify-between text-sm text-ink/60">
                <span>Shipping</span>
                <span>{total >= 100 ? 'Free' : 'Calculated at checkout'}</span>
              </div>
              <div className="mb-5 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-sm font-medium">Total</span>
                <span className="font-display text-2xl font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-accent btn-lg w-full"
              >
                Checkout
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full text-xs text-ink/50 hover:text-ink"
              >
                or continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
