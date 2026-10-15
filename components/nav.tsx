"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart-context";

const LINKS = [
  { label: "Inicio", href: "#top" },
  { label: "Nuestros Pasteles", href: "#featured" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Nosotros", href: "#cake-dna" },
  { label: "Reseñas", href: "#testimonials" },
  { label: "Contacto", href: "#footer" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 shadow-[0_1px_0_0_rgba(27,14,11,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-[0.08em] text-espresso">
            CAKÉ
          </span>
          <span className="mt-0.5 text-[9px] font-medium tracking-[0.3em] text-espresso/60">
            PASTELERÍA DE AUTOR
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-[13px] font-medium tracking-[0.12em] text-espresso/80 transition-colors hover:text-espresso ${
                  i === 0 ? "text-espresso" : ""
                }`}
              >
                {link.label.toUpperCase()}
                {i === 0 && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-espresso" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            aria-label="Buscar"
            className="hidden text-espresso/80 transition-colors hover:text-espresso md:block"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={openCart}
            aria-label="Ver carrito"
            className="relative text-espresso/80 transition-colors hover:text-espresso"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-espresso text-[9px] font-semibold text-ivory">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
            className="text-espresso"
          >
            <Menu size={20} strokeWidth={1.5} />
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
            className="overflow-hidden bg-espresso text-ivory"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              <button
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="mb-4 self-end text-ivory/70 hover:text-ivory"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ivory/10 py-4 font-display text-2xl italic text-ivory/90 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openCart();
                }}
                className="mt-4 flex items-center gap-3 text-ivory/60 transition-colors hover:text-ivory"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                <span className="text-sm">{count} artículo(s) en el carrito</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
