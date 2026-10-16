export type Category =
  | "tortas"
  | "cheesecakes"
  | "tartas"
  | "individuales"
  | "celebracion"
  | "bodas";

export type Occasion = "cumpleanos" | "boda" | "aniversario" | "regalo" | "porque-si";

export type Photo = {
  src: string;
  alt: string;
};

export type Size = {
  id: string;
  label: string;
  serves: string;
  price: number;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  category: Category;
  occasions: Occasion[];
  photos: Photo[];
  sizes: Size[];
  layers: string[];
  allergens: string[];
  leadTime: string;
  badge?: "Más pedido" | "Nuevo" | "De temporada" | "Firma de la casa";
  featured?: number;
};

export type CartItem = {
  key: string;
  product: Product;
  size: Size;
  qty: number;
};
