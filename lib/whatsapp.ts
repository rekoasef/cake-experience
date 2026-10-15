import type { CartItem } from "./types";

// TODO: replace with the business's verified WhatsApp Business number if this
// number ever changes. Format is countrycode + number, no symbols, per wa.me.
const WHATSAPP_PHONE = "5493471343991";

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("es-AR")}`;
}

export function buildOrderMessage(items: CartItem[]) {
  const lines = items.map(
    (item) =>
      `• ${item.qty} × ${item.product.name} — ${formatPrice(item.product.price * item.qty)}`,
  );
  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return [
    "Hola, quiero hacer este pedido en CAKÉ:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "¡Gracias!",
  ].join("\n");
}

export function buildWhatsappOrderLink(items: CartItem[]) {
  const message = buildOrderMessage(items);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
