// Real photography sourced from Unsplash (images.unsplash.com), used under the
// Unsplash License. Query params control crop/size per placement; `ixid` omitted
// intentionally — these are direct CDN asset URLs, not tracked referral links.
// Every image below was downloaded and visually verified before use (an earlier
// pass trusted automated descriptions and some were wrong — a 3D virus render,
// a branded "Sacher" torte, even a coconut — so nothing here ships unverified).
function unsplash(id: string, params = "auto=format&fit=crop&q=80") {
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

export const images = {
  hero: {
    src: unsplash("1518091128136-3b02100d789a", "auto=format&fit=crop&q=85&w=1400"),
    alt: "Porción dramática de pastel de chocolate con quenelles de crema y hoja de oro",
    credit: "Unsplash",
  },
  featured: {
    src: unsplash("1772196229845-9addc8cccdee", "auto=format&fit=crop&q=85&w=1200"),
    alt: "Trufa de chocolate en capas dentro de una caja, con ganache brillante",
    credit: "Phil Hearing",
  },
  mood: {
    chocolate: {
      src: unsplash("1578985545062-69928b1d9587", "auto=format&fit=crop&q=80&w=500"),
      alt: "Pastel entero de chocolate con ganache goteando sobre un pie blanco",
      credit: "Unsplash",
    },
    love: {
      src: unsplash("1641848421644-a1603f016f51", "auto=format&fit=crop&q=80&w=500"),
      alt: "Porción de pastel blanco con fresas frescas, elegante y romántico",
      credit: "Léo Roza",
    },
    celebrate: {
      src: unsplash("1559553156-2e97137af16f", "auto=format&fit=crop&q=80&w=500"),
      alt: "Pastel de chocolate con frutos rojos y una bengala encendida",
      credit: "Unsplash",
    },
    beautiful: {
      src: unsplash("1704358826048-04d97dde2f96", "auto=format&fit=crop&q=80&w=500"),
      alt: "Pastel blanco decorado con flores delicadas",
      credit: "Georgia de Lotz",
    },
  },
  flavors: {
    chocolate: {
      src: unsplash("1772196229845-9addc8cccdee", "auto=format&fit=crop&q=80&w=160"),
      alt: "Miniatura de pastel de chocolate",
    },
    vanilla: {
      src: unsplash("1536599524557-5f784dd53282", "auto=format&fit=crop&q=80&w=160"),
      alt: "Miniatura de bizcocho de vainilla",
    },
    strawberry: {
      src: unsplash("1641848421644-a1603f016f51", "auto=format&fit=crop&q=80&w=160"),
      alt: "Miniatura de pastel de fresa",
    },
    redVelvet: {
      src: unsplash("1669926187718-7cf723d02c29", "auto=format&fit=crop&q=80&w=160"),
      alt: "Miniatura de pastel red velvet con frutos rojos",
    },
  },
  process: {
    base: {
      src: unsplash("1536599524557-5f784dd53282", "auto=format&fit=crop&q=80&w=500"),
      alt: "Porciones de bizcocho de vainilla recién horneado, sin decorar",
      credit: "Unsplash",
    },
    cream: {
      src: unsplash("1567009349827-ab242f2c96e6", "auto=format&fit=crop&q=80&w=500"),
      alt: "Pastel con mousse de chocolate y frambuesas frescas sobre la crema",
      credit: "Unsplash",
    },
    ganache: {
      src: unsplash("1578985545062-69928b1d9587", "auto=format&fit=crop&q=80&w=500"),
      alt: "Ganache de chocolate brillante goteando por los costados del pastel",
      credit: "Unsplash",
    },
    decoration: {
      src: unsplash("1512223792601-592a9809eed4", "auto=format&fit=crop&q=80&w=500"),
      alt: "Cacao en polvo cayendo sobre un pastel de chocolate terminado",
      credit: "Unsplash",
    },
  },
  cakeDna: {
    src: unsplash("1557925923-33b27f891f88", "auto=format&fit=crop&q=85&w=900"),
    alt: "Pastel al desnudo mostrando sus capas de bizcocho y crema, coronado con frambuesas",
    credit: "Unsplash",
  },
  testimonials: [
    {
      name: "Andrea K.",
      quote:
        "El pastel superó mis expectativas. Absolutamente delicioso y presentado de forma exquisita.",
      avatar: unsplash("1499651681375-8afc5a4db253", "auto=format&fit=crop&q=80&w=160"),
    },
    {
      name: "Lucía M.",
      quote: "Cada bocado se sintió como una celebración. El mejor pastel que he probado.",
      avatar: unsplash("1494790108377-be9c29b29330", "auto=format&fit=crop&q=80&w=160"),
    },
    {
      name: "Carlos P.",
      quote:
        "Sabor increíble, diseño espectacular y muy fresco. Totalmente recomendado.",
      avatar: unsplash("1651684215020-f7a5b6610f23", "auto=format&fit=crop&q=80&w=160"),
    },
  ],
  finalCta: {
    src: unsplash("1533060297263-15151706e239", "auto=format&fit=crop&q=85&w=1800"),
    alt: "Escena cálida y oscura de un pastel de chocolate con velas encendidas sobre la mesa",
    credit: "Unsplash",
  },
};
