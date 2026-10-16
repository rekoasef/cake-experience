"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import type { Category, Occasion, Product } from "@/lib/types";
import { CATEGORIES, OCCASIONS, fromPrice, products } from "@/lib/products";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { ProductCard } from "./product-card";

export type CatalogFilters = {
  category: Category | "todo";
  occasion: Occasion | "todas";
  sort: "destacados" | "precio-asc" | "precio-desc";
  query: string;
};

const SORTS: { id: CatalogFilters["sort"]; label: string }[] = [
  { id: "destacados", label: "Destacados" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
];

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function matches(product: Product, f: CatalogFilters) {
  if (f.category !== "todo" && product.category !== f.category) return false;
  if (f.occasion !== "todas" && !product.occasions.includes(f.occasion)) return false;
  if (f.query.trim()) {
    const haystack = normalize(
      [product.name, product.description, product.tagline, ...product.layers].join(" "),
    );
    if (!normalize(f.query.trim()).split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  return true;
}

function sortProducts(list: Product[], sort: CatalogFilters["sort"]) {
  const copy = [...list];
  if (sort === "precio-asc") return copy.sort((a, b) => fromPrice(a) - fromPrice(b));
  if (sort === "precio-desc") return copy.sort((a, b) => fromPrice(b) - fromPrice(a));
  return copy.sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
}

export function CatalogBrowser({ initial }: { initial: CatalogFilters }) {
  const [filters, setFilters] = useState<CatalogFilters>(initial);
  const set = (patch: Partial<CatalogFilters>) => setFilters((f) => ({ ...f, ...patch }));

  // Keep the URL shareable: /catalogo?categoria=tartas&ocasion=regalo
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category !== "todo") params.set("categoria", filters.category);
    if (filters.occasion !== "todas") params.set("ocasion", filters.occasion);
    if (filters.sort !== "destacados") params.set("orden", filters.sort);
    if (filters.query.trim()) params.set("q", filters.query.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/catalogo?${qs}` : "/catalogo");
  }, [filters]);

  const results = useMemo(() => sortProducts(products.filter((p) => matches(p, filters)), filters.sort), [filters]);

  const countFor = (category: Category | "todo") =>
    products.filter((p) => matches(p, { ...filters, category })).length;

  const isBrowsingAll =
    filters.category === "todo" && filters.occasion === "todas" && !filters.query.trim() && filters.sort === "destacados";

  const hasFilters = filters.category !== "todo" || filters.occasion !== "todas" || filters.query.trim() !== "";

  const heading =
    filters.category === "todo"
      ? "Catálogo"
      : CATEGORIES.find((c) => c.id === filters.category)!.plural;

  return (
    <>
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={heading}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.25rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.025em] text-espresso"
            >
              {heading}
            </motion.h1>
          </AnimatePresence>
          <p className="max-w-sm text-[15px] leading-relaxed text-espresso/70 md:justify-self-end">
            {products.length} creaciones horneadas a mano. Elegí tamaño, sumalas a tu pedido y
            lo confirmamos juntos por WhatsApp.
          </p>
        </div>
      </header>

      <div className="sticky top-[76px] z-30 mt-12 border-y border-espresso/10 bg-ivory/90 backdrop-blur-md md:mt-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <nav aria-label="Categorías" className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <ul className="flex min-w-max gap-1 py-3">
              {(["todo", ...CATEGORIES.map((c) => c.id)] as const).map((id) => {
                const active = filters.category === id;
                const label = id === "todo" ? "Todo" : CATEGORIES.find((c) => c.id === id)!.label;
                const count = countFor(id);
                return (
                  <li key={id}>
                    <button
                      onClick={() => set({ category: id })}
                      aria-pressed={active}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors ${
                        active ? "text-ivory" : "text-espresso/70 hover:text-espresso"
                      } ${count === 0 && !active ? "opacity-40" : ""}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="category-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          className="absolute inset-0 rounded-full bg-espresso"
                        />
                      )}
                      <span className="relative">{label}</span>
                      <span className={`relative text-[11px] tabular-nums ${active ? "text-ivory/60" : "text-espresso/40"}`}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <div role="group" aria-label="Ocasión" className="flex min-w-max items-center gap-2">
              <span className="mr-1 text-[12px] text-espresso/50">Para</span>
              {OCCASIONS.map((o) => {
                const active = filters.occasion === o.id;
                return (
                  <button
                    key={o.id}
                    aria-pressed={active}
                    onClick={() => set({ occasion: active ? "todas" : o.id })}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
                      active
                        ? "border-[#a5635e] bg-[#a5635e] text-ivory"
                        : "border-espresso/15 text-espresso/75 hover:border-espresso/40"
                    }`}
                  >
                    {o.label}
                    {active && <X size={12} aria-hidden />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative flex-1 lg:w-64 lg:flex-none">
              <span className="sr-only">Buscar en el catálogo</span>
              <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40" />
              <input
                type="search"
                value={filters.query}
                onChange={(e) => set({ query: e.target.value })}
                placeholder="Pistacho, frutillas, limón…"
                className="h-11 w-full rounded-full border border-espresso/15 bg-transparent pl-10 pr-4 text-[14px] text-espresso placeholder:text-espresso/45 focus:border-espresso/40 focus:outline-none"
              />
            </label>
            <label className="relative">
              <span className="sr-only">Ordenar</span>
              <select
                value={filters.sort}
                onChange={(e) => set({ sort: e.target.value as CatalogFilters["sort"] })}
                className="h-11 appearance-none rounded-full border border-espresso/15 bg-transparent pl-4 pr-10 text-[13px] text-espresso focus:border-espresso/40 focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-espresso/50" />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pb-10 text-[13px] text-espresso/55">
          <p aria-live="polite" className="tabular-nums">
            {results.length === 1 ? "1 creación" : `${results.length} creaciones`}
          </p>
          {hasFilters && (
            <button
              onClick={() => setFilters({ category: "todo", occasion: "todas", sort: filters.sort, query: "" })}
              className="underline decoration-espresso/25 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center rounded-[2rem] bg-warm-ivory px-6 py-20 text-center">
            <p className="font-display text-3xl font-medium text-espresso md:text-4xl">
              Esa combinación todavía no existe.
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-espresso/65">
              Pero podemos inventarla. Contanos qué tenés en mente o probá con otros filtros.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setFilters({ category: "todo", occasion: "todas", sort: "destacados", query: "" })}
                className="rounded-full border border-espresso/20 px-6 py-3 text-[12px] font-semibold tracking-[0.12em] text-espresso transition-colors hover:border-espresso"
              >
                VER TODO
              </button>
              <a
                href={buildWhatsappLink(`Hola CAKÉ, busco algo así: ${filters.query}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-espresso px-6 py-3 text-[12px] font-semibold tracking-[0.12em] text-ivory transition-transform hover:-translate-y-0.5"
              >
                PEDIR UNA A MEDIDA
              </a>
            </div>
          </div>
        ) : isBrowsingAll ? (
          <div className="flex flex-col gap-24 md:gap-32">
            {CATEGORIES.map((category) => {
              const list = sortProducts(products.filter((p) => p.category === category.id), "destacados");
              return (
                <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                  <div className="mb-10 flex items-end justify-between gap-6 border-b border-espresso/10 pb-5">
                    <h2 id={`cat-${category.id}`} className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none text-espresso">
                      {category.plural}
                    </h2>
                    <button
                      onClick={() => {
                        set({ category: category.id });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="group flex shrink-0 items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-espresso/60 transition-colors hover:text-espresso"
                    >
                      <span className="hidden sm:inline">SOLO {category.label.toUpperCase()}</span>
                      <span className="sm:hidden">VER</span>
                      <span className="tabular-nums text-espresso/40">({list.length})</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  <ProductGrid list={list} />
                </section>
              );
            })}
          </div>
        ) : (
          <ProductGrid list={results} />
        )}

        <aside className="my-24 grid overflow-hidden rounded-[2.5rem] bg-espresso text-ivory md:my-32 md:grid-cols-[1.2fr_1fr]">
          <div className="p-10 md:p-16">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-[1] text-ivory">
              ¿No está la que <span className="italic text-rose">imaginaste</span>?
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/65">
              Diseñamos tortas a medida para bodas, cumpleaños y eventos. Mandanos fecha, cantidad de
              invitados y una idea; te respondemos con boceto y presupuesto.
            </p>
            <a
              href={buildWhatsappLink("Hola CAKÉ, quiero diseñar una torta por encargo. La fecha es: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-4 text-[12px] font-semibold tracking-[0.12em] text-espresso transition-transform hover:-translate-y-0.5"
            >
              DISEÑAR POR ENCARGO
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <ul className="grid grid-cols-3 gap-px self-stretch bg-ivory/10 text-center md:grid-cols-1">
            {[
              ["48 h", "anticipación para tortas"],
              ["3 semanas", "para bodas y eventos"],
              ["Sin cargo", "mensaje y velas"],
            ].map(([value, label]) => (
              <li key={label} className="flex flex-col justify-center bg-espresso px-4 py-8">
                <span className="font-display text-2xl text-ivory md:text-3xl">{value}</span>
                <span className="mt-1 text-[12px] text-ivory/50">{label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

function ProductGrid({ list }: { list: Product[] }) {
  return (
    <motion.ul layout className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {list.map((product) => (
          <motion.li
            key={product.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard product={product} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
