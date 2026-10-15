import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { MoodSection } from "@/components/mood-section";
import { FeaturedProduct } from "@/components/featured-product";
import { Catalog } from "@/components/catalog";
import { ProcessSection } from "@/components/process-section";
import { CakeDna } from "@/components/cake-dna";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <CartProvider>
      <Nav />
      <CartDrawer />
      <main>
        <Hero />
        <MoodSection />
        <FeaturedProduct />
        <Catalog />
        <ProcessSection />
        <CakeDna />
        <Testimonials />
        <FinalCta />
      </main>
    </CartProvider>
  );
}
