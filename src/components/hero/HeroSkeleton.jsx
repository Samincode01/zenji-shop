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
      <div className="container-zenji grid flex-1 gap-8 py-8 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:py-10">
        <div className="flex flex-col justify-center gap-6 lg:col-span-5 lg:py-8">
          <div className="skeleton h-3 w-36" />
          <div className="space-y-3">
            <div className="skeleton h-14 w-[88%] max-w-sm" />
            <div className="skeleton h-14 w-[72%] max-w-xs" />
            <div className="skeleton h-14 w-[64%] max-w-[14rem]" />
          </div>
          <div className="skeleton mt-2 h-4 w-64 max-w-full" />
          <div className="skeleton mt-4 h-3 w-40" />
        </div>

        <div className="relative min-h-[22rem] overflow-hidden bg-surface lg:col-span-7 lg:min-h-0">
          <div className="skeleton absolute inset-0" />
        </div>
      </div>

      <div className="container-zenji flex items-center gap-6 border-t border-border py-5">
        <div className="skeleton h-3 w-12" />
        <div className="skeleton h-px flex-1" />
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-px flex-1" />
        <div className="skeleton h-3 w-12" />
      </div>
    </section>
  );
}
