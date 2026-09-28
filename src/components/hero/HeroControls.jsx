"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

function padIndex(value) {
  return String(value).padStart(2, "0");
}

export default function HeroControls({
  index,
  total,
  onPrev,
  onNext,
  className,
}) {
  const reduceMotion = useReducedMotion();
  const progress = ((index + 1) / total) * 100;

  return (
    <div
      className={cn(
        "flex items-center gap-4 border-t border-border py-4 sm:gap-6 sm:py-5",
        className,
      )}
    >
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        Prev
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
        <div
          className="relative h-px flex-1 bg-border"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          aria-label={`Slide ${index + 1} of ${total}`}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-foreground"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: easeOut }
            }
          />
        </div>

        <p
          className="shrink-0 text-nav tabular-nums text-muted"
          aria-hidden="true"
        >
          <span className="text-foreground">{padIndex(index + 1)}</span>
          {" / "}
          {padIndex(total)}
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        Next
      </button>
    </div>
  );
}
