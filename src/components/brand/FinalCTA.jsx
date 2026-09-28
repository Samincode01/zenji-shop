import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";

export default function FinalCTA() {
  return (
    <SectionReveal
      aria-labelledby="final-cta-heading"
      className="border-b border-border"
    >
      <div className="container-zenji py-20 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-meta mb-6">
              Final Frame
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              03
            </p>

            <h2
              id="final-cta-heading"
              className="font-display text-[clamp(3rem,11vw,6.5rem)] text-foreground"
            >
              Ready To Wear
              <br />
              Your Story?
            </h2>
          </div>

          <div className="flex max-w-md flex-col gap-8 lg:col-span-5 lg:justify-self-end lg:pb-2">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Explore the collection and find the pieces that become part of
              your uniform.
            </p>

            <Link
              href="/#shop"
              className="group inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>Shop the Collection</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
