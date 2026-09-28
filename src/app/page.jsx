export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="container-zenji flex min-h-[70vh] flex-col justify-center py-24">
        <p className="text-meta mb-4">Foundation / 00</p>
        <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] text-foreground">
          ZENJI
        </h1>
        <p className="mt-6 max-w-md text-muted text-base leading-relaxed">
          Design tokens, typography, and theme foundations are in place.
          Editorial storefront sections land next.
        </p>
      </div>
    </main>
  );
}
