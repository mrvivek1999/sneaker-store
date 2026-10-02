'use client';

import Link from 'next/link';
import { Check, Package } from 'lucide-react';
import { useEffect } from 'react';

import { useCart } from '@/lib/cart';

export default function SuccessPage() {
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="container-x py-20 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
          <Check size={40} className="relative text-emerald-500" strokeWidth={3} />
        </div>

        <div className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-flame">
          Order confirmed
        </div>
        <h1 className="headline mt-3 text-4xl md:text-6xl">
          Thanks for your order.
        </h1>
        <p className="mt-5 text-ink/70">
          We&apos;ve emailed you a receipt. Your sneakers will ship within 1–2
          business days — expect tracking in your inbox shortly.
        </p>

        <div className="mx-auto mt-10 flex max-w-sm items-center gap-4 rounded-2xl border border-ink/5 bg-cream p-5 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <Package size={18} className="text-ink/60" />
          </div>
          <div className="text-sm">
            <div className="font-semibold">Estimated delivery</div>
            <div className="text-ink/60">3–5 business days · Free shipping</div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-primary btn-md">
            Continue shopping
          </Link>
          <Link href="/" className="btn-outline btn-md">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
