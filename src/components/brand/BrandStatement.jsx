import SectionReveal from "@/components/ui/SectionReveal";

export default function BrandStatement() {
  return (
    <SectionReveal
      id="story"
      aria-labelledby="brand-statement-heading"
      className="border-b border-border"
    >
      <div className="container-zenji py-20 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-meta">
              The Zenji Code
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              01
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="brand-statement-heading"
              className="font-display text-[clamp(3rem,11vw,7rem)] text-foreground"
            >
              Not Merch.
              <br />
              A Uniform.
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-muted sm:mt-10 sm:text-lg">
              Built for the people who move between worlds. Anime influence.
              Street culture. Australian perspective.
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
