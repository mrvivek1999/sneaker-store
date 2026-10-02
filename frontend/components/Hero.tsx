import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[520px] w-[520px] rounded-full bg-flame/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-ink/5 blur-3xl"
      />

      <div className="container-x relative grid gap-10 pb-20 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-24">
        {/* Copy */}
        <div className="lg:col-span-6 lg:pr-6">
          <div className="chip animate-fade-in">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-flame" />
            New drop · Fall collection 2026
          </div>

          <h1 className="headline mt-6 text-[52px] text-ink sm:text-[68px] lg:text-[86px] animate-fade-up">
            Step into
            <br />
            the <span className="italic text-flame">future.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70 animate-fade-up [animation-delay:120ms]">
            Performance running, courtside heat, and everyday classics —
            engineered by people who still lace up every morning.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:220ms]">
            <Link href="/products" className="btn-accent btn-lg group">
              Shop now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/products?featured=true" className="btn-outline btn-lg">
              Browse collections
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 animate-fade-up [animation-delay:320ms]">
            <div className="flex -space-x-2">
              {[
                '1544005313-94ddf0286df2',
                '1472099645785-5658abf4ff4e',
                '1438761681033-6461ffad8d80',
                '1534528741775-53994a69daeb',
              ].map((id) => (
                <div
                  key={id}
                  className="h-9 w-9 overflow-hidden rounded-full border-2 border-cream bg-ink/10"
                >
                  <Image
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=120&q=80`}
                    alt=""
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-flame text-flame" />
                ))}
                <span className="ml-1 text-sm font-semibold text-ink">4.9</span>
              </div>
              <div className="text-xs text-ink/60">
                Trusted by <span className="font-semibold text-ink">10,000+</span> customers
              </div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {/* Ring */}
            <div className="absolute inset-0 rounded-full border border-ink/10" />
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white to-sand shadow-card" />

            {/* Floating product */}
            <div className="absolute inset-0 animate-float-slow">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=85"
                alt="Featured sneaker"
                fill
                className="object-contain p-8 drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]"
                priority
                unoptimized
              />
            </div>

            {/* Floating stat card bottom-left */}
            <div className="absolute -bottom-4 left-0 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift animate-fade-up [animation-delay:400ms]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flame/10 text-flame">
                <ArrowRight size={16} />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                  Free shipping
                </div>
                <div className="text-sm font-semibold">On orders over $100</div>
              </div>
            </div>

            {/* Floating badge top-right */}
            <div className="absolute -right-2 top-6 rotate-6 rounded-2xl bg-ink px-4 py-3 text-white shadow-lift animate-fade-up [animation-delay:500ms]">
              <div className="text-[10px] uppercase tracking-widest text-white/60">
                Best seller
              </div>
              <div className="font-display text-lg font-semibold">Aero Pulse X3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="border-t border-ink/5 bg-ink text-white">
        <div className="container-x flex items-center gap-10 overflow-hidden py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
          <span>Free shipping &gt; $100</span>
          <span className="h-1 w-1 rounded-full bg-flame" />
          <span>30-day returns</span>
          <span className="h-1 w-1 rounded-full bg-flame" />
          <span>Carbon-neutral delivery</span>
          <span className="h-1 w-1 rounded-full bg-flame" />
          <span>Members get 10% off</span>
          <span className="h-1 w-1 rounded-full bg-flame" />
          <span className="hidden md:inline">New drops every Thursday</span>
        </div>
      </div>
    </section>
  );
}
