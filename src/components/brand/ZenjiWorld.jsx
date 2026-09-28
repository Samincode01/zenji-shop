"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { zenjiWorld } from "@/data/zenjiWorld";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const headingVariants = (reduceMotion) =>
  reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOut },
        },
      };

const imageVariants = (reduceMotion, delay = 0) =>
  reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut, delay },
        },
      };

function Frame({ frame, className, mediaClassName, sizes, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={cn("flex flex-col gap-3", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={imageVariants(reduceMotion, delay)}
    >
      <div className={cn("group relative overflow-hidden bg-surface", mediaClassName)}>
        <Image
          src={frame.src}
          alt={frame.alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-[650ms] ease-[var(--ease-out)]",
            !reduceMotion && "group-hover:scale-[1.025]",
          )}
          style={{ objectPosition: frame.objectPosition }}
        />
      </div>
      <figcaption className="flex items-baseline gap-3">
        <span className="text-meta text-muted">{frame.index}</span>
        <span aria-hidden="true" className="text-meta text-border">
          /
        </span>
        <span className="text-meta text-foreground">{frame.label}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function ZenjiWorld() {
  const reduceMotion = useReducedMotion();
  const [afterDark, betweenWorlds, theUniform] = zenjiWorld.frames;
  const heading = headingVariants(reduceMotion);

  return (
    <section
      aria-labelledby="zenji-world-heading"
      className="border-b border-border py-20 sm:py-24 lg:py-28"
    >
      <div className="container-zenji">
        <motion.header
          className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={heading}
        >
          <div className="flex flex-col gap-3 lg:col-span-5">
            <p className="text-meta text-foreground">{zenjiWorld.eyebrow}</p>
            <p className="text-meta">{zenjiWorld.meta}</p>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7 lg:pl-6">
            <h2
              id="zenji-world-heading"
              className="font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.92] tracking-[0.03em] text-foreground"
            >
              {zenjiWorld.heading}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {zenjiWorld.description}
            </p>
          </div>
        </motion.header>

        {/* Mobile editorial stack */}
        <div className="flex flex-col gap-10 lg:hidden">
          <Frame
            frame={afterDark}
            mediaClassName="aspect-[3/4] w-full"
            sizes="100vw"
            delay={0.05}
          />
          <Frame
            frame={betweenWorlds}
            className="w-[88%] max-w-[22rem] self-end sm:max-w-[26rem]"
            mediaClassName="aspect-[4/5] w-full"
            sizes="(max-width: 639px) 88vw, 26rem"
            delay={0.12}
          />
          <Frame
            frame={theUniform}
            mediaClassName="aspect-[16/10] w-full"
            sizes="100vw"
            delay={0.18}
          />
        </div>

        {/* Desktop asymmetric lookbook */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-10">
          <Frame
            frame={afterDark}
            className="lg:col-span-7"
            mediaClassName="aspect-[3/4] w-full"
            sizes="(max-width: 1279px) 58vw, 720px"
            delay={0.06}
          />
          <Frame
            frame={betweenWorlds}
            className="lg:col-span-5 lg:mt-28"
            mediaClassName="aspect-[4/5] w-full"
            sizes="(max-width: 1279px) 40vw, 480px"
            delay={0.14}
          />
          <Frame
            frame={theUniform}
            className="lg:col-span-8 lg:col-start-5 lg:-mt-10"
            mediaClassName="aspect-[21/10] w-full"
            sizes="(max-width: 1279px) 66vw, 820px"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
