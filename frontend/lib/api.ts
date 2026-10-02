import type { Paginated, Product } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Request failed (${res.status}): ${detail || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export interface ProductListParams {
  category?: string;
  featured?: boolean;
  search?: string;
}

export async function fetchProducts(params: ProductListParams = {}): Promise<Product[]> {
  const qs = new URLSearchParams();
  if (params.category) qs.set('category', params.category);
  if (params.featured) qs.set('featured', 'true');
  if (params.search) qs.set('search', params.search);
  const query = qs.toString() ? `?${qs.toString()}` : '';
  try {
    const data = await request<Paginated<Product> | Product[]>(`/api/products/${query}`);
    if (Array.isArray(data)) return data;
    return data.results;
  } catch (err) {
    console.warn('fetchProducts failed, returning empty list:', err);
    return [];
  }
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    return await request<Product>(`/api/products/${slug}/`);
  } catch (err) {
    console.warn('fetchProduct failed:', err);
    return null;
  }
}

export interface CheckoutPayload {
  items: { slug: string; quantity: number }[];
  customer: {
    email: string;
    full_name: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
  };
}

export async function createCheckoutSession(
  payload: CheckoutPayload,
): Promise<{ url: string; order_id: string; demo_mode?: boolean }> {
  return request('/api/orders/create-checkout-session/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
