import { Hero } from "@/components/hero";
import { OccasionsSection } from "@/components/occasions-section";
import { FeaturedProduct } from "@/components/featured-product";
import { Bestsellers } from "@/components/bestsellers";
import { ProcessSection } from "@/components/process-section";
import { CakeDna } from "@/components/cake-dna";
import { Commissions } from "@/components/commissions";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <OccasionsSection />
      <FeaturedProduct />
      <Bestsellers />
      <ProcessSection />
      <CakeDna />
      <Commissions />
      <Testimonials />
      <FinalCta />
    </main>
  );
}
