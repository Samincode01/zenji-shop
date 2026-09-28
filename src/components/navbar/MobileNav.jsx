"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { easeOut } from "@/lib/motion";
import { lockBodyScroll } from "@/lib/bodyScrollLock";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#shop", label: "Shop", index: "01" },
  { href: "/#collection", label: "Collection", index: "02" },
  { href: "/#story", label: "Story", index: "03" },
];

function stagger(index, reduceMotion) {
  if (reduceMotion) {
    return { duration: 0 };
  }
  return {
    duration: 0.38,
    delay: 0.05 * index,
    ease: easeOut,
  };
}

export default function MobileNav({ open, onClose, onOpenCart, menuButtonRef }) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const { itemCount } = useCart();
  const { theme, setTheme } = useTheme();

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

  const handleOpenCart = () => {
    onOpenCart?.();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] flex flex-col overflow-x-hidden overflow-y-auto bg-background lg:hidden"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: easeOut }}
        >
          <div className="flex h-[var(--nav-height)] shrink-0 items-center justify-between border-b border-border px-[clamp(1rem,4vw,3rem)]">
            <p
              id={titleId}
              className="font-display text-[1.75rem] leading-none tracking-[0.1em] text-foreground"
            >
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

          <div className="mx-auto flex w-full max-w-[var(--container)] flex-1 flex-col px-[clamp(1rem,4vw,3rem)] pt-8 pb-10 sm:pt-10">
            <motion.nav
              aria-label="Mobile"
              className="flex flex-col"
              initial={false}
            >
              <motion.p
                className="text-meta mb-5"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(0, reduceMotion)}
              >
                Explore
              </motion.p>

              <ul className="flex flex-col gap-1">
                {links.map((link, index) => (
                  <li key={link.href}>
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={stagger(index + 1, reduceMotion)}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "group flex min-h-14 items-baseline gap-4 py-2 sm:gap-5",
                          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]",
                        )}
                      >
                        <span className="text-meta w-6 shrink-0 text-muted transition-colors group-hover:text-accent">
                          {link.index}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[clamp(2.75rem,12vw,4.75rem)] leading-[0.92] tracking-[0.04em]",
                            "text-foreground transition-colors group-hover:text-accent",
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.nav>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:mt-12 sm:gap-12">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(5, reduceMotion)}
              >
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
                    Create Account
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-8"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(6, reduceMotion)}
              >
                <div>
                  <p className="text-meta mb-4">Bag</p>
                  <button
                    type="button"
                    onClick={handleOpenCart}
                    aria-label={`Bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                    className="inline-flex min-h-11 flex-col items-start justify-center text-left transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <span className="text-nav text-foreground">Bag</span>
                    <span className="text-meta mt-1 text-muted">
                      {String(itemCount).padStart(2, "0")}{" "}
                      {itemCount === 1 ? "Item" : "Items"}
                    </span>
                  </button>
                </div>

                <div>
                  <p className="text-meta mb-4">System</p>
                  <div
                    role="group"
                    aria-label="Color theme"
                    className="flex items-center gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      aria-pressed={theme === "light"}
                      className={cn(
                        "inline-flex min-h-11 items-center text-nav transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                        theme === "light"
                          ? "text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      Light
                    </button>
                    <span aria-hidden="true" className="text-muted">
                      /
                    </span>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      aria-pressed={theme === "dark"}
                      className={cn(
                        "inline-flex min-h-11 items-center text-nav transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                        theme === "dark"
                          ? "text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-auto border-t border-border pt-8"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(7, reduceMotion)}
            >
              <p className="font-display text-xl tracking-[0.08em] text-foreground">
                ZENJI
              </p>
              <p className="text-meta mt-3 text-muted">Sydney → Tokyo</p>
              <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-muted">
                A streetwear label built for people who move between worlds.
              </p>
              <p className="text-meta mt-6 text-muted">2026</p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
