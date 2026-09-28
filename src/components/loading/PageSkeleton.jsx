import HeroSkeleton from "@/components/hero/HeroSkeleton";
import ProductSkeleton from "@/components/products/ProductSkeleton";

function NavSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[var(--nav-height)] items-center justify-between border-b border-border px-[clamp(1rem,4vw,3rem)]"
    >
      <div className="skeleton h-7 w-24" />
      <div className="hidden items-center gap-8 lg:flex">
        <div className="skeleton h-3 w-14" />
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-3 w-14" />
      </div>
      <div className="flex items-center gap-3">
        <div className="skeleton h-5 w-9" />
        <div className="skeleton h-3 w-14" />
        <div className="skeleton h-3 w-12 lg:hidden" />
      </div>
    </div>
  );
}

export default function PageSkeleton() {
  return (
    <div
      className="min-h-svh bg-background text-foreground"
      role="status"
      aria-busy="true"
      aria-label="Loading ZENJI"
    >
      <span className="sr-only">Loading ZENJI storefront</span>
      <NavSkeleton />
      <div className="pt-0">
        <HeroSkeleton />
      </div>
      <div className="container-zenji border-t border-border py-16 sm:py-20">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="skeleton h-3 w-40" />
            <div className="skeleton h-3 w-28" />
            <div className="skeleton h-16 w-full max-w-md" />
            <div className="skeleton h-16 w-3/4 max-w-sm" />
          </div>
          <div className="space-y-4 lg:col-span-5">
            <div className="skeleton h-4 w-full max-w-sm" />
            <div className="skeleton h-4 w-4/5 max-w-xs" />
            <div className="skeleton mt-4 h-3 w-36" />
          </div>
        </div>
        <div className="grid gap-x-8 gap-y-14 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-2 lg:gap-x-14">
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      </div>
    </div>
  );
}
