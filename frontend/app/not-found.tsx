import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="font-display text-8xl font-semibold tracking-tightest text-ink/10">404</div>
      <h1 className="headline mt-4 text-4xl md:text-5xl">Page not found.</h1>
      <p className="mt-3 max-w-md text-ink/60">
        The page you&apos;re looking for might have been moved, deleted, or never existed.
      </p>
      <Link href="/" className="btn-primary btn-md mt-8">
        Back to home
      </Link>
    </section>
  );
}
