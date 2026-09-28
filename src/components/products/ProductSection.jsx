import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import SectionReveal from "@/components/ui/SectionReveal";
import { products } from "@/data/products";

export default function ProductSection() {
  const pieceCount = String(products.length).padStart(2, "0");

  return (
    <SectionReveal
      id="collection"
      aria-labelledby="featured-drop-heading"
      className="border-b border-border"
    >
      <div className="container-zenji py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-meta mb-6">
              Drop 01
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              2026
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              {pieceCount} Pieces
            </p>

            <p className="text-meta mb-4 text-accent">Featured Drop</p>

            <h2
              id="featured-drop-heading"
              className="font-display text-[clamp(3rem,10vw,6.5rem)] text-foreground"
            >
              The New
              <br />
              Uniform.
            </h2>
          </div>

          <div className="flex max-w-md flex-col gap-8 lg:col-span-5 lg:justify-self-end lg:pb-2">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              A limited collection of anime-inspired streetwear, designed in
              Australia and built for everyday movement.
            </p>

            <Link
              href="/#shop"
              className="group inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>View All Pieces</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div
          id="shop"
          className="mt-16 grid gap-x-8 gap-y-14 sm:mt-20 sm:gap-x-10 sm:gap-y-16 lg:mt-24 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-20"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
