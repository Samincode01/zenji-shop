"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const CAMPAIGN_IMAGE = {
  src: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=2400&q=80",
  alt: "Fashion campaign portrait of a model in dark contemporary streetwear against an urban night backdrop",
};

const textEnter = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const imageEnter = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function BrandStatement() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      aria-labelledby="brand-statement-heading"
      className="relative isolate overflow-hidden border-b border-border"
    >
      <div className="relative min-h-[80svh] lg:min-h-[72svh]">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={
            reduceMotion
              ? {
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.2 } },
                }
              : imageEnter
          }
        >
          <motion.div
            className="absolute inset-0"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.015,
                  }
            }
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <Image
              src={CAMPAIGN_IMAGE.src}
              alt={CAMPAIGN_IMAGE.alt}
              fill
              sizes="100vw"
              className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-[75%_center]"
              priority={false}
            />
          </motion.div>
        </motion.div>

        {/* Left-weighted readability overlay — photo stays visible on the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,10,10,0.82)_0%,rgba(10,10,10,0.62)_38%,rgba(10,10,10,0.28)_62%,rgba(10,10,10,0.08)_100%)] sm:bg-[linear-gradient(95deg,rgba(10,10,10,0.78)_0%,rgba(10,10,10,0.55)_36%,rgba(10,10,10,0.2)_58%,transparent_82%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.35)_0%,transparent_28%,transparent_68%,rgba(10,10,10,0.45)_100%)] sm:bg-[linear-gradient(180deg,rgba(10,10,10,0.2)_0%,transparent_30%,transparent_70%,rgba(10,10,10,0.35)_100%)]"
        />

        <div className="relative z-10 flex min-h-[80svh] flex-col justify-center px-[clamp(1.25rem,8vw,5.5rem)] py-16 lg:min-h-[72svh] lg:py-20">
          <motion.div
            className="max-w-[38rem]"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.08,
                },
              },
            }}
          >
            <motion.p
              variants={
                reduceMotion
                  ? {
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }
                  : textEnter
              }
              className="mb-5 text-[0.6875rem] font-medium tracking-[0.18em] text-[#F1EFE9]/80 uppercase sm:mb-6"
            >
              The Zenji Code
              <span aria-hidden="true" className="mx-2 text-[#F1EFE9]/45">
                /
              </span>
              01
            </motion.p>

            <motion.h2
              id="brand-statement-heading"
              variants={
                reduceMotion
                  ? {
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }
                  : textEnter
              }
              className="font-display text-[clamp(3rem,12vw,7rem)] text-[#F1EFE9]"
            >
              Not Merch.
              <br />
              A Uniform.
            </motion.h2>

            <motion.p
              variants={
                reduceMotion
                  ? {
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }
                  : textEnter
              }
              className="mt-6 max-w-sm text-base leading-relaxed text-[#F1EFE9]/78 sm:mt-8 sm:text-lg"
            >
              Built for the people who move between worlds. Anime influence.
              Street culture. Australian perspective.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-col gap-2 sm:mt-20 sm:absolute sm:right-[clamp(1.25rem,4vw,3rem)] sm:bottom-8 sm:mt-0 sm:items-end"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: easeOut, delay: reduceMotion ? 0 : 0.15 }}
          >
            <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-[#F1EFE9]/72 uppercase">
              Zenji
              <span aria-hidden="true" className="mx-2 text-[#F1EFE9]/4">
                /
              </span>
              2026
            </p>
            <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-[#F1EFE9]/72 uppercase">
              Sydney
              <span aria-hidden="true" className="mx-2 text-[#F1EFE9]/4">
                →
              </span>
              Tokyo
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
