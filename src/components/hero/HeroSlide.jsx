"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroControls from "@/components/hero/HeroControls";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

function textVariants(reduceMotion) {
  return reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: { opacity: 0, y: 16 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };
}

function imageVariants(reduceMotion, direction) {
  return reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: {
          opacity: 0,
          scale: 0.985,
          x: direction >= 0 ? 15 : -15,
        },
        center: {
          opacity: 1,
          scale: 1,
          x: 0,
        },
        exit: {
          opacity: 0,
          scale: 1.025,
          x: direction >= 0 ? -15 : 15,
        },
      };
}

export default function HeroSlide({
  slide,
  direction,
  index,
  total,
  onPrev,
  onNext,
  imagePriority = false,
}) {
  const reduceMotion = useReducedMotion();
  const transition = {
    duration: reduceMotion ? 0.12 : 0.45,
    ease: easeOut,
  };
  const texts = textVariants(reduceMotion);
  const images = imageVariants(reduceMotion, direction);

  return (
    <div className="grid w-full flex-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-8 xl:gap-10">
      <div className="relative order-1 flex flex-col justify-center lg:order-none lg:col-span-5 lg:py-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${slide.id}-copy`}
            variants={texts}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex flex-col"
          >
            <p className="text-meta mb-5 sm:mb-6">{slide.eyebrow}</p>

            <h1
              className={cn(
                "font-display text-foreground",
                "text-[clamp(3.25rem,13vw,7rem)]",
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
                <motion.span
                  aria-hidden="true"
                  className="inline-block"
                  transition={{ duration: 0.25, ease: easeOut }}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative order-2 min-h-[24rem] overflow-hidden bg-surface sm:min-h-[32rem] lg:order-none lg:col-span-7 lg:min-h-[min(38rem,calc(100svh-10rem))]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${slide.id}-image`}
            variants={images}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={imagePriority}
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover"
              style={{
                objectPosition: slide.objectPosition || "center center",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(10,10,10,0.35)_100%)]"
            />
          </motion.div>
        </AnimatePresence>

        <HeroControls
          index={index}
          total={total}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>

      <div className="order-3 flex flex-col lg:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${slide.id}-mobile-copy`}
            variants={texts}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex flex-col"
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
        </AnimatePresence>
      </div>
    </div>
  );
}
