"use client";

import { motion, useReducedMotion } from "framer-motion";

const PHRASES = [
  "No Restocks",
  "Limited Runs",
  "Designed in Australia",
  "ZENJI",
];

function MarqueeSequence({ accentIndex }) {
  return (
    <div className="flex shrink-0 items-center">
      {PHRASES.map((phrase, index) => (
        <span key={`${phrase}-${index}`} className="flex items-center">
          <span
            className={
              index === accentIndex
                ? "text-accent"
                : "text-foreground"
            }
          >
            {phrase}
          </span>
          <span
            aria-hidden="true"
            className="mx-5 text-border sm:mx-8"
          >
            /
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const reduceMotion = useReducedMotion();
  const staticLabel = PHRASES.join(" · ");

  return (
    <section
      aria-label="Brand statements"
      className="overflow-hidden border-y border-border bg-background"
    >
      <p className="sr-only">{staticLabel}</p>

      <div className="py-3.5 sm:py-4">
        {reduceMotion ? (
          <div className="container-zenji overflow-x-auto">
            <p
              aria-hidden="true"
              className="text-nav whitespace-nowrap text-foreground"
            >
              {PHRASES.map((phrase, index) => (
                <span key={phrase}>
                  <span className={index === 3 ? "text-accent" : undefined}>
                    {phrase}
                  </span>
                  {index < PHRASES.length - 1 ? (
                    <span className="mx-5 text-border sm:mx-8">/</span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        ) : (
          <motion.div
            className="flex w-max text-nav uppercase tracking-[0.18em]"
            aria-hidden="true"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 42,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <MarqueeSequence accentIndex={3} />
            <MarqueeSequence accentIndex={3} />
            <MarqueeSequence accentIndex={3} />
            <MarqueeSequence accentIndex={3} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
