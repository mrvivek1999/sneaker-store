import Link from 'next/link';
import { Leaf, Package, RotateCcw, ShieldCheck } from 'lucide-react';

import { FeaturedGrid } from '@/components/FeaturedGrid';
import { Hero } from '@/components/Hero';
import { fetchProducts } from '@/lib/api';

export const revalidate = 60;

const CATEGORIES = [
  {
    slug: 'running',
    label: 'Running',
    copy: 'Daily trainers to race-day carbon.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'basketball',
    label: 'Basketball',
    copy: 'Lock-in support with runway style.',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'lifestyle',
    label: 'Lifestyle',
    copy: 'Everyday silhouettes, elevated.',
    image: 'https://images.unsplash.com/photo-1552066344-2464c1135c32?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'casual',
    label: 'Casual',
    copy: 'Easy, timeless, always on.',
    image: 'https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=900&q=80',
  },
];

const PERKS = [
  { icon: Package, title: 'Free shipping', copy: 'On orders over $100.' },
  { icon: RotateCcw, title: '30-day returns', copy: 'No questions asked.' },
  { icon: ShieldCheck, title: 'Secure checkout', copy: 'Powered by Stripe.' },
  { icon: Leaf, title: 'Carbon-neutral', copy: 'Every delivery, offset.' },
];

export default async function HomePage() {
  const [featured, running] = await Promise.all([
    fetchProducts({ featured: true }),
    fetchProducts({ category: 'running' }),
  ]);

  return (
    <>
      <Hero />

      <FeaturedGrid
        products={featured}
        eyebrow="Featured"
        title="This week's heat."
        description="Hand-picked silhouettes our team is wearing right now."
      />

      {/* Categories */}
      <section className="container-x pb-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
              Shop by sport
            </div>
            <h2 className="headline mt-3 text-4xl text-ink md:text-5xl">
              Find your fit.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${c.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-2xl font-semibold">{c.label}</h3>
                <p className="mt-1 text-sm text-white/80">{c.copy}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/90 transition-transform group-hover:translate-x-1">
                  Shop {c.label.toLowerCase()} &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Perks band */}
      <section className="bg-ink text-white">
        <div className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
          {PERKS.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5">
                <Icon size={18} className="text-flame" />
              </div>
              <div>
                <div className="font-display text-base font-semibold">{title}</div>
                <div className="mt-0.5 text-sm text-white/60">{copy}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FeaturedGrid
        products={running}
        eyebrow="Collection"
        title="Built for runners."
        description="From daily trainers to carbon race-day shoes."
        viewAllHref="/products?category=running"
      />

      {/* Editorial band */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div
            className="aspect-[4/5] rounded-3xl bg-cover bg-center shadow-card"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85)',
            }}
          />
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
              Our story
            </div>
            <h2 className="headline mt-3 text-4xl text-ink md:text-6xl">
              Built by people <br /> who still run.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
              SOLE started with four designers, a prototype garage, and one
              shared frustration: performance shoes you couldn&apos;t be seen in,
              and lifestyle shoes you couldn&apos;t move in. We make both — the
              same shoe.
            </p>
            <div className="mt-9 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
              <div>
                <div className="font-display text-3xl font-semibold">10k+</div>
                <div className="mt-1 text-xs text-ink/60">Customers</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">4.9</div>
                <div className="mt-1 text-xs text-ink/60">Avg rating</div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold">0g</div>
                <div className="mt-1 text-xs text-ink/60">Net carbon</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
