"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { Reveal } from "./reveal";
import { toast } from "sonner";

const MOODS = [
  {
    key: "chocolate",
    label: "Necesito Chocolate",
    image: images.mood.chocolate,
  },
  {
    key: "love",
    label: "Quiero Algo Romántico",
    image: images.mood.love,
  },
  {
    key: "celebrate",
    label: "Quiero Celebrar",
    image: images.mood.celebrate,
  },
  {
    key: "beautiful",
    label: "Quiero Algo Hermoso",
    image: images.mood.beautiful,
  },
] as const;

export function MoodSection() {
  const [active, setActive] = useState<(typeof MOODS)[number]["key"]>(
    "chocolate",
  );

  return (
    <section
      id="mood"
      className="bg-espresso py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-4 text-[12px] font-semibold tracking-[0.35em] text-rose/70">
              ELIGE TU
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none text-ivory">
              Antojo
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[15px] leading-relaxed text-ivory/60 md:text-right">
              Porque cada emoción merece un pastel.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {MOODS.map((mood, i) => {
            const isActive = active === mood.key;
            return (
              <Reveal key={mood.key} delay={i * 0.08}>
                <button
                  onClick={() => {
                    setActive(mood.key);
                    toast(`Mostrando selección para "${mood.label}"`, {
                      description: "Desliza hacia abajo para ver nuestro pastel destacado.",
                    });
                  }}
                  className={`group relative flex h-full w-full flex-col items-start gap-5 overflow-hidden rounded-[2rem] p-6 text-left transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-b from-rose/25 to-espresso ring-1 ring-rose/40"
                      : "bg-ivory/[0.04] hover:bg-ivory/[0.07]"
                  }`}
                  style={{
                    borderRadius: i % 2 === 0 ? "2.5rem 2.5rem 1rem 2.5rem" : "1rem 2.5rem 2.5rem 2.5rem",
                  }}
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-lg md:h-20 md:w-20">
                    <Image
                      src={mood.image.src}
                      alt={mood.image.alt}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </span>
                  <span className="font-display text-xl italic leading-tight text-ivory md:text-2xl">
                    {mood.label}
                  </span>
                  <span
                    className={`mt-auto flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                      isActive
                        ? "border-rose bg-rose text-espresso"
                        : "border-ivory/25 text-ivory/70 group-hover:border-ivory/60"
                    }`}
                  >
                    <ArrowRight size={14} />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
