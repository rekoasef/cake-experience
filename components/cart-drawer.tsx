"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./cart-context";
import { buildWhatsappOrderLink, formatPrice } from "@/lib/whatsapp";
import { products } from "@/lib/products";

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.45 1.33 4.95L2 22l5.2-1.36A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.2c-1.6 0-3.14-.43-4.48-1.24l-.32-.19-3.08.8.82-3-.21-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.53 3.68-8.21 8.22-8.21s8.21 3.68 8.21 8.21-3.68 8.3-8.1 8.3Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12 .17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function CartDrawer() {
  const { items, isOpen, close, removeItem, setQty, total } = useCart();
  const whatsappLink = buildWhatsappOrderLink(items);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-espresso/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Tu pedido"
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
              <h2 className="font-display text-2xl font-medium text-espresso">
                Tu Pedido
              </h2>
              <button
                aria-label="Cerrar pedido"
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-espresso/60 transition-colors hover:bg-espresso/5 hover:text-espresso"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={36} strokeWidth={1} className="text-espresso/25" />
                <p className="max-w-[18rem] text-[15px] leading-relaxed text-espresso/60">
                  Todavía no elegiste nada. Hay {products.length} creaciones esperándote en el catálogo.
                </p>
                <Link
                  href="/catalogo"
                  onClick={close}
                  className="mt-2 rounded-full bg-espresso px-7 py-3 text-[12px] font-semibold tracking-[0.1em] text-ivory transition-transform duration-300 hover:-translate-y-0.5"
                >
                  VER CATÁLOGO
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex gap-4 border-b border-espresso/10 py-5 first:pt-0"
                    >
                      <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-beige/40">
                        <Image
                          src={item.product.photos[0].src}
                          alt={item.product.photos[0].alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/catalogo/${item.product.slug}`}
                            onClick={close}
                            className="font-display text-lg font-medium leading-tight text-espresso hover:underline hover:underline-offset-4"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            aria-label={`Quitar ${item.product.name}`}
                            onClick={() => removeItem(item.key)}
                            className="shrink-0 text-espresso/35 transition-colors hover:text-espresso"
                          >
                            <Trash2 size={15} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="mt-1 text-[13px] text-espresso/55">
                          {item.size.label} · {item.size.serves} ·{" "}
                          <span className="tabular-nums">{formatPrice(item.size.price)}</span>
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            aria-label="Restar cantidad"
                            onClick={() => setQty(item.key, item.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-espresso/20 text-espresso/70 transition-colors hover:border-espresso/40"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-4 text-center text-[13px] font-medium tabular-nums text-espresso">
                            {item.qty}
                          </span>
                          <button
                            aria-label="Sumar cantidad"
                            onClick={() => setQty(item.key, item.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-espresso/20 text-espresso/70 transition-colors hover:border-espresso/40"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-espresso/10 px-6 py-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[14px] font-medium text-espresso/70">Total</span>
                    <span className="font-display text-2xl font-medium tabular-nums text-espresso">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-[13px] font-semibold tracking-[0.06em] text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <WhatsappIcon width={17} height={17} />
                    PEDIR POR WHATSAPP
                  </a>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-espresso/45">
                    Se abrirá WhatsApp con tu pedido ya escrito. Confirmamos fecha, entrega y pago por ahí.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
