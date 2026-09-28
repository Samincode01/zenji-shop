import BrandStatement from "@/components/brand/BrandStatement";
import FinalCTA from "@/components/brand/FinalCTA";
import Footer from "@/components/Footer";
import HeroGallery from "@/components/hero/HeroGallery";
import Marquee from "@/components/Marquee";
import ProductSection from "@/components/products/ProductSection";
import ReviewsSection from "@/components/reviews/ReviewsSection";

export default function HomePage() {
  return (
    <>
      <main className="flex-1 pt-[var(--nav-height)]">
        <HeroGallery />
        <Marquee />
        <ProductSection />
        <ReviewsSection />
        <BrandStatement />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
