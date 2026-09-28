import BrandStatement from "@/components/brand/BrandStatement";
import CampaignImage from "@/components/brand/CampaignImage";
import HeroGallery from "@/components/hero/HeroGallery";
import Marquee from "@/components/Marquee";
import ProductSection from "@/components/products/ProductSection";

export default function HomePage() {
  return (
    <main className="flex-1 pt-[var(--nav-height)]">
      <HeroGallery />
      <Marquee />
      <ProductSection />
      <BrandStatement />
      <CampaignImage />
    </main>
  );
}
