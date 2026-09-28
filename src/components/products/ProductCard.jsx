"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { easeOut } from "@/lib/motion";
import { cn, formatCurrency } from "@/lib/utils";

function categoryLabel(category) {
  if (category === "Tees") return "Tee";
  if (category === "Hoodies") return "Hoodie";
  return category;
}

export default function ProductCard({ product, index, className }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const errorId = useId();
  const sizeGroupId = useId();

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const showSecondary = Boolean(secondaryImage) && hovered && !reduceMotion;
  const number = String(index + 1).padStart(2, "0");
  const priceLabel = formatCurrency(product.price, product.currency);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeError("");
    setAdded(false);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError("Select a size to continue.");
      setAdded(false);
      return;
    }

    setSizeError("");
    addItem(product, selectedSize);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <motion.article
      className={cn("flex flex-col gap-5 sm:gap-6", className)}
      aria-labelledby={`product-${product.id}-name`}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0.15 : 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: easeOut,
      }}
    >
      <div
        className="group relative aspect-[4/5] overflow-hidden bg-surface"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="absolute inset-0"
          animate={
            reduceMotion
              ? undefined
              : { scale: hovered && secondaryImage ? 1.02 : 1 }
          }
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>

        {secondaryImage ? (
          <motion.div
            className="absolute inset-0 hidden md:block"
            initial={false}
            animate={{
              opacity: showSecondary ? 1 : 0,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: easeOut }}
            aria-hidden={!showSecondary}
          >
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-5">
        <div className="space-y-2">
          <p className="text-meta">
            {number}
            <span aria-hidden="true" className="mx-2 text-border">
              /
            </span>
            {categoryLabel(product.category)}
          </p>

          <div className="flex items-baseline justify-between gap-4">
            <h3
              id={`product-${product.id}-name`}
              className="font-display text-[clamp(1.75rem,4vw,2.35rem)] tracking-[0.04em] text-foreground"
            >
              {product.name}
            </h3>
            <p className="shrink-0 text-sm tracking-[0.08em] text-muted">
              {priceLabel}
            </p>
          </div>
        </div>

        <div>
          <p id={sizeGroupId} className="text-meta mb-3">
            Select size
          </p>
          <div
            role="group"
            aria-labelledby={sizeGroupId}
            className="flex flex-wrap gap-2"
          >
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Size ${size}`}
                  onClick={() => handleSizeSelect(size)}
                  className={cn(
                    "inline-flex h-11 min-w-11 items-center justify-center border px-3 text-xs tracking-[0.14em] uppercase transition-colors duration-[var(--duration-base)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-transparent text-foreground hover:border-foreground",
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {sizeError ? (
            <p
              id={errorId}
              role="alert"
              className="mt-3 text-sm tracking-[0.04em] text-accent"
            >
              {sizeError}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleAddToBag}
          aria-describedby={sizeError ? errorId : undefined}
          className="group mt-auto inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          <span>{added ? "Added to Bag" : "Add to Bag"}</span>
          <span aria-hidden="true">{added ? "✓" : "→"}</span>
        </button>
      </div>
    </motion.article>
  );
}
