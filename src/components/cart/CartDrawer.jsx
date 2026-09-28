"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import CartEmpty from "@/components/cart/CartEmpty";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/context/CartContext";
import { alertInfo } from "@/lib/alerts";
import { lockBodyScroll } from "@/lib/bodyScrollLock";
import { drawerVariants, overlayVariants } from "@/lib/motion";
import { formatCurrency } from "@/lib/utils";

function itemLabel(count) {
  return `${String(count).padStart(2, "0")} ${count === 1 ? "Item" : "Items"}`;
}

export default function CartDrawer({ open, onClose, triggerRef }) {
  const { items, itemCount, subtotal } = useCart();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const unlock = lockBodyScroll();
    const trigger = triggerRef?.current;

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
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  const handleContinue = () => {
    onClose();
    window.requestAnimationFrame(() => {
      document.getElementById("shop")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const handleCheckout = () => {
    alertInfo({
      title: "Demo checkout",
      text: "Checkout is a demo for this assessment. No payment is processed.",
      confirmText: "Understood",
    });
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="Close bag"
            className="absolute inset-0 bg-overlay"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={
              reduceMotion
                ? {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.15 } },
                    exit: { opacity: 0, transition: { duration: 0.1 } },
                  }
                : overlayVariants
            }
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex h-[100dvh] w-full max-w-none flex-col border-l border-border bg-background sm:max-w-[28rem] lg:max-w-[30rem]"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={
              reduceMotion
                ? {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.15 } },
                    exit: { opacity: 0, transition: { duration: 0.1 } },
                  }
                : drawerVariants
            }
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
              <div>
                <h2
                  id={titleId}
                  className="font-display text-3xl tracking-[0.06em] text-foreground sm:text-4xl"
                >
                  Your Bag
                </h2>
                <p className="text-meta mt-2">{itemLabel(itemCount)}</p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <HiXMark aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <CartEmpty onContinue={handleContinue} />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 sm:px-8">
                  <ul className="divide-y-0">
                    {items.map((item) => (
                      <li key={item.id}>
                        <CartItem item={item} />
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="border-t border-border px-6 py-5 sm:px-8 sm:py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-meta">Subtotal</p>
                    <p className="text-base tracking-[0.06em] text-foreground">
                      {formatCurrency(subtotal)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Shipping calculated at checkout. Demo only — no payment is
                    processed.
                  </p>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-5 inline-flex h-12 w-full items-center justify-center gap-3 bg-foreground text-nav text-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <span>Checkout</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
