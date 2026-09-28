"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { lockBodyScroll } from "@/lib/bodyScrollLock";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#shop", label: "Shop" },
  { href: "/#collection", label: "Collection" },
  { href: "/#story", label: "Story" },
];

export default function MobileNav({ open, onClose, menuButtonRef }) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const unlock = lockBodyScroll();
    const menuButton = menuButtonRef?.current;

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      unlock();
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open, onClose, menuButtonRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
        >
          <div className="flex h-[var(--nav-height)] items-center justify-between px-[clamp(1rem,4vw,3rem)]">
            <p id={titleId} className="font-display text-2xl tracking-[0.08em]">
              ZENJI
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 min-w-11 items-center justify-center text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              Close
            </button>
          </div>

          <div className="editorial-rule mx-[clamp(1rem,4vw,3rem)]" />

          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center px-[clamp(1rem,4vw,3rem)] pb-16"
          >
            <p className="text-meta mb-8">Navigate</p>
            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <li key={link.href}>
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      delay: reduceMotion ? 0 : 0.06 * index,
                      ease: easeOut,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "font-display block py-3 text-[clamp(3rem,14vw,5.5rem)] leading-none tracking-[0.04em]",
                        "text-foreground transition-colors hover:text-accent",
                        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-[clamp(1rem,4vw,3rem)] pb-8">
            <p className="text-meta mb-4">Account</p>
            <div className="flex flex-col gap-1">
              <Link
                href="/login"
                onClick={onClose}
                className="inline-flex min-h-11 items-center text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={onClose}
                className="inline-flex min-h-11 items-center text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                Sign Up
              </Link>
            </div>
            <p className="text-meta mt-8">Australia / Editorial demo</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
