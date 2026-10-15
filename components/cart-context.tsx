"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import type { CartItem, Product } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.qty * item.product.price, 0);

    return {
      items,
      count,
      total,
      isOpen,
      addItem: (product: Product) => {
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item,
            );
          }
          return [...current, { product, qty: 1 }];
        });
        toast(`${product.name} añadido al carrito`, {
          description: "Esto es una demostración — no se ha realizado ningún pedido real.",
        });
      },
      removeItem: (productId: string) => {
        setItems((current) => current.filter((item) => item.product.id !== productId));
      },
      setQty: (productId: string, qty: number) => {
        setItems((current) =>
          qty <= 0
            ? current.filter((item) => item.product.id !== productId)
            : current.map((item) =>
                item.product.id === productId ? { ...item, qty } : item,
              ),
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
