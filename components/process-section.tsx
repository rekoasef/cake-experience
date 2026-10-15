"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { Reveal } from "./reveal";

const STAGES = [
  {
    number: "01",
    title: "La Base",
    description: "Todo comienza con un bizcocho sencillo.",
    image: images.process.base,
  },
  {
    number: "02",
    title: "La Crema",
    description: "Una capa de puro placer.",
    image: images.process.cream,
  },
  {
    number: "03",
    title: "El Ganache",
    description: "Suave, intenso, irresistible.",
    image: images.process.ganache,
  },
  {
    number: "04",
    title: "La Decoración",
    description: "Porque no es solo un pastel, es un sentimiento.",
    image: images.process.decoration,
  },
];

export function ProcessSection() {
  return (
    <section className="bg-dark-chocolate py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.02] text-ivory">
              El Pastel
              <br />
              Cobra Vida
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center gap-3 text-ivory/50">
            <span className="h-px w-10 bg-ivory/30" />
            <p className="max-w-[16rem] text-[14px] leading-relaxed">
              Desliza para ver cómo se despliega la magia.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.number} delay={i * 0.12} className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem]">
                <Image
                  src={stage.image.src}
                  alt={stage.image.alt}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 font-display text-sm italic text-rose/70">
                {stage.number}
              </p>
              <h3 className="mt-1 font-display text-xl font-medium text-ivory">
                {stage.title}
              </h3>
              <p className="mt-1 text-[13px] leading-snug text-ivory/50">
                {stage.description}
              </p>

              {i < STAGES.length - 1 && (
                <span className="absolute -right-5 top-[35%] hidden text-ivory/20 md:block">
                  <ArrowRight size={18} />
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
