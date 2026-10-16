"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Minus, Plus, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { OCCASIONS } from "@/lib/products";
import { buildWhatsappOrderLink, formatPrice } from "@/lib/whatsapp";
import { useCart } from "./cart-context";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sizeId, setSizeId] = useState(product.sizes[Math.min(1, product.sizes.length - 1)].id);
  const [qty, setQty] = useState(1);
  const size = product.sizes.find((s) => s.id === sizeId)!;
  const photo = product.photos[photoIndex];

  const directOrder = buildWhatsappOrderLink([
    { key: `${product.slug}:${size.id}`, product, size, qty },
  ]);

  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 pt-8 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-10 md:pb-32 lg:gap-24">
      {/* Gallery */}
      <div className="md:sticky md:top-28 md:self-start">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-beige/40 shadow-[0_30px_60px_-30px_rgba(27,14,11,0.35)]">
          <AnimatePresence initial={false}>
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={photoIndex === 0}
                quality={90}
                sizes="(max-width: 768px) 92vw, 52vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {product.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-ivory/95 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-espresso">
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>
        {product.photos.length > 1 && (
          <div role="tablist" aria-label="Fotos" className="mt-4 flex gap-3">
            {product.photos.map((p, i) => (
              <button
                key={p.src}
                role="tab"
                aria-selected={i === photoIndex}
                aria-label={`Foto ${i + 1}: ${p.alt}`}
                onClick={() => setPhotoIndex(i)}
                className={`relative h-20 w-20 overflow-hidden rounded-2xl transition-[opacity,box-shadow] md:h-24 md:w-24 ${
                  i === photoIndex ? "ring-2 ring-espresso ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="md:pt-6">
        <h1 className="font-display text-[clamp(2.75rem,5.5vw,5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-espresso">
          {product.name}
        </h1>
        <p className="mt-3 font-display text-xl italic text-[#a5635e] md:text-2xl">{product.tagline}</p>
        <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-espresso/75">{product.story}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {product.occasions.map((id) => (
            <li key={id} className="rounded-full bg-beige/50 px-3 py-1 text-[12px] text-espresso/70">
              {OCCASIONS.find((o) => o.id === id)?.label}
            </li>
          ))}
        </ul>

        <fieldset className="mt-10">
          <legend className="text-[12px] font-semibold tracking-[0.16em] text-espresso/55">TAMAÑO</legend>
          <div className={`mt-3 grid gap-2 ${product.sizes.length >= 3 ? "grid-cols-3" : product.sizes.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {product.sizes.map((s) => {
              const checked = s.id === sizeId;
              return (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-2xl border px-3 py-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                    checked ? "border-espresso bg-espresso text-ivory" : "border-espresso/15 text-espresso hover:border-espresso/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={s.id}
                    checked={checked}
                    onChange={() => setSizeId(s.id)}
                    className="sr-only"
                  />
                  <span className="block text-[14px] font-semibold">{s.label}</span>
                  <span className={`block text-[12px] ${checked ? "text-ivory/65" : "text-espresso/50"}`}>{s.serves}</span>
                  <span className={`mt-1.5 block text-[13px] tabular-nums ${checked ? "text-ivory/90" : "text-espresso/75"}`}>
                    {formatPrice(s.price)}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex h-14 items-center gap-1 rounded-full border border-espresso/15 px-2">
            <button
              aria-label="Restar cantidad"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              className="flex h-10 w-10 items-center justify-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5 disabled:opacity-30"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-[15px] font-medium tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button
              aria-label="Sumar cantidad"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={() => addItem(product, size, qty)}
            className="flex h-14 flex-1 items-center justify-between gap-4 rounded-full bg-espresso pl-7 pr-2 text-ivory transition-transform duration-300 hover:-translate-y-0.5 sm:flex-none sm:min-w-[20rem]"
          >
            <span className="whitespace-nowrap text-[12px] font-semibold tracking-[0.12em]">AÑADIR AL PEDIDO</span>
            <span className="hidden rounded-full bg-ivory/10 px-4 py-2.5 font-display text-lg tabular-nums min-[420px]:inline">
              {formatPrice(size.price * qty)}
            </span>
          </button>
        </div>
        <a
          href={directOrder}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[13px] text-espresso/65 underline decoration-espresso/25 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
        >
          O pedila directo por WhatsApp
        </a>

        <div className="mt-10 grid gap-4 rounded-[1.75rem] bg-warm-ivory p-6 sm:grid-cols-2">
          <p className="flex items-start gap-3 text-[14px] leading-snug text-espresso/75">
            <CalendarClock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#a5635e]" />
            {product.leadTime}
          </p>
          <p className="flex items-start gap-3 text-[14px] leading-snug text-espresso/75">
            <Truck size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#a5635e]" />
            Retiro en el obrador o envío refrigerado
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-espresso/10 pt-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium text-espresso">Por dentro</h2>
            <ol className="mt-4 flex flex-col">
              {product.layers.map((layer, i) => (
                <li
                  key={layer}
                  className="flex items-baseline gap-3 border-b border-espresso/10 py-2.5 text-[14px] text-espresso/75 last:border-0"
                >
                  <span className="font-display text-sm italic tabular-nums text-[#a5635e]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {layer}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium text-espresso">Alérgenos</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-espresso/75">
              Contiene: {product.allergens.join(", ").toLowerCase()}.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-espresso/55">
              Elaborado en un obrador donde también se usan frutos secos y gluten. Conservar refrigerado y
              sacar 20 minutos antes de servir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
