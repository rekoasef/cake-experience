import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProducts, products } from "@/lib/products";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

export function Bestsellers() {
  const [lead, ...rest] = featuredProducts().filter((p) => p.slug !== "trufa-de-chocolate");

  return (
    <section id="mas-pedidos" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[0.98] text-espresso">
              Los que se piden <span className="italic">otra vez</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-espresso underline decoration-espresso/25 underline-offset-[8px] transition-colors hover:decoration-espresso"
            >
              VER EL CATÁLOGO COMPLETO · {products.length}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          <Reveal className="sm:col-span-2 lg:col-span-6 lg:row-span-2">
            <ProductCard
              product={lead}
              aspect="aspect-[4/5] lg:aspect-[5/6]"
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
          </Reveal>
          {rest.slice(0, 4).map((product, i) => (
            <Reveal key={product.slug} delay={(i % 2) * 0.08} className="lg:col-span-3">
              <ProductCard
                product={product}
                aspect="aspect-square"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
