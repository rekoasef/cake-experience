import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { images } from "@/lib/images";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso py-32 md:py-44">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.finalCta.src}
          alt={images.finalCta.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/30" />
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-6 text-center md:px-10">
        <Reveal>
          <h2 className="balance font-display text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.98] text-ivory">
            Creá algo
            <br />
            <span className="italic">digno de recordar.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-2 rounded-full bg-ivory px-9 py-4 text-[12px] font-semibold tracking-[0.12em] text-espresso transition-transform duration-300 hover:-translate-y-0.5"
          >
            ELEGIR DEL CATÁLOGO
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={buildWhatsappLink("Hola CAKÉ, quiero diseñar una torta por encargo. La fecha es: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-ivory/70 px-9 py-4 text-[12px] font-semibold tracking-[0.12em] text-ivory transition-colors duration-300 hover:bg-ivory hover:text-espresso"
          >
            DISEÑAR POR ENCARGO
          </a>
        </Reveal>

        <Reveal delay={0.25} className="mt-16 flex items-center gap-2 font-display text-base italic text-ivory/55">
          <Heart size={13} />
          <span>La vida es más dulce con torta</span>
        </Reveal>
      </div>
    </section>
  );
}
