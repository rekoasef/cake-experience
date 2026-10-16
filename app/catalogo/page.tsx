import type { Metadata } from "next";
import { CatalogBrowser, type CatalogFilters } from "@/components/catalog-browser";
import { CATEGORIES, OCCASIONS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Tortas, cheesecakes, tartas, individuales y tortas de boda de CAKÉ. Filtrá por ocasión y armá tu pedido por WhatsApp.",
};

function pick(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CatalogPage({ searchParams }: PageProps<"/catalogo">) {
  const params = await searchParams;
  const categoria = pick(params.categoria);
  const ocasion = pick(params.ocasion);
  const orden = pick(params.orden);

  const initial: CatalogFilters = {
    category: CATEGORIES.some((c) => c.id === categoria) ? (categoria as CatalogFilters["category"]) : "todo",
    occasion: OCCASIONS.some((o) => o.id === ocasion) ? (ocasion as CatalogFilters["occasion"]) : "todas",
    sort: orden === "precio-asc" || orden === "precio-desc" ? orden : "destacados",
    query: pick(params.q) ?? "",
  };

  return (
    <main className="min-h-screen bg-ivory pt-28 md:pt-36">
      <CatalogBrowser key={JSON.stringify(initial)} initial={initial} />
    </main>
  );
}
