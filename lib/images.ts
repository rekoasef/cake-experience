// Real photography sourced from Unsplash (images.unsplash.com), used under the
// Unsplash License. Every image below was downloaded and visually verified before
// use (earlier passes caught a 3D virus render, a branded torte and a coconut
// among automated results — nothing here ships unverified). Sizing and quality
// are negotiated per breakpoint by lib/image-loader.ts, so URLs carry no params.
import { photo } from "./products";

export const images = {
  heroFlavors: {
    chocolate: {
      src: photo("1518091128136-3b02100d789a"),
      alt: "Porción dramática de torta de chocolate con quenelles de crema y hoja de oro",
      slug: "trufa-de-chocolate",
      name: "Trufa de Chocolate",
    },
    redVelvet: {
      src: photo("1714949134591-d6f2c581b20d"),
      alt: "Porción de red velvet con frosting de queso y una frutilla",
      slug: "red-velvet",
      name: "Red Velvet",
    },
    pistacho: {
      src: photo("1716579862099-acd0967de37b"),
      alt: "Cheesecake de pistacho decorado con pétalos de rosa secos",
      slug: "cheesecake-pistacho-y-rosas",
      name: "Pistacho y Rosas",
    },
    limon: {
      src: photo("1534148206-f085ba17015a"),
      alt: "Tartaleta de limón con merengue italiano en espiral tostado",
      slug: "lemon-pie",
      name: "Lemon Pie",
    },
  },
  featured: {
    src: photo("1772196229845-9addc8cccdee"),
    alt: "Trufa de chocolate en capas dentro de una caja, con ganache brillante",
  },
  occasions: {
    cumpleanos: {
      src: photo("1779103281115-517d7e572855"),
      alt: "Porción de torta con una vela encendida y frambuesas",
    },
    boda: {
      src: photo("1623428454614-abaf00244e52"),
      alt: "Torta de bodas blanca con frutillas, rosas y peonías",
    },
    aniversario: {
      src: photo("1687877858381-e98c32796861"),
      alt: "Mini torta red velvet con frutillas, arándanos y flores",
    },
    regalo: {
      src: photo("1530648672449-81f6c723e2f1"),
      alt: "Pastelitos rosados con frutillas y arándanos",
    },
    "porque-si": {
      src: photo("1724116379273-ba32b70d112c"),
      alt: "Porción de tiramisú con cacao espolvoreado",
    },
  },
  process: {
    base: {
      src: photo("1536599524557-5f784dd53282"),
      alt: "Porciones de bizcocho de vainilla recién horneado, sin decorar",
    },
    cream: {
      src: photo("1567009349827-ab242f2c96e6"),
      alt: "Torta con mousse de chocolate y frambuesas frescas sobre la crema",
    },
    ganache: {
      src: photo("1578985545062-69928b1d9587"),
      alt: "Ganache de chocolate brillante cayendo por los costados de la torta",
    },
    decoration: {
      src: photo("1512223792601-592a9809eed4"),
      alt: "Cacao en polvo cayendo sobre una torta de chocolate terminada",
    },
  },
  cakeDna: {
    src: photo("1557925923-33b27f891f88"),
    alt: "Torta al desnudo mostrando sus capas de bizcocho y crema, coronada con frambuesas",
  },
  commissions: [
    {
      src: photo("1535254973040-607b474cb50d"),
      alt: "Torta de cuatro pisos cubierta de rosas en tonos pastel",
      caption: "Boda en Funes · 4 pisos",
      aspect: "portrait",
    },
    {
      src: photo("1464349095431-e9a21285b5f3"),
      alt: "Torta arcoíris de seis capas cubierta de confites",
      caption: "Cumpleaños de 7 · Arcoíris",
      aspect: "landscape",
    },
    {
      src: photo("1565661834013-d196ca46e14e"),
      alt: "Naked cake con higos, pistachos y ramas de olivo",
      caption: "Casamiento de campo · Higos",
      aspect: "portrait",
    },
    {
      src: photo("1764380746142-b35392fe7428"),
      alt: "Torta blanca de tres pisos con guirnaldas de crema y cerezas",
      caption: "Aniversario 25 · Vintage",
      aspect: "square",
    },
    {
      src: photo("1522057384400-681b421cfebc"),
      alt: "Torre de mini naked cakes decorada con flores",
      caption: "Mesa dulce · 60 mini cakes",
      aspect: "portrait",
    },
    {
      src: photo("1604413191066-4dd20bedf486"),
      alt: "Torta turquesa con rosetas rosadas y confites",
      caption: "Baby shower · Aqua",
      aspect: "square",
    },
    {
      src: photo("1535141192574-5d4897c12636"),
      alt: "Torta de tres pisos con frutillas y arándanos espolvoreados",
      caption: "Brunch de bodas · Frutos rojos",
      aspect: "landscape",
    },
    {
      src: photo("1519654793190-2e8a4806f1f2"),
      alt: "Naked cake de tres pisos con rosas y flores lilas",
      caption: "Civil íntimo · Silvestre",
      aspect: "portrait",
    },
  ],
  testimonials: [
    {
      name: "Andrea K.",
      occasion: "Cumpleaños · Trufa de Chocolate",
      quote:
        "La torta superó todas mis expectativas. Absolutamente deliciosa y presentada de forma exquisita.",
      avatar: photo("1499651681375-8afc5a4db253"),
    },
    {
      name: "Lucía M.",
      occasion: "Aniversario · Pistacho y Rosas",
      quote: "Cada bocado se sintió como una celebración. La mejor torta que probé en mi vida.",
      avatar: photo("1494790108377-be9c29b29330"),
    },
    {
      name: "Carlos P.",
      occasion: "Oficina · Caja de Tartaletas",
      quote: "Sabor increíble, diseño espectacular y muy fresca. Totalmente recomendada.",
      avatar: photo("1651684215020-f7a5b6610f23"),
    },
    {
      name: "Sofía R.",
      occasion: "Boda · Jardín de Rosas",
      quote:
        "Nos ayudaron a diseñar la torta con nuestra florista. Los invitados todavía hablan de ella.",
      avatar: photo("1544005313-94ddf0286df2"),
    },
  ],
  finalCta: {
    src: photo("1533060297263-15151706e239"),
    alt: "Escena cálida y oscura de una torta de chocolate con velas encendidas sobre la mesa",
  },
};
