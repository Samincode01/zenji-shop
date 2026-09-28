"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { easeOut } from "@/lib/motion";

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: easeOut },
      };

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="flex h-[var(--nav-height)] items-center justify-between px-[clamp(1rem,4vw,3rem)]">
        <Link
          href="/"
          className="font-display text-[1.75rem] leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          aria-label="ZENJI home"
        >
          ZENJI
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex h-11 items-center text-nav text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            ← Back to Store
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center px-[clamp(1.25rem,8vw,5.5rem)] py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              className="text-meta mb-6"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={fadeUp.transition}
            >
              Zenji
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              Archive
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              Error 404
            </motion.p>

            <motion.h1
              className="font-display text-foreground"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{
                ...fadeUp.transition,
                delay: reduceMotion ? 0 : 0.08,
              }}
            >
              <span className="block text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] text-accent">
                404
              </span>
              <span className="mt-4 block text-[clamp(3rem,12vw,7rem)] sm:mt-6">
                Out Of
                <br />
                Frame.
              </span>
            </motion.h1>
          </div>

          <motion.div
            className="flex max-w-md flex-col gap-8 lg:col-span-5 lg:justify-self-end lg:pb-3"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{
              ...fadeUp.transition,
              delay: reduceMotion ? 0 : 0.16,
            }}
          >
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              The page you&apos;re looking for has left the archive.
            </p>

            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>Return to Zenji</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
