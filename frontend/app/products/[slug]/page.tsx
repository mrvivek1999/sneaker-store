import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductDetailClient } from '@/components/ProductDetailClient';
import { ProductCard } from '@/components/ProductCard';
import { fetchProduct, fetchProducts } from '@/lib/api';

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await fetchProduct(params.slug);
  if (!product) notFound();

  const related = await fetchProducts({ category: product.category });
  const otherRelated = related.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-x pt-6 text-xs text-ink/50">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-ink">Shop</Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="capitalize hover:text-ink"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <ProductDetailClient product={product} />

      {otherRelated.length > 0 && (
        <section className="container-x pb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
                You might also like
              </div>
              <h2 className="headline mt-3 text-3xl md:text-4xl">
                More in {product.category}.
              </h2>
            </div>
            <Link
              href={`/products?category=${product.category}`}
              className="hidden text-sm font-semibold hover:text-flame md:inline"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
