import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { categoryLabel, getProduct, products, relatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/catalogo/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline} ${product.description}`,
    openGraph: { images: [`${product.photos[0].src}?auto=format&fit=crop&w=1200&h=630&q=80`] },
  };
}

export default async function ProductPage({ params }: PageProps<"/catalogo/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

  return (
    <main className="bg-ivory pt-24 md:pt-28">
      <nav aria-label="Ruta" className="mx-auto max-w-[1400px] px-6 md:px-10">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-espresso/55">
          <li>
            <Link href="/" className="hover:text-espresso">Inicio</Link>
          </li>
          <ChevronRight size={12} aria-hidden />
          <li>
            <Link href="/catalogo" className="hover:text-espresso">Catálogo</Link>
          </li>
          <ChevronRight size={12} aria-hidden />
          <li>
            <Link href={`/catalogo?categoria=${product.category}`} className="hover:text-espresso">
              {categoryLabel(product.category)}
            </Link>
          </li>
          <ChevronRight size={12} aria-hidden />
          <li aria-current="page" className="text-espresso">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="bg-warm-ivory py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-none text-espresso">
                También te puede <span className="italic">tentar</span>
              </h2>
              <Link
                href="/catalogo"
                className="hidden shrink-0 text-[12px] font-semibold tracking-[0.12em] text-espresso underline decoration-espresso/25 underline-offset-[8px] hover:decoration-espresso sm:inline"
              >
                VER TODO
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard
                    product={p}
                    aspect="aspect-square"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
