"use client";

import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { images } from "@/lib/images";
import { Reveal } from "./reveal";

const LAYERS = [
  { number: "01", title: "Chocolate Belga", detail: "Ganache intenso y aterciopelado" },
  { number: "02", title: "Crema Batida", detail: "Ligera y esponjosa" },
  { number: "03", title: "Bizcocho de Cacao", detail: "Húmedo y suave" },
  { number: "04", title: "Crocante de Chocolate", detail: "Para el bocado perfecto" },
];

export function CakeDna() {
  return (
    <section id="cake-dna" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[0.9fr_1fr_0.7fr] md:gap-8 md:px-10">
        <Reveal>
          <p className="mb-3 text-[12px] font-semibold tracking-[0.3em] text-espresso/45">
            POR DENTRO
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-espresso">
            El ADN del Pastel
          </h2>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-espresso/70">
            Capas de amor, en cada bocado.
          </p>
          <a
            href="#featured"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
          >
            EXPLORAR CAPAS
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative mx-auto aspect-[3/4] w-full max-w-xs md:max-w-sm"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(27,14,11,0.3)]">
            <Image
              src={images.cakeDna.src}
              alt={images.cakeDna.alt}
              fill
              sizes="(max-width: 768px) 80vw, 30vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="flex flex-col gap-6 border-l border-espresso/10 pl-6">
            {LAYERS.map((layer) => (
              <li key={layer.number}>
                <p className="font-display text-sm italic text-rose/80">
                  {layer.number}
                </p>
                <p className="font-display text-lg font-medium text-espresso">
                  {layer.title}
                </p>
                <p className="text-[13px] text-espresso/55">{layer.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 text-espresso/40">
            <Heart size={16} strokeWidth={1.5} />
            <p className="font-display text-sm italic">
              Ingredientes reales. Mejores momentos.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
