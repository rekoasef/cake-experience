"use client";

import Image from "next/image";
import { Leaf, Clock, Gift } from "lucide-react";
import { images } from "@/lib/images";
import { catalogProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/whatsapp";
import { Reveal } from "./reveal";
import { useCart } from "./cart-context";

const featuredProduct = catalogProducts.find((p) => p.id === "trufa-chocolate")!;

const FEATURES = [
  { icon: Leaf, label: "Ingredientes Premium" },
  { icon: Clock, label: "Horneado Fresco a Diario" },
  { icon: Gift, label: "Personalizable para Cada Ocasión" },
];

export function FeaturedProduct() {
  const { addItem } = useCart();

  return (
    <section id="featured" className="relative overflow-hidden bg-warm-ivory py-24 md:py-32">
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 text-espresso/[0.05] md:h-96 md:w-96"
        fill="none"
      >
        <path
          d="M200 20c20 40 60 60 100 60-20 40 0 90 40 110-50 10-80 50-80 100 -30-30-80-30-110 0 0-50-40-90-90-100 40-20 60-70 40-110 40 0 80-20 100-60Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1fr_1.1fr_0.8fr] md:gap-10 md:px-10">
        <Reveal className="relative mx-auto aspect-square w-full max-w-sm md:max-w-none">
          <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-beige/60 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(27,14,11,0.3)]">
            <Image
              src={images.featured.src}
              alt={images.featured.alt}
              fill
              sizes="(max-width: 768px) 90vw, 35vw"
              className="object-cover"
            />
          </div>
          <span className="absolute bottom-5 left-5 rounded-full bg-ivory/90 px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-espresso/70 shadow">
            VISTA 360°
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-3 text-[12px] font-semibold tracking-[0.3em] text-espresso/45">
            PASTEL DESTACADO
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.02] text-espresso">
            Trufa de
            <br />
            Chocolate
          </h2>
          <p className="mt-4 font-display text-lg italic text-espresso/60">
            Intenso. Suave. Irresistible.
          </p>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-espresso/70">
            Capas de bizcocho de chocolate húmedo, ganache aterciopelado y un
            toque de cacao, terminadas con virutas de chocolate hechas a mano.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <span className="font-display text-2xl font-medium text-espresso">
              Desde {formatPrice(featuredProduct.price)}
            </span>
          </div>

          <button
            onClick={() => addItem(featuredProduct)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-espresso px-8 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
          >
            AÑADIR AL CARRITO
          </button>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col gap-7">
          {FEATURES.map((feature) => (
            <div key={feature.label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-espresso/15 text-espresso/70">
                <feature.icon size={18} strokeWidth={1.5} />
              </span>
              <span className="text-[14px] font-medium leading-snug text-espresso/75">
                {feature.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
