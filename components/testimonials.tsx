"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { images } from "@/lib/images";
import { Reveal } from "./reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const items = images.testimonials;

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + items.length) % items.length);
  };

  return (
    <section id="testimonials" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.02] text-espresso">
              Palabras <span className="italic">dulces</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Reseña anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-espresso/60 transition-colors hover:border-espresso/40 hover:text-espresso"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente reseña"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-espresso/60 transition-colors hover:border-espresso/40 hover:text-espresso"
            >
              <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[0, 1, 2].map((offset) => {
            const item = items[(index + offset) % items.length];
            return (
              <AnimatePresence mode="popLayout" key={offset}>
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-5 rounded-[1.75rem] bg-warm-ivory p-8 shadow-[0_20px_40px_-25px_rgba(27,14,11,0.25)]"
                >
                  <div className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="font-display text-lg italic leading-snug text-espresso/80">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <span className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={item.avatar}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[13px] font-semibold text-espresso/80">
                        {item.name}
                      </span>
                      <span className="text-[12px] text-espresso/50">{item.occasion}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </section>
  );
}
