"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart-context";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Ocasiones", href: "/#ocasiones" },
  { label: "Encargos", href: "/#encargos" },
  { label: "Nosotros", href: "/#cake-dna" },
  { label: "Reseñas", href: "/#testimonials" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled || open
          ? "bg-ivory/90 shadow-[0_1px_0_0_rgba(27,14,11,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="group flex flex-col leading-none" aria-label="CAKÉ, ir al inicio">
          <span className="font-display text-2xl font-semibold tracking-[0.08em] text-espresso">
            CAKÉ
          </span>
          <span className="mt-0.5 text-[9px] font-medium tracking-[0.3em] text-espresso/60">
            PASTELERÍA DE AUTOR
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative text-[12px] font-medium tracking-[0.14em] transition-colors hover:text-espresso ${
                    active ? "text-espresso" : "text-espresso/65"
                  }`}
                >
                  {link.label.toUpperCase()}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-espresso transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/catalogo"
            className="hidden rounded-full border border-espresso/20 px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-ivory md:inline-flex lg:hidden"
          >
            CATÁLOGO
          </Link>
          <button
            onClick={openCart}
            aria-label={`Ver pedido (${count} ${count === 1 ? "artículo" : "artículos"})`}
            className="relative flex h-11 items-center gap-2 rounded-full bg-espresso pl-4 pr-4 text-ivory transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            <span className="text-[11px] font-semibold tracking-[0.14em]">
              PEDIDO
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold tabular-nums text-espresso"
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-espresso transition-colors hover:bg-espresso/5 lg:hidden"
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-espresso text-ivory lg:hidden"
          >
            <div className="flex flex-col px-6 pb-8 pt-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ivory/10 py-4 font-display text-3xl italic text-ivory/90 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
