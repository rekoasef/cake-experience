"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { images } from "@/lib/images";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { Reveal } from "./reveal";

const ASPECT = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export function Commissions() {
  const items = images.commissions;
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <section id="encargos" className="scroll-mt-20 bg-warm-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr] md:items-end">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[0.98] text-espresso">
              Hecho por encargo,
              <br />
              <span className="italic">nunca dos iguales</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:justify-self-end">
            <p className="max-w-sm text-[15px] leading-relaxed text-espresso/70">
              Bodas, cumpleaños, mesas dulces. Nos contás la idea, la dibujamos juntos y la horneamos para tu fecha.
            </p>
            <a
              href={buildWhatsappLink("Hola CAKÉ, quiero diseñar una torta por encargo. La fecha es: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-[12px] font-semibold tracking-[0.12em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
            >
              DISEÑAR LA MÍA
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
          {items.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 0.06} className="mb-4 break-inside-avoid md:mb-6">
              <button
                onClick={() => setOpen(i)}
                aria-label={`Ampliar: ${item.caption}`}
                className="group block w-full text-left"
              >
                <span className={`relative block ${ASPECT[item.aspect as keyof typeof ASPECT]} w-full overflow-hidden rounded-[1.5rem] bg-beige/40`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 46vw, (max-width: 1024px) 31vw, 23vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </span>
                <span className="mt-3 block font-display text-[1.05rem] italic text-espresso/70">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={items[open].caption}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/95 p-4 md:p-10"
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full w-full max-w-5xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1">
                <Image
                  src={items[open].src}
                  alt={items[open].alt}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4 text-ivory">
                <span className="font-display text-xl italic">{items[open].caption}</span>
                <span className="text-[12px] tabular-nums text-ivory/50">
                  {open + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
            <button
              aria-label="Cerrar"
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
            >
              <X size={18} />
            </button>
            <button
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Siguiente"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
            >
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
