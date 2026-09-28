"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CartDrawer from "@/components/cart/CartDrawer";
import DesktopNav from "@/components/navbar/DesktopNav";
import MobileNav from "@/components/navbar/MobileNav";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { AiOutlineShopping } from "react-icons/ai";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);
  const bagButtonRef = useRef(null);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const openCart = useCallback(() => {
    setMenuOpen(false);
    setCartOpen(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setCartOpen(false);
    setMenuOpen((open) => !open);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                y: 0,
                opacity: 1,
              }
        }
      >
        <div className="mx-auto grid h-[var(--nav-height)] w-full max-w-[var(--container)] grid-cols-[1fr_auto] items-center px-[clamp(1rem,4vw,3rem)] lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="font-display justify-self-start text-[1.75rem] leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            aria-label="ZENJI home"
          >
            ZENJI
          </Link>

          <DesktopNav className="justify-self-center" />

          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            

            <ThemeToggle />

            <button
              ref={bagButtonRef}
              type="button"
              onClick={openCart}
              aria-label={`Bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              aria-expanded={cartOpen}
              aria-controls="cart-drawer"
              className="inline-flex h-11 items-center gap-2 px-2 text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <span
  className="
    inline-flex items-center gap-1.5
    rounded-full
    border border-current/30
    px-3 py-1.5
    cursor-pointer
    transition-colors duration-200
    hover:border-current
    hover:bg-black/5
    dark:hover:bg-white/10
  "
>
  <AiOutlineShopping className="text-[16px] shrink-0" />
  <span>Bag</span>
  <span className="text-[11px] opacity-60">{itemCount}</span>
</span>
            </button>
<Link
              href="/login"
              className="hidden h-11 items-center px-2 text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] lg:inline-flex"
            >
              Sign In
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 min-w-11 items-center justify-center px-2 text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              onClick={toggleMenu}
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNav
        open={menuOpen}
        onClose={closeMenu}
        onOpenCart={openCart}
        menuButtonRef={menuButtonRef}
      />

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        triggerRef={bagButtonRef}
      />
    </>
  );
}
