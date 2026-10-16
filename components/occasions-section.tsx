"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";
import { OCCASIONS, products } from "@/lib/products";
import type { Occasion } from "@/lib/types";
import { Reveal } from "./reveal";

const LINES: Record<Occasion, string> = {
  cumpleanos: "Velas, bengalas y una porción de más.",
  boda: "Diseñada con vos, a la altura del día.",
  aniversario: "Para dos, o para los que vinieron por ustedes.",
  regalo: "En caja, con moño y una nota escrita a mano.",
  "porque-si": "Un martes también merece algo rico.",
};

export function OccasionsSection() {
  const [active, setActive] = useState<Occasion>("cumpleanos");

  return (
    <section id="ocasiones" className="scroll-mt-20 bg-espresso py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[0.95] text-ivory">
              ¿Qué <span className="italic text-rose">celebramos</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[15px] leading-relaxed text-ivory/60 md:text-right">
              Porque cada emoción merece su torta. Elegí el momento y te mostramos lo que mejor le queda.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <ul className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:h-[34rem] md:overflow-visible md:px-0 md:pb-0">
            {OCCASIONS.map((occasion) => {
              const isActive = active === occasion.id;
              const count = products.filter((p) => p.occasions.includes(occasion.id)).length;
              const img = images.occasions[occasion.id];
              return (
                <li
                  key={occasion.id}
                  onMouseEnter={() => setActive(occasion.id)}
                  onFocus={() => setActive(occasion.id)}
                  className={`relative w-[72vw] shrink-0 snap-start transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-[44vw] md:w-auto md:min-w-0 md:shrink ${
                    isActive ? "md:grow-[3.2]" : "md:grow"
                  }`}
                >
                  <Link
                    href={`/catalogo?ocasion=${occasion.id}`}
                    className="group relative block aspect-[3/4] h-full w-full overflow-hidden rounded-[2rem] md:aspect-auto"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 768px) 44vw, 40vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium tracking-[0.16em] text-ivory/60 tabular-nums">
                          {count} CREACIONES
                        </p>
                        <p
                          className={`mt-1 font-display text-3xl font-medium leading-none text-ivory transition-[font-size] duration-500 ${
                            isActive ? "md:text-[2.4rem]" : "md:text-2xl"
                          }`}
                        >
                          {occasion.label}
                        </p>
                        <p
                          className={`mt-2 max-w-[18rem] text-[14px] leading-snug text-ivory/70 transition-opacity duration-500 ${
                            isActive ? "md:opacity-100" : "md:hidden"
                          }`}
                        >
                          {LINES[occasion.id]}
                        </p>
                      </div>
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-espresso transition-[opacity,transform] duration-500 ${
                          isActive ? "md:scale-100 md:opacity-100" : "md:scale-75 md:opacity-0"
                        }`}
                      >
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
