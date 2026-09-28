"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

function padIndex(value) {
  return String(value).padStart(2, "0");
}

const arrowButtonClass =
  "inline-flex h-11 w-11 items-center justify-center border border-[#F1EFE9]/55 bg-[#101010]/35 text-[#F1EFE9] backdrop-blur-[2px] transition-colors hover:border-[#F1EFE9] hover:bg-[#101010]/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1EFE9]";

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
    <div className={cn("pointer-events-none absolute inset-0 z-20", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous campaign"
          className={cn("pointer-events-auto", arrowButtonClass)}
        >
          <HiChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
        <button
          type="button"
          onClick={onNext}
          aria-label="Next campaign"
          className={cn("pointer-events-auto", arrowButtonClass)}
        >
          <HiChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-4 sm:px-5 sm:pb-5">
        <p
          className="text-nav tabular-nums text-[#F1EFE9]/85"
          aria-hidden="true"
        >
          <span className="text-[#F1EFE9]">{padIndex(index + 1)}</span>
          {" / "}
          {padIndex(total)}
        </p>

        <div
          className="relative mb-2 h-px w-24 bg-[#F1EFE9]/25 sm:w-32"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          aria-label={`Slide ${index + 1} of ${total}`}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#F1EFE9]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: easeOut }
            }
          />
        </div>
      </div>
    </div>
  );
}
