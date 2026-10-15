"use client";

import Image from "next/image";
import { ArrowUp, Heart } from "lucide-react";
import { images } from "@/lib/images";
import { Reveal } from "./reveal";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2.2l.8-3H14v-1.5a.5.5 0 0 1 .5-.5H16Z" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </svg>
  );
}

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso py-32 md:py-44">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.finalCta.src}
          alt={images.finalCta.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-6 text-center md:px-10">
        <Reveal>
          <p className="mb-5 text-[12px] font-semibold tracking-[0.35em] text-rose/70">
            ES MÁS QUE UN PASTEL
          </p>
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.05] text-ivory">
            Crea Algo
            <br />
            Digno de Recordar.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="#featured"
            className="mt-10 inline-flex items-center rounded-full border border-ivory/80 px-9 py-4 text-[13px] font-semibold tracking-[0.08em] text-ivory transition-colors duration-300 hover:bg-ivory hover:text-espresso"
          >
            CREA TU PASTEL →
          </a>
        </Reveal>

        <Reveal
          delay={0.25}
          className="mt-16 flex items-center gap-2 font-display text-sm italic text-ivory/50"
        >
          <Heart size={13} />
          <span>La vida es más dulce con pastel</span>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1400px] flex-col gap-10 border-t border-ivory/10 px-6 pt-12 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <p className="font-display text-xl font-semibold tracking-[0.08em] text-ivory">
            CAKÉ
          </p>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-ivory/40">
            PASTELERÍA DE AUTOR
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4 text-[13px] text-ivory/60">
          <a href="#top" className="hover:text-ivory">Inicio</a>
          <a href="#featured" className="hover:text-ivory">Nuestros Pasteles</a>
          <a href="#catalogo" className="hover:text-ivory">Catálogo</a>
          <a href="#cake-dna" className="hover:text-ivory">Nosotros</a>
          <a href="#testimonials" className="hover:text-ivory">Reseñas</a>
          <a href="#footer" className="hover:text-ivory">Contacto</a>
        </div>

        <div className="flex items-center gap-4 text-ivory/60">
          <a href="#" aria-label="Instagram" className="hover:text-ivory">
            <InstagramIcon width={16} height={16} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-ivory">
            <FacebookIcon width={16} height={16} />
          </a>
          <a
            href="#top"
            aria-label="Volver arriba"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 hover:border-ivory/50"
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>

      <p
        id="footer"
        className="mx-auto mt-10 max-w-[1400px] px-6 text-[11px] text-ivory/30 md:px-10"
      >
        © {new Date().getFullYear()} CAKÉ. Marca ficticia creada con fines de demostración.
      </p>
    </section>
  );
}
