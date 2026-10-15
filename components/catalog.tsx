"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { catalogProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/whatsapp";
import { Reveal } from "./reveal";
import { useCart } from "./cart-context";

export function Catalog() {
  const { addItem } = useCart();

  return (
    <section id="catalogo" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:max-w-xl">
          <Reveal>
            <p className="mb-3 text-[12px] font-semibold tracking-[0.3em] text-espresso/45">
              ALGUNOS EJEMPLOS
            </p>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.02] text-espresso">
              Nuestro Catálogo
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-espresso/70">
              Una muestra de lo que creamos. Elegí tu favorito y armá tu pedido.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {catalogProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-warm-ivory/60">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-medium text-espresso">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-espresso/60">
                    {product.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-lg font-medium text-espresso">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => addItem(product)}
                      aria-label={`Añadir ${product.name} al carrito`}
                      className="flex items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-[12px] font-semibold tracking-[0.05em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <Plus size={13} />
                      AÑADIR
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
