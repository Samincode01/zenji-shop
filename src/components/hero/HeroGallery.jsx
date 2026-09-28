"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroControls from "@/components/hero/HeroControls";
import HeroSlide from "@/components/hero/HeroSlide";
import { heroSlides } from "@/data/heroSlides";

const SWIPE_THRESHOLD = 48;

export default function HeroGallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(null);

  const total = heroSlides.length;
  const slide = heroSlides[index];

  const goTo = useCallback(
    (nextIndex, dir) => {
      const normalized = ((nextIndex % total) + total) % total;
      setDirection(dir);
      setIndex(normalized);
    },
    [total],
  );

  const onPrev = useCallback(() => {
    goTo(index - 1, -1);
  }, [goTo, index]);

  const onNext = useCallback(() => {
    goTo(index + 1, 1);
  }, [goTo, index]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1, 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      goTo(index + 1, 1);
    } else {
      goTo(index - 1, -1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ZENJI campaign gallery"
      className="relative flex min-h-[calc(100svh-var(--nav-height))] flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="container-zenji flex flex-1 flex-col py-8 lg:py-10">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="relative flex flex-1 flex-col"
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <HeroSlide
              key={slide.id}
              slide={slide}
              direction={direction}
              imagePriority={index === 0}
            />
          </AnimatePresence>
        </div>

        <HeroControls
          index={index}
          total={total}
          onPrev={onPrev}
          onNext={onNext}
          className="mt-8 lg:mt-10"
        />
      </div>
    </section>
  );
}
