"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLabel, fromPrice } from "@/lib/products";
import { formatPrice } from "@/lib/whatsapp";
import { useCart } from "./cart-context";

export function ProductCard({
  product,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw",
  aspect = "aspect-[4/5]",
  tone = "light",
  priority = false,
}: {
  product: Product;
  sizes?: string;
  aspect?: string;
  tone?: "light" | "dark";
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const [cover, second] = product.photos;
  const dark = tone === "dark";

  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative ${aspect} w-full overflow-hidden rounded-[1.75rem] bg-beige/40`}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
            second ? "group-hover:opacity-0" : ""
          }`}
        />
        {second && (
          <Image
            src={second.src}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="scale-[1.04] object-cover opacity-0 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-espresso shadow-[0_6px_16px_-8px_rgba(27,14,11,0.4)]">
            {product.badge.toUpperCase()}
          </span>
        )}
        <button
          onClick={() => addItem(product)}
          aria-label={`Añadir ${product.name} (${product.sizes[0].label}) al pedido`}
          className="absolute bottom-4 right-4 z-10 flex h-11 items-center gap-1.5 rounded-full bg-espresso px-4 text-[11px] font-semibold tracking-[0.12em] text-ivory shadow-[0_10px_24px_-10px_rgba(27,14,11,0.6)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-dark-chocolate md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Plus size={14} />
          AÑADIR
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className={`text-[11px] font-medium tracking-[0.16em] ${dark ? "text-ivory/45" : "text-espresso/45"}`}>
          {categoryLabel(product.category).toUpperCase()}
        </p>
        <h3 className="mt-1.5">
          <Link
            href={`/catalogo/${product.slug}`}
            className={`font-display text-[1.6rem] font-medium leading-tight after:absolute after:inset-0 after:content-[''] ${
              dark ? "text-ivory" : "text-espresso"
            }`}
          >
            {product.name}
          </Link>
        </h3>
        <p className={`mt-1.5 text-[14px] leading-relaxed ${dark ? "text-ivory/60" : "text-espresso/60"}`}>
          {product.description}
        </p>
        <p className={`mt-3 text-[14px] ${dark ? "text-ivory/80" : "text-espresso/80"}`}>
          desde{" "}
          <span className={`font-display text-xl font-medium tabular-nums ${dark ? "text-ivory" : "text-espresso"}`}>
            {formatPrice(fromPrice(product))}
          </span>
        </p>
      </div>
    </article>
  );
}
