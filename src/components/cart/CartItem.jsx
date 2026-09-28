"use client";

import Image from "next/image";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { cn, formatCurrency } from "@/lib/utils";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <article
      className={cn(
        "grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-5",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {item.image?.src ? (
          <Image
            src={item.image.src}
            alt={item.image.alt || item.name}
            fill
            sizes="104px"
            className="object-cover object-center"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl tracking-[0.04em] text-foreground sm:text-2xl">
              {item.name}
            </h3>
            <p className="mt-1 text-meta">
              Size
              <span aria-hidden="true" className="mx-2 text-border">
                /
              </span>
              {item.size}
            </p>
          </div>
          <p className="shrink-0 text-sm tracking-[0.06em] text-muted">
            {formatCurrency(item.price)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="inline-flex items-center border border-border">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <HiMinus aria-hidden="true" className="h-4 w-4" />
            </button>
            <span
              className="min-w-8 text-center text-sm tabular-nums tracking-[0.08em]"
              aria-live="polite"
              aria-label={`Quantity ${item.quantity}`}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              aria-label={`Increase quantity of ${item.name}`}
              className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <HiPlus aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-nav text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
