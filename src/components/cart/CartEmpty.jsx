export default function CartEmpty({ onContinue }) {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-8">
      <p className="text-meta mb-4">Bag / 00</p>
      <h3 className="font-display text-[clamp(2.5rem,10vw,3.5rem)] tracking-[0.04em] text-foreground">
        Your Bag
        <br />
        Is Empty.
      </h3>
      <p className="mt-5 max-w-xs text-base leading-relaxed text-muted">
        No pieces have been added yet.
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="group mt-10 inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
      >
        <span>Continue Shopping</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </div>
  );
}
