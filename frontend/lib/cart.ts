'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartItem } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: number) => void;
  updateQty: (slug: string, size: number, quantity: number) => void;
  clear: () => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      addItem: (item) => {
        const items = [...get().items];
        const existing = items.find((i) => i.slug === item.slug && i.size === item.size);
        if (existing) {
          existing.quantity += item.quantity;
          set({ items, isOpen: true });
        } else {
          set({ items: [...items, item], isOpen: true });
        }
      },
      removeItem: (slug, size) =>
        set({ items: get().items.filter((i) => !(i.slug === slug && i.size === size)) }),
      updateQty: (slug, size, quantity) =>
        set({
          items: get().items.map((i) =>
            i.slug === slug && i.size === size
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        }),
      clear: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'sole-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
