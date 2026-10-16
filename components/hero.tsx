"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { products } from "@/lib/products";

const FLAVORS = [
  { key: "chocolate", label: "Chocolate" },
  { key: "redVelvet", label: "Red Velvet" },
  { key: "pistacho", label: "Pistacho" },
  { key: "limon", label: "Limón" },
] as const;

type FlavorKey = (typeof FLAVORS)[number]["key"];

export function Hero() {
  const [active, setActive] = useState<FlavorKey>("chocolate");
  const current = images.heroFlavors[active];

  return (
    <section className="relative overflow-hidden bg-ivory pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1fr_1.05fr] md:gap-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h1 className="balance font-display text-[clamp(3rem,7.4vw,6rem)] font-medium leading-[0.95] tracking-[-0.025em] text-espresso">
            No es un Postre.
            <br />
            Es un <span className="italic text-[#a5635e]">Instante.</span>
          </h1>
          <p className="mt-7 max-w-md text-[16px] leading-relaxed text-espresso/70">
            Tortas, tartas y cheesecakes de autor, horneados a mano cada mañana
            para tus días más especiales y para los que no lo son tanto.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-[12px] font-semibold tracking-[0.12em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
            >
              VER LAS {products.length} CREACIONES
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#ocasiones"
              className="group inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.12em] text-espresso/70 transition-colors hover:text-espresso"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/20 transition-colors group-hover:border-espresso/50">
                <ArrowDown size={14} />
              </span>
              ELEGIR POR OCASIÓN
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-espresso/10 pt-6">
            {[
              ["A diario", "horneado del día"],
              ["48 h", "para tu torta"],
              ["En el día", "envío a domicilio"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-xl font-medium text-espresso">{value}</dt>
                <dd className="mt-1 text-[12px] leading-snug text-espresso/55">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:max-w-none">
            <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-dark-chocolate shadow-[0_40px_80px_-30px_rgba(27,14,11,0.45)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority={active === "chocolate"}
                    quality={90}
                    sizes="(max-width: 768px) 92vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espresso/70 to-transparent" />
              <Link
                href={`/catalogo/${current.slug}`}
                className="group absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-ivory"
              >
                <span>
                  <span className="block text-[11px] tracking-[0.18em] text-ivory/70">EN LA VITRINA HOY</span>
                  <span className="mt-1 block font-display text-3xl font-medium leading-none">{current.name}</span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-espresso transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>

            <div
              role="radiogroup"
              aria-label="Elegí un sabor"
              className="absolute -left-4 top-10 hidden w-48 rounded-[1.75rem] bg-ivory/95 p-2 shadow-[0_20px_40px_-15px_rgba(27,14,11,0.3)] backdrop-blur md:block lg:-left-12"
            >
              {FLAVORS.map((flavor) => (
                <FlavorButton key={flavor.key} flavor={flavor} active={active} onSelect={setActive} />
              ))}
            </div>
          </div>

          <div role="radiogroup" aria-label="Elegí un sabor" className="mt-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {FLAVORS.map((flavor) => (
              <button
                key={flavor.key}
                role="radio"
                aria-checked={active === flavor.key}
                onClick={() => setActive(flavor.key)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  active === flavor.key ? "bg-espresso text-ivory" : "bg-beige/50 text-espresso/75"
                }`}
              >
                {flavor.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FlavorButton({
  flavor,
  active,
  onSelect,
}: {
  flavor: (typeof FLAVORS)[number];
  active: FlavorKey;
  onSelect: (key: FlavorKey) => void;
}) {
  const isActive = active === flavor.key;
  const img = images.heroFlavors[flavor.key];
  return (
    <button
      role="radio"
      aria-checked={isActive}
      onClick={() => onSelect(flavor.key)}
      className={`flex w-full items-center gap-3 rounded-[1.4rem] p-2 text-left transition-colors ${
        isActive ? "bg-espresso text-ivory" : "text-espresso/70 hover:bg-beige/40"
      }`}
    >
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
        <Image src={img.src} alt="" fill sizes="36px" className="object-cover" />
      </span>
      <span className="flex-1 text-[13px] font-medium">{flavor.label}</span>
      {isActive && <ArrowRight size={13} className="mr-1" />}
    </button>
  );
}
