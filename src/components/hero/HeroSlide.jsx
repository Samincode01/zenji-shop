"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function HeroSlide({ slide, direction, imagePriority = false }) {
  const reduceMotion = useReducedMotion();

  const transition = {
    duration: reduceMotion ? 0.12 : 0.45,
    ease: easeOut,
  };

  const textVariants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  const imageVariants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: {
          opacity: 0,
          scale: 0.98,
          x: direction >= 0 ? 20 : -20,
        },
        center: {
          opacity: 1,
          scale: 1,
          x: 0,
        },
        exit: {
          opacity: 0,
          scale: 1.03,
          x: direction >= 0 ? -20 : 20,
        },
      };

  return (
    <motion.div
      className="grid w-full flex-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10"
      initial="enter"
      animate="center"
      exit="exit"
    >
      {/* Mobile: eyebrow + title first. Desktop: full copy column. */}
      <div className="relative order-1 flex flex-col justify-center lg:order-none lg:col-span-5 lg:py-6">
        <motion.div
          variants={textVariants}
          transition={transition}
          className="flex flex-col"
        >
          <p className="text-meta mb-5 sm:mb-6">{slide.eyebrow}</p>

          <h1
            className={cn(
              "font-display text-foreground",
              "text-[clamp(3.25rem,14vw,7.5rem)]",
              "whitespace-pre-line",
            )}
          >
            {slide.title}
          </h1>

          <div className="mt-6 hidden max-w-sm flex-col lg:mt-8 lg:flex">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {slide.description}
            </p>

            <Link
              href={slide.cta.href}
              className="group mt-10 inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>{slide.cta.label}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative order-2 min-h-[24rem] overflow-hidden bg-surface sm:min-h-[30rem] lg:order-none lg:col-span-7 lg:min-h-[min(36rem,calc(100svh-12rem))]">
        <motion.div
          variants={imageVariants}
          transition={transition}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={imagePriority}
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Mobile-only supporting copy + CTA beneath the image */}
      <motion.div
        variants={textVariants}
        transition={transition}
        className="order-3 flex flex-col lg:hidden"
      >
        <p className="max-w-sm text-base leading-relaxed text-muted">
          {slide.description}
        </p>

        <Link
          href={slide.cta.href}
          className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          <span>{slide.cta.label}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
