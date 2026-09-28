"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(
        "group relative inline-flex h-11 min-w-11 items-center justify-center px-1",
        "text-nav text-foreground transition-colors duration-[var(--duration-base)]",
        "hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
        className,
      )}
    >
      <span className="sr-only">
        {isDark ? "Dark theme active" : "Light theme active"}
      </span>
      <span
        aria-hidden="true"
        className="relative flex h-5 w-9 items-center border border-current"
      >
        <motion.span
          className="absolute h-3.5 w-3.5 bg-foreground"
          initial={false}
          animate={{ x: isDark ? 18 : 2 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 28 }
          }
        />
      </span>
    </button>
  );
}
