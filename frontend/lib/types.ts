export type Category = 'running' | 'casual' | 'basketball' | 'lifestyle';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  compare_at_price: string | null;
  category: Category;
  brand: string;
  image_url: string;
  gallery: string[];
  stock: number;
  is_featured: boolean;
  rating: string;
  review_count: number;
  discount_percent: number;
  created_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: number;
  quantity: number;
}
