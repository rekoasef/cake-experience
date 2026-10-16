import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { buildWhatsappLink } from "@/lib/whatsapp";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2.2l.8-3H14v-1.5a.5.5 0 0 1 .5-.5H16Z" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-ivory/10 bg-espresso text-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl font-semibold tracking-[0.08em]">CAKÉ</p>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-ivory/45">PASTELERÍA DE AUTOR</p>
          <p className="mt-6 max-w-xs font-display text-lg italic leading-snug text-ivory/60">
            Tortas hechas a mano, una por una, para los días que querés recordar.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ivory/40">CATÁLOGO</p>
          <ul className="mt-5 flex flex-col gap-3 text-[14px] text-ivory/70">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/catalogo?categoria=${c.id}`} className="transition-colors hover:text-ivory">
                  {c.plural}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ivory/40">VISITANOS</p>
          <address className="mt-5 flex flex-col gap-3 text-[14px] not-italic leading-relaxed text-ivory/70">
            <span>Obrador y retiro en local</span>
            <span>Martes a sábado · 10 a 20 h</span>
            <span>Envíos en el día a toda la ciudad</span>
          </address>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ivory/40">HABLEMOS</p>
          <div className="mt-5 flex flex-col gap-3 text-[14px] text-ivory/70">
            <a
              href={buildWhatsappLink("Hola CAKÉ, tengo una consulta:")}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ivory"
            >
              WhatsApp
            </a>
            <div className="mt-2 flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-ivory">
                <InstagramIcon width={18} height={18} />
              </a>
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-ivory">
                <FacebookIcon width={18} height={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-6 md:px-10">
          <p className="text-[11px] leading-relaxed text-ivory/40">
            © {new Date().getFullYear()} CAKÉ. Marca ficticia creada con fines de demostración. Precios ilustrativos.
          </p>
          <a
            href="#top"
            aria-label="Volver arriba"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-ivory/60"
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
