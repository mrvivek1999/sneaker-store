'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useState } from 'react';

import { createCheckoutSession } from '@/lib/api';
import { useCart } from '@/lib/cart';

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Japan'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal } = useCart();
  const subtotal = getTotal();
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    email: '',
    full_name: '',
    address: '',
    city: '',
    country: 'United States',
    postal_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        customer: form,
      });
      if (url) {
        window.location.href = url;
      } else {
        router.push('/checkout/success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="container-x py-20 text-center">
        <h1 className="headline text-4xl md:text-5xl">Nothing to check out.</h1>
        <p className="mt-3 text-ink/60">Add a pair of sneakers to your bag first.</p>
        <Link href="/products" className="btn-primary btn-md mt-6">
          Shop sneakers
        </Link>
      </section>
    );
  }

  return (
    <section className="container-x py-10 lg:py-14">
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
          Checkout
        </div>
        <h1 className="headline mt-3 text-4xl md:text-5xl">Almost yours.</h1>
      </div>

      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_420px]">
        {/* Form */}
        <div className="space-y-10">
          <Fieldset title="Contact">
            <Field label="Email" required>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="you@email.com"
                className={inputCls}
              />
            </Field>
          </Fieldset>

          <Fieldset title="Shipping address">
            <Field label="Full name" required>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={update('full_name')}
                placeholder="Jane Doe"
                className={inputCls}
              />
            </Field>
            <Field label="Street address" required>
              <input
                type="text"
                required
                value={form.address}
                onChange={update('address')}
                placeholder="123 Market Street"
                className={inputCls}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City" required>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={update('city')}
                  placeholder="San Francisco"
                  className={inputCls}
                />
              </Field>
              <Field label="Postal code" required>
                <input
                  type="text"
                  required
                  value={form.postal_code}
                  onChange={update('postal_code')}
                  placeholder="94107"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Country" required>
              <select
                required
                value={form.country}
                onChange={update('country')}
                className={inputCls}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </Fieldset>

          <Fieldset title="Payment">
            <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-cream p-5">
              <Lock size={18} className="mt-0.5 shrink-0 text-ink/60" />
              <div className="text-sm text-ink/70">
                You&apos;ll be redirected to Stripe&apos;s secure checkout to complete
                payment. We never store card details on our servers.
              </div>
            </div>
          </Fieldset>

          {error && (
            <div className="rounded-2xl border border-flame/40 bg-flame/5 p-4 text-sm text-flame">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-accent btn-lg w-full lg:hidden"
          >
            {loading ? 'Redirecting…' : `Pay $${total.toFixed(2)} with Stripe`}
          </button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border border-ink/5 bg-cream p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <ul className="mt-6 divide-y divide-ink/5">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.size}`}
                className="flex gap-3 py-3 first:pt-0"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                  <span className="absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-[10px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col text-sm">
                  <span className="line-clamp-1 font-medium">{item.name}</span>
                  <span className="text-xs text-ink/50">Size {item.size}</span>
                </div>
                <span className="text-sm font-medium tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Shipping</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-5">
            <span className="text-sm font-medium">Total</span>
            <span className="font-display text-3xl font-semibold">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-accent btn-lg mt-6 hidden w-full lg:inline-flex"
          >
            {loading ? 'Redirecting…' : `Pay $${total.toFixed(2)} with Stripe`}
          </button>
          <div className="mt-4 flex items-center gap-2 text-xs text-ink/50">
            <Lock size={12} />
            256-bit SSL · Stripe secure checkout
          </div>
        </aside>
      </form>
    </section>
  );
}

const inputCls =
  'w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/30 focus:border-ink';

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-4 font-display text-lg font-semibold">{title}</legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink/60">
        {label}
        {required && <span className="text-flame"> *</span>}
      </span>
      {children}
    </label>
  );
}
