import type { Product } from "./types";

// w=1200 keeps catalog cards crisp at 2x/3x pixel density on the widest
// rendered card size (~30vw on large desktops); q=85 avoids visible compression.
function unsplash(id: string, params = "auto=format&fit=crop&q=85&w=1200") {
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

export const catalogProducts: Product[] = [
  {
    id: "trufa-chocolate",
    name: "Trufa de Chocolate",
    description: "Ganache aterciopelado y bizcocho húmedo de cacao.",
    price: 1299,
    image: unsplash("1772196229845-9addc8cccdee"),
    alt: "Trufa de chocolate en capas con ganache brillante",
  },
  {
    id: "fresas-y-nata",
    name: "Fresas y Nata",
    description: "Bizcocho ligero, crema fresca y fresas de temporada.",
    price: 1149,
    image: unsplash("1641848421644-a1603f016f51"),
    alt: "Porción de pastel blanco con fresas frescas",
  },
  {
    id: "bosque-de-frutos-rojos",
    name: "Bosque de Frutos Rojos",
    description: "Capas de chocolate oscuro con frutos rojos frescos y crema.",
    price: 1349,
    image: unsplash("1669926187718-7cf723d02c29"),
    alt: "Pastel de chocolate con frutos rojos frescos",
  },
  {
    id: "pastel-de-celebracion",
    name: "Pastel de Celebración",
    description: "Chocolate intenso coronado con frutos rojos, para ocasiones especiales.",
    price: 1199,
    image: unsplash("1559553156-2e97137af16f"),
    alt: "Pastel de chocolate con frutos rojos y una bengala encendida",
  },
  {
    id: "naked-cake-floral",
    name: "Naked Cake Floral",
    description: "Bizcocho al desnudo decorado con flores comestibles.",
    price: 1399,
    image: unsplash("1704358826048-04d97dde2f96"),
    alt: "Pastel blanco al desnudo decorado con flores delicadas",
  },
  {
    id: "clasico-con-ganache",
    name: "Clásico con Ganache",
    description: "El favorito de siempre: bizcocho de chocolate y ganache espejado.",
    price: 1249,
    image: unsplash("1578985545062-69928b1d9587"),
    alt: "Pastel entero de chocolate con ganache goteando sobre un pie blanco",
  },
  {
    id: "pastel-de-zanahoria",
    name: "Pastel de Zanahoria",
    description: "Bizcocho especiado con nueces y frosting de queso crema.",
    price: 1179,
    image: unsplash("1566121933407-3c7ccdd26763"),
    alt: "Porción de pastel de zanahoria con frosting de queso crema, servida con pala",
  },
];
