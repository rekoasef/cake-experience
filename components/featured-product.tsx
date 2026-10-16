"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Gift, Leaf } from "lucide-react";
import { images } from "@/lib/images";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/whatsapp";
import { Reveal } from "./reveal";
import { useCart } from "./cart-context";

const product = getProduct("trufa-de-chocolate")!;

const FEATURES = [
  { icon: Leaf, label: "Chocolate de origen y manteca de verdad" },
  { icon: Clock, label: "Horneada el mismo día de la entrega" },
  { icon: Gift, label: "Mensaje escrito a mano, sin cargo" },
];

export function FeaturedProduct() {
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes[1].id);
  const size = product.sizes.find((s) => s.id === sizeId)!;

  return (
    <section id="featured" className="relative overflow-hidden bg-warm-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-10 lg:gap-24">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(27,14,11,0.3)]">
            <Image
              src={images.featured.src}
              alt={images.featured.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 92vw, 48vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-6 hidden w-40 overflow-hidden rounded-[1.5rem] border-4 border-warm-ivory shadow-[0_20px_40px_-15px_rgba(27,14,11,0.35)] sm:block md:-right-8 lg:w-48">
            <div className="relative aspect-square">
              <Image
                src={product.photos[2].src}
                alt={product.photos[2].alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-medium leading-[0.98] text-espresso">
            Trufa de Chocolate
          </h2>
          <p className="mt-3 font-display text-xl italic text-[#a5635e]">{product.tagline}</p>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-espresso/70">{product.story}</p>

          <fieldset className="mt-9">
            <legend className="text-[12px] font-semibold tracking-[0.16em] text-espresso/55">TAMAÑO</legend>
            <div className="mt-3 grid max-w-md grid-cols-3 gap-2">
              {product.sizes.map((s) => {
                const checked = s.id === sizeId;
                return (
                  <label
                    key={s.id}
                    className={`cursor-pointer rounded-2xl border px-3 py-3 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                      checked
                        ? "border-espresso bg-espresso text-ivory"
                        : "border-espresso/15 text-espresso hover:border-espresso/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="featured-size"
                      value={s.id}
                      checked={checked}
                      onChange={() => setSizeId(s.id)}
                      className="sr-only"
                    />
                    <span className="block text-[14px] font-semibold">{s.label}</span>
                    <span className={`block text-[12px] ${checked ? "text-ivory/65" : "text-espresso/50"}`}>
                      {s.serves}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <span className="font-display text-4xl font-medium tabular-nums text-espresso">
              {formatPrice(size.price)}
            </span>
            <button
              onClick={() => addItem(product, size)}
              className="inline-flex items-center justify-center rounded-full bg-espresso px-8 py-4 text-[12px] font-semibold tracking-[0.12em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
            >
              AÑADIR AL PEDIDO
            </button>
          </div>
          <Link
            href={`/catalogo/${product.slug}`}
            className="group mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-espresso/70 underline decoration-espresso/25 underline-offset-[6px] transition-colors hover:text-espresso hover:decoration-espresso"
          >
            Ver capas, alérgenos y más fotos
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <ul className="mt-12 flex flex-col gap-4 border-t border-espresso/10 pt-8">
            {FEATURES.map((feature) => (
              <li key={feature.label} className="flex items-center gap-4">
                <feature.icon size={18} strokeWidth={1.5} className="shrink-0 text-[#a5635e]" />
                <span className="text-[14px] text-espresso/75">{feature.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
