"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { reviews } from "@/data/reviews";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

function padIndex(value) {
  return String(value).padStart(2, "0");
}

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = reviews.length;
  const review = reviews[index];

  const goTo = useCallback(
    (nextIndex, dir) => {
      const normalized = ((nextIndex % total) + total) % total;
      setDirection(dir);
      setIndex(normalized);
    },
    [total],
  );

  const onPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const onNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      // Avoid stealing hero carousel keys when reviews are off-screen —
      // only handle when the section contains focus or user is tabbing nearby.
      // Keyboard still works when the section is focused via controls.
      if (!event.target?.closest?.("#field-notes")) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1, 1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: {
          opacity: 0,
          x: direction >= 0 ? 20 : -20,
        },
        center: {
          opacity: 1,
          x: 0,
        },
        exit: {
          opacity: 0,
          x: direction >= 0 ? -20 : 20,
        },
      };

  return (
    <section
      id="field-notes"
      aria-labelledby="field-notes-heading"
      className="border-b border-border"
      tabIndex={-1}
    >
      <div className="container-zenji py-16 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-meta mb-4 text-accent">Field Notes</p>
            <h2
              id="field-notes-heading"
              className="font-display text-[clamp(2.5rem,8vw,4.5rem)] text-foreground"
            >
              Worn In
              <br />
              The Wild.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Sample demo notes for this assessment — not verified customer
              reviews.
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="text-meta mb-8">
              {padIndex(index + 1)}
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              {padIndex(total)}
            </p>

            <div className="relative min-h-[14rem] sm:min-h-[12rem]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.blockquote
                  key={review.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.4,
                    ease: easeOut,
                  }}
                  className="absolute inset-0"
                >
                  <p className="font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.05] tracking-[0.02em] text-foreground">
                    <span className="text-accent" aria-hidden="true">
                      “
                    </span>
                    {review.quote}
                    <span className="text-accent" aria-hidden="true">
                      ”
                    </span>
                  </p>
                  <footer className="mt-8 text-meta text-muted">
                    <cite className="not-italic">
                      {review.name}
                      <span aria-hidden="true" className="mx-2 text-border">
                        /
                      </span>
                      {review.city}
                    </cite>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-3 sm:mt-12">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous note"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors",
                  "hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                )}
              >
                <HiChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next note"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors",
                  "hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                )}
              >
                <HiChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
