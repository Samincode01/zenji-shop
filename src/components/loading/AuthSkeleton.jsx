export default function AuthSkeleton() {
  return (
    <div
      className="min-h-svh bg-background text-foreground"
      role="status"
      aria-busy="true"
      aria-label="Loading account page"
    >
      <span className="sr-only">Loading ZENJI account page</span>

      <div
        aria-hidden="true"
        className="flex h-[var(--nav-height)] items-center justify-between px-[clamp(1rem,4vw,3rem)]"
      >
        <div className="skeleton h-7 w-24" />
        <div className="flex items-center gap-3">
          <div className="skeleton h-5 w-9" />
          <div className="skeleton h-3 w-28" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="grid min-h-[calc(100svh-var(--nav-height))] lg:grid-cols-2"
      >
        <div className="relative hidden overflow-hidden bg-surface md:block">
          <div className="skeleton absolute inset-0" />
        </div>

        <div className="flex flex-col justify-center px-[clamp(1.25rem,6vw,4rem)] py-12 sm:py-16">
          <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-surface md:hidden">
            <div className="skeleton absolute inset-0" />
          </div>

          <div className="skeleton mb-4 h-3 w-32" />
          <div className="space-y-3">
            <div className="skeleton h-14 w-[80%] max-w-xs" />
            <div className="skeleton h-14 w-[55%] max-w-[12rem]" />
          </div>
          <div className="mt-6 skeleton h-4 w-full max-w-sm" />
          <div className="mt-2 skeleton h-4 w-3/4 max-w-xs" />

          <div className="mt-10 flex max-w-md flex-col gap-6">
            <div className="space-y-2">
              <div className="skeleton h-3 w-16" />
              <div className="skeleton h-12 w-full" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-12 w-full" />
            </div>
            <div className="skeleton mt-2 h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
