"use client";

import { motion, useReducedMotion } from "motion/react";
import { sectionReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function SectionReveal({ className, children, ...props }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section className={className} {...props}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={cn(className)}
      initial={sectionReveal.initial}
      whileInView={sectionReveal.whileInView}
      viewport={sectionReveal.viewport}
      transition={sectionReveal.transition}
      {...props}
    >
      {children}
    </motion.section>
  );
}
