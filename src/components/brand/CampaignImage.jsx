"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { easeOut } from "@/lib/motion";

const CAMPAIGN_IMAGE = {
  src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2400&q=80",
  alt: "Fashion editorial portrait of a model in tailored dark streetwear against an urban architectural backdrop",
};

export default function CampaignImage() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionReveal
      aria-label="Campaign imagery"
      className="border-b border-border"
    >
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/10] lg:aspect-[16/7]">
          <motion.div
            className="absolute inset-0"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.02,
                  }
            }
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <Image
              src={CAMPAIGN_IMAGE.src}
              alt={CAMPAIGN_IMAGE.alt}
              fill
              sizes="100vw"
              className="object-cover object-[center_20%]"
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between gap-4 px-[clamp(1rem,4vw,3rem)] py-5 sm:py-6">
          <p className="text-meta text-background mix-blend-difference">
            Zenji
            <span aria-hidden="true" className="mx-2 opacity-60">
              /
            </span>
            2026
          </p>
          <p className="text-meta text-background mix-blend-difference">
            Sydney
            <span aria-hidden="true" className="mx-2 opacity-60">
              →
            </span>
            Tokyo
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
