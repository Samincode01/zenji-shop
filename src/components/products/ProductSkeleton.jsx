import { cn } from "@/lib/utils";

export default function ProductSkeleton({ className }) {
  return (
    <article
      aria-hidden="true"
      className={cn("flex flex-col gap-5 sm:gap-6", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <div className="skeleton absolute inset-0" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="skeleton h-3 w-28" />
          <div className="flex items-baseline justify-between gap-4">
            <div className="skeleton h-8 w-2/3 max-w-[14rem]" />
            <div className="skeleton h-4 w-20" />
          </div>
        </div>

        <div>
          <div className="skeleton mb-3 h-3 w-24" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="skeleton h-11 w-11"
              />
            ))}
          </div>
        </div>

        <div className="skeleton mt-1 h-3 w-32" />
      </div>
    </article>
  );
}
