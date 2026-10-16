"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { CartItem, Product, Size } from "@/lib/types";
import { getProduct } from "@/lib/products";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  addItem: (product: Product, size?: Size, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cake-cart-v2";

type StoredItem = { slug: string; sizeId: string; qty: number };

function hydrate(stored: StoredItem[]): CartItem[] {
  return stored.flatMap((entry) => {
    const product = getProduct(entry.slug);
    const size = product?.sizes.find((s) => s.id === entry.sizeId);
    if (!product || !size || entry.qty < 1) return [];
    return [{ key: `${product.slug}:${size.id}`, product, size, qty: entry.qty }];
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // The cart survives navigation between the landing, catalog and product pages,
  // and reloads. Stored as slugs so price/photo changes always come from the catalog.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (raw) setItems(hydrate(JSON.parse(raw)));
    } catch {
      // Storage unavailable (private mode); the cart simply starts empty.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      const stored: StoredItem[] = items.map((i) => ({
        slug: i.product.slug,
        sizeId: i.size.id,
        qty: i.qty,
      }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Ignore write failures.
    }
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.qty * item.size.price, 0);

    return {
      items,
      count,
      total,
      isOpen,
      addItem: (product, size = product.sizes[0], qty = 1) => {
        const key = `${product.slug}:${size.id}`;
        setItems((current) => {
          const existing = current.find((item) => item.key === key);
          if (existing) {
            return current.map((item) =>
              item.key === key ? { ...item, qty: item.qty + qty } : item,
            );
          }
          return [...current, { key, product, size, qty }];
        });
        toast(`${product.name} · ${size.label} en tu pedido`, {
          description: "Cuando quieras, lo enviamos por WhatsApp para confirmarlo.",
          action: { label: "Ver pedido", onClick: () => setIsOpen(true) },
        });
      },
      removeItem: (key) => {
        setItems((current) => current.filter((item) => item.key !== key));
      },
      setQty: (key, qty) => {
        setItems((current) =>
          qty <= 0
            ? current.filter((item) => item.key !== key)
            : current.map((item) => (item.key === key ? { ...item, qty } : item)),
        );
      },
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
