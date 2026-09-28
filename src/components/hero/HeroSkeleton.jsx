import { cn } from "@/lib/utils";

export default function HeroSkeleton({ className }) {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative flex min-h-[calc(100svh-var(--nav-height))] flex-col",
        className,
      )}
    >
      <div className="container-zenji flex flex-1 flex-col py-8 lg:py-10">
        <div className="grid flex-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Text column: eyebrow + headline (+ desktop copy/cta) */}
          <div className="order-1 flex flex-col justify-center lg:order-none lg:col-span-5 lg:py-6">
            <div className="skeleton mb-5 h-3 w-40 sm:mb-6" />
            <div className="space-y-3">
              <div className="skeleton h-12 w-[90%] max-w-sm sm:h-14" />
              <div className="skeleton h-12 w-[75%] max-w-xs sm:h-14" />
              <div className="skeleton h-12 w-[62%] max-w-[14rem] sm:h-14" />
            </div>
            <div className="mt-8 hidden flex-col gap-8 lg:flex">
              <div className="skeleton h-4 w-full max-w-sm" />
              <div className="skeleton h-4 w-3/4 max-w-xs" />
              <div className="skeleton mt-2 h-3 w-36" />
            </div>
          </div>

          {/* Image */}
          <div className="relative order-2 min-h-[24rem] overflow-hidden bg-surface sm:min-h-[30rem] lg:order-none lg:col-span-7 lg:min-h-[min(36rem,calc(100svh-12rem))]">
            <div className="skeleton absolute inset-0" />
          </div>

          {/* Mobile copy + CTA */}
          <div className="order-3 flex flex-col gap-6 lg:hidden">
            <div className="skeleton h-4 w-full max-w-sm" />
            <div className="skeleton h-4 w-4/5 max-w-xs" />
            <div className="skeleton mt-2 h-3 w-36" />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 border-t border-border py-4 sm:gap-6 sm:py-5 lg:mt-10">
          <div className="skeleton h-3 w-12" />
          <div className="skeleton h-px flex-1" />
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-px flex-1" />
          <div className="skeleton h-3 w-12" />
        </div>
      </div>
    </section>
  );
}
