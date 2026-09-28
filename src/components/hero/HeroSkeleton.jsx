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
        <div className="grid flex-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="order-1 flex flex-col justify-center lg:col-span-5">
            <div className="skeleton mb-5 h-3 w-40 sm:mb-6" />
            <div className="space-y-3">
              <div className="skeleton h-12 w-[90%] max-w-sm sm:h-14" />
              <div className="skeleton h-12 w-[75%] max-w-xs sm:h-14" />
              <div className="skeleton h-12 w-[62%] max-w-[14rem] sm:h-14" />
            </div>
            <div className="mt-8 hidden flex-col gap-8 lg:flex">
              <div className="skeleton h-4 w-full max-w-sm" />
              <div className="skeleton h-3 w-36" />
            </div>
          </div>

          <div className="relative order-2 min-h-[24rem] overflow-hidden bg-surface sm:min-h-[32rem] lg:col-span-7 lg:min-h-[min(38rem,calc(100svh-10rem))]">
            <div className="skeleton absolute inset-0" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <div className="skeleton h-11 w-11" />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="skeleton h-11 w-11" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 pb-4">
              <div className="skeleton h-3 w-14" />
              <div className="skeleton h-px w-24" />
            </div>
          </div>

          <div className="order-3 flex flex-col gap-6 lg:hidden">
            <div className="skeleton h-4 w-full max-w-sm" />
            <div className="skeleton h-3 w-36" />
          </div>
        </div>
      </div>
    </section>
  );
}
