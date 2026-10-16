import type { Category, Occasion, Product, Size } from "./types";

// Real photography from Unsplash (images.unsplash.com), Unsplash License. Every
// id below was downloaded and visually checked before use: wrong subjects and
// photos showing third-party brands (e.g. a branded biscuit) were rejected.
// Size and quality are decided per breakpoint by lib/image-loader.ts.
export function photo(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}

// Prices are illustrative for this fictional demo brand (ARS).
function cakeSizes(base: number): Size[] {
  return [
    { id: "chica", label: "Chica", serves: "8 porciones", price: base },
    { id: "mediana", label: "Mediana", serves: "12 porciones", price: Math.round((base * 1.38) / 500) * 500 },
    { id: "grande", label: "Grande", serves: "20 porciones", price: Math.round((base * 2.1) / 500) * 500 },
  ];
}

function tartSizes(base: number): Size[] {
  return [
    { id: "18cm", label: "18 cm", serves: "6 porciones", price: base },
    { id: "24cm", label: "24 cm", serves: "10 porciones", price: Math.round((base * 1.55) / 500) * 500 },
  ];
}

function boxSizes(unit: number, label = "unidades"): Size[] {
  return [
    { id: "caja-4", label: "Caja x4", serves: `4 ${label}`, price: unit * 4 },
    { id: "caja-6", label: "Caja x6", serves: `6 ${label}`, price: Math.round((unit * 6 * 0.95) / 100) * 100 },
    { id: "caja-12", label: "Caja x12", serves: `12 ${label}`, price: Math.round((unit * 12 * 0.9) / 100) * 100 },
  ];
}

function tierSizes(base: number): Size[] {
  return [
    { id: "2-pisos", label: "2 pisos", serves: "40 porciones", price: base },
    { id: "3-pisos", label: "3 pisos", serves: "70 porciones", price: Math.round((base * 1.65) / 1000) * 1000 },
    { id: "4-pisos", label: "4 pisos", serves: "110 porciones", price: Math.round((base * 2.4) / 1000) * 1000 },
  ];
}

const LEAD = {
  daily: "Pedí con 24 h de anticipación",
  cake: "Pedí con 48 h de anticipación",
  event: "Reservá con 3 semanas de anticipación",
};

export const products: Product[] = [
  // ——— Tortas ———
  {
    slug: "trufa-de-chocolate",
    name: "Trufa de Chocolate",
    tagline: "Intenso. Suave. Irresistible.",
    description: "Bizcocho húmedo de cacao, ganache aterciopelado y virutas hechas a mano.",
    story:
      "Nuestra firma. Tres capas de bizcocho de cacao amargo empapadas en almíbar de café, rellenas de ganache de chocolate semiamargo al 54% y terminadas con un baño espejado y virutas talladas a mano una por una.",
    category: "tortas",
    occasions: ["cumpleanos", "aniversario", "porque-si"],
    photos: [
      { src: photo("1772196229845-9addc8cccdee"), alt: "Trufa de chocolate en capas con ganache brillante" },
      { src: photo("1578985545062-69928b1d9587"), alt: "Torta de chocolate entera con ganache cayendo sobre un pie blanco" },
      { src: photo("1517427294546-5aa121f68e8a"), alt: "Porción de torta de chocolate en capas junto a un tenedor" },
    ],
    sizes: cakeSizes(46000),
    layers: ["Ganache semiamargo 54%", "Bizcocho de cacao al café", "Crema de chocolate", "Virutas a mano"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Soja"],
    leadTime: LEAD.cake,
    badge: "Firma de la casa",
    featured: 1,
  },
  {
    slug: "selva-negra",
    name: "Selva Negra",
    tagline: "El clásico alemán, a nuestra manera.",
    description: "Cacao, crema chantilly y cerezas maceradas en kirsch, con baño de chocolate.",
    story:
      "Capas generosas de bizcocho de chocolate, chantilly apenas dulce y cerezas negras maceradas durante dos días. Un final de chocolate tibio que cae por los bordes, sin prolijidad de más.",
    category: "tortas",
    occasions: ["cumpleanos", "porque-si"],
    photos: [
      { src: photo("1606890737304-57a1ca8a5b62"), alt: "Torta de tres capas de chocolate con crema y cerezas oscuras" },
    ],
    sizes: cakeSizes(44000),
    layers: ["Cerezas al kirsch", "Chantilly", "Bizcocho de chocolate", "Baño de chocolate"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Alcohol"],
    leadTime: LEAD.cake,
    badge: "Más pedido",
    featured: 3,
  },
  {
    slug: "red-velvet",
    name: "Red Velvet",
    tagline: "Terciopelo rojo y frosting de queso.",
    description: "Bizcocho rojo de suero de manteca con frosting de queso crema.",
    story:
      "El bizcocho de suero de manteca con un toque de cacao que le da su miga sedosa, intercalado con frosting de queso crema batido a mano. Suave, apenas ácido, imposible de compartir.",
    category: "tortas",
    occasions: ["cumpleanos", "aniversario", "regalo"],
    photos: [
      { src: photo("1714949134591-d6f2c581b20d"), alt: "Porción de red velvet con frosting blanco y una frutilla" },
      { src: photo("1688153009623-0d9a3ba1b105"), alt: "Torta red velvet entera con una porción cortada" },
      { src: photo("1586788680434-30d324b2d46f"), alt: "Porción de red velvet sobre plato blanco" },
    ],
    sizes: cakeSizes(45000),
    layers: ["Frosting de queso crema", "Bizcocho red velvet", "Migas de red velvet"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
    badge: "Más pedido",
    featured: 2,
  },
  {
    slug: "noir-70",
    name: "Noir 70%",
    tagline: "Para los que piden más cacao.",
    description: "Chocolate amargo al 70%, mousse oscura y crocante de cacao.",
    story:
      "La torta más intensa del obrador. Bizcocho sin harina de chocolate al 70%, mousse oscura y un crocante de nibs de cacao que cruje en cada bocado. Poco dulce, a propósito.",
    category: "tortas",
    occasions: ["aniversario", "porque-si"],
    photos: [
      { src: photo("1518091653999-278f46860620"), alt: "Torta de chocolate oscuro sobre pie de cristal en fondo negro" },
      { src: photo("1517427294546-5aa121f68e8a"), alt: "Porción de torta de chocolate en capas" },
    ],
    sizes: cakeSizes(48000),
    layers: ["Mousse 70%", "Crocante de nibs", "Bizcocho sin harina", "Cacao en polvo"],
    allergens: ["Huevo", "Lácteos", "Soja"],
    leadTime: LEAD.cake,
    badge: "Nuevo",
  },
  {
    slug: "bosque-de-frutos-rojos",
    name: "Bosque de Frutos Rojos",
    tagline: "Chocolate y bosque.",
    description: "Capas de chocolate oscuro con frutos rojos frescos y crema.",
    story:
      "Chocolate oscuro y frutos rojos frescos de productores de la zona, unidos por una crema liviana. La acidez de la fruta corta la intensidad del cacao en el momento justo.",
    category: "tortas",
    occasions: ["cumpleanos", "aniversario"],
    photos: [{ src: photo("1669926187718-7cf723d02c29"), alt: "Torta de chocolate con frutos rojos frescos" }],
    sizes: cakeSizes(47000),
    layers: ["Frutos rojos frescos", "Crema liviana", "Bizcocho de chocolate"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
    badge: "De temporada",
  },
  {
    slug: "fresas-y-nata",
    name: "Frutillas y Crema",
    tagline: "Liviana como una tarde de verano.",
    description: "Bizcocho de vainilla, crema fresca y frutillas de estación.",
    story:
      "Bizcocho de vainilla de Madagascar, crema fresca apenas azucarada y frutillas cortadas en el día. La torta que nadie rechaza.",
    category: "tortas",
    occasions: ["cumpleanos", "regalo", "porque-si"],
    photos: [{ src: photo("1641848421644-a1603f016f51"), alt: "Porción de torta blanca con frutillas frescas" }],
    sizes: cakeSizes(41000),
    layers: ["Frutillas frescas", "Crema fresca", "Bizcocho de vainilla"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
  },
  {
    slug: "clasico-con-ganache",
    name: "Clásica con Ganache",
    tagline: "La de siempre, mejor que nunca.",
    description: "Bizcocho de chocolate y ganache espejado que cae por los bordes.",
    story:
      "Sin vueltas: bizcocho de chocolate húmedo, relleno de dulce de leche repostero y un ganache brillante que cae por los costados.",
    category: "tortas",
    occasions: ["cumpleanos", "porque-si"],
    photos: [
      { src: photo("1578985545062-69928b1d9587"), alt: "Torta de chocolate entera con ganache goteando sobre un pie blanco" },
    ],
    sizes: cakeSizes(39000),
    layers: ["Ganache espejado", "Dulce de leche repostero", "Bizcocho de chocolate"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
  },
  {
    slug: "carrot-cake",
    name: "Carrot Cake",
    tagline: "Especiada, húmeda, con nueces.",
    description: "Bizcocho de zanahoria y especias con frosting de queso crema.",
    story:
      "Zanahoria rallada a mano, canela, jengibre y nuez moscada, nueces tostadas y frosting de queso crema. Mejor al día siguiente, si sobrevive.",
    category: "tortas",
    occasions: ["regalo", "porque-si"],
    photos: [
      { src: photo("1566121933407-3c7ccdd26763"), alt: "Porción de carrot cake con frosting de queso crema servida con pala" },
    ],
    sizes: cakeSizes(40000),
    layers: ["Frosting de queso crema", "Bizcocho de zanahoria", "Nueces tostadas"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Frutos secos"],
    leadTime: LEAD.cake,
  },

  // ——— Cheesecakes ———
  {
    slug: "cheesecake-new-york",
    name: "Cheesecake New York",
    tagline: "Denso, cremoso, honesto.",
    description: "Horneado lento sobre base de galleta de manteca, con frutos del bosque.",
    story:
      "Queso crema, vainilla y paciencia: lo horneamos a baja temperatura durante dos horas y lo dejamos reposar toda la noche. Se sirve con una compota corta de frutos del bosque.",
    category: "cheesecakes",
    occasions: ["regalo", "porque-si", "cumpleanos"],
    photos: [
      { src: photo("1524351199678-941a58a3df50"), alt: "Porción de cheesecake con frutos rojos sobre plato negro" },
    ],
    sizes: tartSizes(36000),
    layers: ["Frutos del bosque", "Crema de queso horneada", "Base de galleta de manteca"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
    badge: "Más pedido",
    featured: 4,
  },
  {
    slug: "cheesecake-vasco",
    name: "Cheesecake Vasco",
    tagline: "Quemado por fuera, fluido por dentro.",
    description: "Horno muy fuerte, superficie caramelizada y centro casi líquido.",
    story:
      "La receta de San Sebastián, sin base y sin miedo al horno. Superficie tostada, casi amarga, y un corazón que tiembla al cortarlo.",
    category: "cheesecakes",
    occasions: ["porque-si", "regalo"],
    photos: [
      { src: photo("1759303380841-55c09244fd2b"), alt: "Porción de cheesecake vasco con superficie quemada" },
    ],
    sizes: tartSizes(37000),
    layers: ["Superficie caramelizada", "Crema de queso fluida"],
    allergens: ["Huevo", "Lácteos"],
    leadTime: LEAD.cake,
    badge: "Nuevo",
    featured: 6,
  },
  {
    slug: "cheesecake-de-arandanos",
    name: "Cheesecake de Arándanos",
    tagline: "Con compota de arándanos enteros.",
    description: "Cheesecake horneado coronado con arándanos glaseados.",
    story:
      "Nuestro cheesecake clásico bajo una capa generosa de arándanos cocidos apenas, para que revienten en la boca.",
    category: "cheesecakes",
    occasions: ["regalo", "cumpleanos"],
    photos: [
      { src: photo("1567171466295-4afa63d45416"), alt: "Porción de cheesecake con arándanos glaseados encima" },
      { src: photo("1779282833204-076de40e621f"), alt: "Cheesecake entero con cobertura de arándanos y una porción cortada" },
    ],
    sizes: tartSizes(38000),
    layers: ["Arándanos glaseados", "Crema de queso", "Base de galleta"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
  },
  {
    slug: "cheesecake-pistacho-y-rosas",
    name: "Pistacho y Rosas",
    tagline: "Pistacho siciliano y pétalos secos.",
    description: "Cheesecake frío de pistacho sobre base crocante, con pétalos de rosa.",
    story:
      "Pasta pura de pistacho, queso crema y una base crocante de pistachos tostados. Terminado con pétalos de rosa deshidratados. Floral, verde y muy nuestro.",
    category: "cheesecakes",
    occasions: ["aniversario", "regalo"],
    photos: [
      { src: photo("1716579862099-acd0967de37b"), alt: "Cheesecake de pistacho decorado con pétalos de rosa secos" },
      { src: photo("1716579866950-54abe7d4286f"), alt: "Porción de cheesecake de pistacho con tenedor" },
    ],
    sizes: tartSizes(42000),
    layers: ["Pétalos de rosa", "Crema de pistacho", "Base de pistacho tostado"],
    allergens: ["Lácteos", "Frutos secos", "Gluten"],
    leadTime: LEAD.cake,
    badge: "Firma de la casa",
    featured: 5,
  },
  {
    slug: "mousse-de-limon",
    name: "Mousse de Limón",
    tagline: "Fresca, cítrica, sin hornear.",
    description: "Base de galleta, mousse de limón y crema de queso aireada.",
    story:
      "Limones de Tucumán, ralladura fresca y una mousse que se sostiene apenas. Ideal para después de un almuerzo largo.",
    category: "cheesecakes",
    occasions: ["porque-si", "regalo"],
    photos: [
      { src: photo("1728911296471-8c57f645a44e"), alt: "Mousse de limón sobre pie blanco con limones alrededor" },
    ],
    sizes: tartSizes(34000),
    layers: ["Curd de limón", "Mousse de queso", "Base de galleta"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
    badge: "De temporada",
  },

  // ——— Tartas ———
  {
    slug: "lemon-pie",
    name: "Lemon Pie",
    tagline: "Merengue italiano flameado al soplete.",
    description: "Masa sablée, curd de limón intenso y merengue italiano tostado.",
    story:
      "Masa sablée de manteca, un curd de limón que no pide perdón y un merengue italiano que flameamos al momento de entregar.",
    category: "tartas",
    occasions: ["porque-si", "regalo", "cumpleanos"],
    photos: [
      { src: photo("1534148206-f085ba17015a"), alt: "Tartaleta de limón con merengue en espiral tostado" },
      { src: photo("1786269188368-91104c005a3d"), alt: "Tartaletas de limón con picos de merengue tostado" },
      { src: photo("1764155535434-6cb2fa141e5e"), alt: "Tartas de limón con merengue y flores comestibles" },
    ],
    sizes: tartSizes(32000),
    layers: ["Merengue italiano", "Curd de limón", "Masa sablée"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
    badge: "Más pedido",
  },
  {
    slug: "tarta-de-frambuesas",
    name: "Tarta de Frambuesas",
    tagline: "Frambuesas enteras sobre crema pastelera.",
    description: "Sablée de almendras, crema pastelera de vainilla y frambuesas frescas.",
    story:
      "Una tarta francesa sin trucos: masa de almendras, crema pastelera con vaina de vainilla y frambuesas acomodadas a mano, una por una.",
    category: "tartas",
    occasions: ["aniversario", "regalo"],
    photos: [{ src: photo("1611338075094-a2926b902fc0"), alt: "Tarta de frambuesas frescas sobre plato blanco" }],
    sizes: tartSizes(35000),
    layers: ["Frambuesas frescas", "Crema pastelera", "Sablée de almendras"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Frutos secos"],
    leadTime: LEAD.daily,
  },
  {
    slug: "tarta-de-chocolate",
    name: "Tarta de Chocolate",
    tagline: "Ganache horneado, textura de trufa.",
    description: "Masa de cacao y ganache horneado con flor de sal.",
    story:
      "Masa de cacao fina y un ganache que se hornea apenas para quedar como una trufa grande. Unos cristales de flor de sal al final.",
    category: "tartas",
    occasions: ["aniversario", "porque-si"],
    photos: [
      { src: photo("1616031037011-087000171abe"), alt: "Tarta de chocolate con una porción cortada" },
      { src: photo("1626803775151-61d756612f97"), alt: "Tarta de chocolate decorada con higos, frutos rojos y pistacho" },
    ],
    sizes: tartSizes(33000),
    layers: ["Flor de sal", "Ganache horneado", "Masa de cacao"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
  },
  {
    slug: "tarta-de-frutas",
    name: "Tarta de Frutas",
    tagline: "Lo mejor del mercado de la semana.",
    description: "Crema pastelera y fruta fresca de estación, con brillo de damasco.",
    story:
      "Cambia cada semana según lo que encontramos en el mercado. Siempre sobre crema pastelera y masa sablée, siempre con brillo de damasco.",
    category: "tartas",
    occasions: ["cumpleanos", "porque-si"],
    photos: [
      { src: photo("1600477063726-b6b2473e43f9"), alt: "Tarta con frutas frescas variadas y azúcar impalpable" },
    ],
    sizes: tartSizes(31000),
    layers: ["Fruta de estación", "Crema pastelera", "Masa sablée"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
    badge: "De temporada",
  },
  {
    slug: "tarta-de-lima",
    name: "Tarta de Lima",
    tagline: "Ácida, cremosa y geométrica.",
    description: "Crema de lima, merenguitos secos y tejas de manteca.",
    story:
      "Una tarta rectangular de crema de lima con merenguitos secos y tejas crocantes. Más ácida que dulce, para paladares despiertos.",
    category: "tartas",
    occasions: ["regalo", "porque-si"],
    photos: [
      { src: photo("1774119729324-a43894d5649c"), alt: "Tarta rectangular de lima con merenguitos y gajos de lima" },
    ],
    sizes: [
      { id: "individual", label: "Rectangular", serves: "8 porciones", price: 34000 },
    ],
    layers: ["Merenguitos secos", "Crema de lima", "Masa sablée"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
    badge: "Nuevo",
  },

  // ——— Individuales ———
  {
    slug: "tiramisu",
    name: "Tiramisú",
    tagline: "Café de especialidad y mascarpone.",
    description: "Vainillas embebidas en espresso, crema de mascarpone y cacao amargo.",
    story:
      "Espresso de especialidad, mascarpone batido con yemas y una lluvia de cacao amargo. Lo armamos en porciones para que llegue perfecto.",
    category: "individuales",
    occasions: ["porque-si", "regalo"],
    photos: [
      { src: photo("1724116379273-ba32b70d112c"), alt: "Porción de tiramisú con cacao espolvoreado" },
      { src: photo("1571877227200-a0d98ea607e9"), alt: "Tiramisú decorado sobre plato de cerámica" },
    ],
    sizes: boxSizes(6500, "porciones"),
    layers: ["Cacao amargo", "Crema de mascarpone", "Vainillas al espresso"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Cafeína"],
    leadTime: LEAD.daily,
  },
  {
    slug: "petit-frutilla",
    name: "Petit Frutilla",
    tagline: "Mousse de frutilla en miniatura.",
    description: "Pequeños entremets de mousse de frutilla con frutos frescos.",
    story:
      "Mousse de frutilla, corazón de frambuesa y un glaseado rosa satinado, coronados con fruta fresca. Para regalar en caja.",
    category: "individuales",
    occasions: ["regalo", "aniversario"],
    photos: [
      { src: photo("1530648672449-81f6c723e2f1"), alt: "Pastelitos cuadrados rosados con frutillas y arándanos encima" },
    ],
    sizes: boxSizes(5800),
    layers: ["Glaseado satinado", "Mousse de frutilla", "Corazón de frambuesa", "Bizcocho"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
    badge: "Nuevo",
  },
  {
    slug: "tartaletas-de-pistacho",
    name: "Tartaletas de Pistacho",
    tagline: "Pistacho y frutos rojos en dos bocados.",
    description: "Sablée, cremoso de frutos rojos y crema de pistacho a la manga.",
    story:
      "Una base sablée, un cremoso ácido de frutos rojos y una espiral de crema de pistacho. Pequeñas, serias, adictivas.",
    category: "individuales",
    occasions: ["regalo", "porque-si"],
    photos: [
      { src: photo("1702745284678-2ae974a7f0aa"), alt: "Tartaletas con crema de pistacho y pistachos picados" },
    ],
    sizes: boxSizes(4900),
    layers: ["Crema de pistacho", "Cremoso de frutos rojos", "Sablée"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Frutos secos"],
    leadTime: LEAD.daily,
  },
  {
    slug: "milhojas-de-frutos-rojos",
    name: "Milhojas de Frutos Rojos",
    tagline: "Capas finas, fruta brillante.",
    description: "Bizcocho joconde, crema diplomática y frutos rojos glaseados.",
    story:
      "Capas finísimas de bizcocho joconde y crema diplomática, con un espejo de frutos rojos y fruta fresca arriba.",
    category: "individuales",
    occasions: ["aniversario", "regalo"],
    photos: [
      { src: photo("1761637604927-e3656dc81383"), alt: "Porción en capas con frutos rojos frescos sobre plato" },
    ],
    sizes: boxSizes(6200, "porciones"),
    layers: ["Frutos rojos frescos", "Espejo de frutos rojos", "Crema diplomática", "Bizcocho joconde"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Frutos secos"],
    leadTime: LEAD.daily,
  },
  {
    slug: "caja-de-tartaletas",
    name: "Caja de Tartaletas",
    tagline: "Seis sabores, una caja.",
    description: "Surtido de tartaletas de frutos rojos, kiwi, arándanos y manzana.",
    story:
      "La caja para no elegir: frambuesa, arándano, kiwi, frutilla y rosas de manzana, todas sobre crema pastelera.",
    category: "individuales",
    occasions: ["cumpleanos", "regalo", "porque-si"],
    photos: [
      { src: photo("1670819916757-e8d5935a6c65"), alt: "Tartaletas surtidas de frutas vistas desde arriba sobre fondo oscuro" },
    ],
    sizes: boxSizes(4500),
    layers: ["Fruta fresca", "Crema pastelera", "Sablée"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
    badge: "Más pedido",
  },
  {
    slug: "mini-red-velvet",
    name: "Mini Red Velvet",
    tagline: "Una torta entera, para dos.",
    description: "Red velvet de dos pisos con frutillas, arándanos y flores comestibles.",
    story:
      "Todo lo de nuestra red velvet en 12 centímetros: para un aniversario, una sorpresa o una noche cualquiera.",
    category: "individuales",
    occasions: ["aniversario", "regalo"],
    photos: [
      { src: photo("1687877858381-e98c32796861"), alt: "Mini torta red velvet con frutillas, arándanos y flores" },
    ],
    sizes: [{ id: "12cm", label: "12 cm", serves: "2–3 porciones", price: 19500 }],
    layers: ["Fruta y flores comestibles", "Frosting de queso", "Bizcocho red velvet"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.daily,
  },

  // ——— Celebración ———
  {
    slug: "pastel-de-celebracion",
    name: "Chocolate con Bengalas",
    tagline: "Para soplar, cantar y repetir.",
    description: "Chocolate intenso coronado con frutos rojos y bengala de regalo.",
    story:
      "Bizcocho de chocolate, ganache y frutos rojos. La enviamos con bengala y velas para que solo tengas que encender.",
    category: "celebracion",
    occasions: ["cumpleanos"],
    photos: [
      { src: photo("1559553156-2e97137af16f"), alt: "Torta de chocolate con frutos rojos y una bengala encendida" },
      { src: photo("1610670444950-0b29430891b4"), alt: "Torta de chocolate con velas encendidas sobre fondo oscuro" },
    ],
    sizes: cakeSizes(45000),
    layers: ["Frutos rojos", "Ganache", "Bizcocho de chocolate"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
  },
  {
    slug: "arcoiris",
    name: "Arcoíris",
    tagline: "Seis colores escondidos adentro.",
    description: "Seis capas de vainilla de colores y cobertura de confites.",
    story:
      "Desde afuera, una torta de confites. Al cortarla, seis capas de bizcocho de vainilla de colores naturales. El grito está garantizado.",
    category: "celebracion",
    occasions: ["cumpleanos"],
    photos: [
      { src: photo("1464349095431-e9a21285b5f3"), alt: "Torta de capas de colores cubierta de confites con una porción cortada" },
    ],
    sizes: cakeSizes(43000),
    layers: ["Confites", "Buttercream de vainilla", "Seis bizcochos de colores"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
  },
  {
    slug: "confetti-aqua",
    name: "Confetti Aqua",
    tagline: "Turquesa, rosa y mucha fiesta.",
    description: "Buttercream turquesa, rosetas rosadas y base de confites.",
    story:
      "Una torta de vainilla y dulce de leche con buttercream turquesa liso, rosetas a la manga y un cinturón de confites. Personalizamos los colores.",
    category: "celebracion",
    occasions: ["cumpleanos"],
    photos: [
      { src: photo("1604413191066-4dd20bedf486"), alt: "Torta turquesa con rosetas rosadas y confites sobre pie blanco" },
    ],
    sizes: cakeSizes(44000),
    layers: ["Rosetas de buttercream", "Dulce de leche", "Bizcocho de vainilla"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.cake,
  },

  // ——— Bodas y eventos ———
  {
    slug: "naked-cake-floral",
    name: "Naked Cake Floral",
    tagline: "Al desnudo, con flores comestibles.",
    description: "Bizcocho a la vista, crema de vainilla y flores comestibles.",
    story:
      "El encanto de lo imperfecto: bizcocho de vainilla a la vista, crema batida y flores comestibles elegidas para tu paleta.",
    category: "bodas",
    occasions: ["boda", "aniversario"],
    photos: [
      { src: photo("1704358826048-04d97dde2f96"), alt: "Torta blanca decorada con flores delicadas" },
    ],
    sizes: tierSizes(240000),
    layers: ["Flores comestibles", "Crema de vainilla", "Bizcocho de vainilla"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.event,
  },
  {
    slug: "jardin-de-rosas",
    name: "Jardín de Rosas",
    tagline: "Rosas frescas y buttercream sedoso.",
    description: "Pisos de buttercream liso con rosas, peonías y frutos rojos.",
    story:
      "Pisos de buttercream suizo liso, cascadas de rosas y peonías frescas y frutos rojos. La diseñamos con tu florista.",
    category: "bodas",
    occasions: ["boda"],
    photos: [
      { src: photo("1623428454614-abaf00244e52"), alt: "Torta de bodas blanca con frutillas, rosas y peonías" },
      { src: photo("1535254973040-607b474cb50d"), alt: "Torta de cuatro pisos decorada con rosas en tonos pastel" },
    ],
    sizes: tierSizes(290000),
    layers: ["Rosas y peonías", "Buttercream suizo", "Bizcocho a elección"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.event,
    badge: "Firma de la casa",
  },
  {
    slug: "naked-de-higos",
    name: "Naked de Higos",
    tagline: "Higos, pistacho y olivo.",
    description: "Naked cake con higos frescos, pétalos y ramas de olivo.",
    story:
      "Una torta de campo: bizcocho de miel y almendras, crema de mascarpone, higos frescos y un cinturón de pistachos y pétalos.",
    category: "bodas",
    occasions: ["boda", "aniversario"],
    photos: [
      { src: photo("1565661834013-d196ca46e14e"), alt: "Naked cake de dos pisos con higos, pistachos y ramas de olivo" },
    ],
    sizes: tierSizes(265000),
    layers: ["Higos frescos", "Crema de mascarpone", "Bizcocho de miel y almendras"],
    allergens: ["Gluten", "Huevo", "Lácteos", "Frutos secos"],
    leadTime: LEAD.event,
    badge: "De temporada",
  },
  {
    slug: "lirios-blancos",
    name: "Lirios Blancos",
    tagline: "Blanco sobre blanco.",
    description: "Pisos texturizados a espátula con calas de azúcar.",
    story:
      "Cuatro pisos texturizados a espátula, sin un solo color, y calas modeladas en pasta de azúcar. Para bodas que se escriben en minúscula.",
    category: "bodas",
    occasions: ["boda"],
    photos: [
      { src: photo("1771305145464-01a595836294"), alt: "Torta de bodas blanca de varios pisos con calas sobre pie dorado" },
    ],
    sizes: tierSizes(310000),
    layers: ["Calas de azúcar", "Buttercream texturizado", "Bizcocho a elección"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.event,
  },
  {
    slug: "naked-silvestre",
    name: "Naked Silvestre",
    tagline: "Flores de jardín y bizcocho a la vista.",
    description: "Tres pisos semidesnudos con flores frescas de estación.",
    story:
      "Tres pisos semidesnudos, crema apenas pasada y flores de estación. Rústica, romántica y fácil de amar.",
    category: "bodas",
    occasions: ["boda", "aniversario"],
    photos: [
      { src: photo("1519654793190-2e8a4806f1f2"), alt: "Naked cake de tres pisos con rosas y flores lilas" },
      { src: photo("1542007920-992d2c424d09"), alt: "Naked cake con flores rojas y rosadas y caramelo cayendo" },
    ],
    sizes: tierSizes(250000),
    layers: ["Flores frescas", "Crema batida", "Bizcocho a elección"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.event,
  },
  {
    slug: "torre-de-mini-cakes",
    name: "Torre de Mini Cakes",
    tagline: "Una torta para cada invitado.",
    description: "Torre de mini naked cakes con flores, para mesas dulces.",
    story:
      "En vez de cortar, cada invitado se lleva la suya. Mini naked cakes de tres sabores en una torre coronada por una torta de corte.",
    category: "bodas",
    occasions: ["boda", "cumpleanos"],
    photos: [
      { src: photo("1522057384400-681b421cfebc"), alt: "Torre de mini tortas desnudas decoradas con flores" },
    ],
    sizes: [
      { id: "40", label: "40 mini cakes", serves: "+ torta de corte", price: 330000 },
      { id: "80", label: "80 mini cakes", serves: "+ torta de corte", price: 590000 },
    ],
    layers: ["Mini cakes de 3 sabores", "Flores frescas", "Torta de corte"],
    allergens: ["Gluten", "Huevo", "Lácteos"],
    leadTime: LEAD.event,
    badge: "Nuevo",
  },
];

export const CATEGORIES: { id: Category; label: string; plural: string }[] = [
  { id: "tortas", label: "Tortas", plural: "Tortas" },
  { id: "cheesecakes", label: "Cheesecakes", plural: "Cheesecakes" },
  { id: "tartas", label: "Tartas", plural: "Tartas" },
  { id: "individuales", label: "Individuales", plural: "Individuales y cajas" },
  { id: "celebracion", label: "Celebración", plural: "Tortas de celebración" },
  { id: "bodas", label: "Bodas", plural: "Bodas y eventos" },
];

export const OCCASIONS: { id: Occasion; label: string }[] = [
  { id: "cumpleanos", label: "Cumpleaños" },
  { id: "boda", label: "Boda" },
  { id: "aniversario", label: "Aniversario" },
  { id: "regalo", label: "Para regalar" },
  { id: "porque-si", label: "Porque sí" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function fromPrice(product: Product) {
  return Math.min(...product.sizes.map((s) => s.price));
}

export function featuredProducts() {
  return products
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}

export function relatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const sharedOccasion = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.category !== product.category &&
      p.occasions.some((o) => product.occasions.includes(o)),
  );
  return [...sameCategory, ...sharedOccasion].slice(0, limit);
}

export function categoryLabel(id: Category) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
