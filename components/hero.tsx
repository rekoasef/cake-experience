"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

const FLAVORS = [
  { key: "chocolate", label: "Chocolate" },
  { key: "vanilla", label: "Vainilla" },
  { key: "strawberry", label: "Fresa" },
  { key: "redVelvet", label: "Red Velvet" },
] as const;

export function Hero() {
  const [active, setActive] = useState<(typeof FLAVORS)[number]["key"]>(
    "chocolate",
  );

  return (
    <section className="relative overflow-hidden bg-ivory pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <p className="mb-5 text-[12px] font-semibold tracking-[0.35em] text-espresso/50">
            MÁS QUE REPOSTERÍA
          </p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-espresso">
            No es un Postre.
            <br />
            Es un{" "}
            <span className="italic text-rose/90" style={{ color: "#a5635e" }}>
              Instante.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-espresso/70">
            Más que pasteles: creamos instantes comestibles, elaborados con
            amor, para tus días más especiales.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="#featured"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
            >
              DESCUBRIR CREACIONES
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#mood"
              className="hidden items-center gap-2 text-[13px] font-medium text-espresso/70 transition-colors hover:text-espresso sm:inline-flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/20">
                <ArrowDown size={14} />
              </span>
              DESLIZA PARA EXPLORAR
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md md:max-w-none"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-beige/50 blur-3xl"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-[0_40px_80px_-30px_rgba(27,14,11,0.35)]">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          <p className="absolute -top-2 left-2 hidden rotate-[-6deg] font-display text-sm italic text-espresso/60 md:block">
            Placer puro
            <br />
            en cada bocado
          </p>

          <div className="absolute -right-4 top-10 hidden w-48 rounded-[1.75rem] bg-ivory/95 p-2 shadow-[0_20px_40px_-15px_rgba(27,14,11,0.25)] backdrop-blur md:block lg:-right-10">
            {FLAVORS.map((flavor) => (
              <button
                key={flavor.key}
                onClick={() => setActive(flavor.key)}
                className={`flex w-full items-center gap-3 rounded-[1.4rem] p-2 text-left transition-colors ${
                  active === flavor.key
                    ? "bg-espresso text-ivory"
                    : "text-espresso/70 hover:bg-beige/40"
                }`}
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={images.flavors[flavor.key].src}
                    alt={images.flavors[flavor.key].alt}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="flex-1 text-[13px] font-medium">
                  {flavor.label}
                </span>
                {active === flavor.key && (
                  <ArrowRight size={13} className="mr-1" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
