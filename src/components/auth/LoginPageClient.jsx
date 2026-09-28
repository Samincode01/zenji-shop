"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import { easeOut } from "@/lib/motion";

const LOGIN_IMAGE = {
  src: "https://images.unsplash.com/photo-1523398002811-cecf3f0b5d9c?auto=format&fit=crop&w=1600&q=80",
  alt: "Fashion editorial portrait of a model in oversized dark streetwear against concrete architecture",
};

export default function LoginPageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="flex h-[var(--nav-height)] items-center justify-between px-[clamp(1rem,4vw,3rem)]">
        <Link
          href="/"
          className="font-display text-[1.75rem] leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          aria-label="ZENJI home"
        >
          ZENJI
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex h-11 items-center text-nav text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            ← Back to Store
          </Link>
        </div>
      </header>

      <main className="grid min-h-[calc(100svh-var(--nav-height))] lg:grid-cols-2">
        <motion.div
          className="relative hidden min-h-[18rem] overflow-hidden bg-surface md:block md:min-h-[22rem] lg:min-h-full"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: easeOut }}
        >
          <Image
            src={LOGIN_IMAGE.src}
            alt={LOGIN_IMAGE.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.15)_0%,transparent_35%,rgba(10,10,10,0.35)_100%)]"
          />
          <p className="absolute bottom-6 left-6 text-meta text-[#F1EFE9]/80 md:bottom-8 md:left-8">
            Members
            <span aria-hidden="true" className="mx-2 opacity-50">
              /
            </span>
            Entrance
          </p>
        </motion.div>

        <motion.div
          className="relative flex flex-col justify-center px-[clamp(1.25rem,6vw,4rem)] py-12 sm:py-16"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.5,
            ease: easeOut,
            delay: reduceMotion ? 0 : 0.08,
          }}
        >
          <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-surface md:hidden">
            <Image
              src={LOGIN_IMAGE.src}
              alt={LOGIN_IMAGE.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(10,10,10,0.45)_100%)]"
            />
          </div>

          <p className="text-meta mb-4">
            Login
            <span aria-hidden="true" className="mx-2 text-border">
              /
            </span>
            Zenji
          </p>

          <h1 className="font-display text-[clamp(3rem,10vw,5.5rem)] text-foreground">
            Welcome
            <br />
            Back.
          </h1>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
            Sign in to continue your story. This is a visual demo — no account
            is created or verified.
          </p>

          <div className="mt-10">
            <AuthForm mode="login" />
          </div>

          <p className="mt-10 text-sm tracking-[0.04em] text-muted">
            Don&apos;t have an account?
          </p>
          <Link
            href="/signup"
            className="group mt-3 inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 text-nav text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          >
            <span>Create Account</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
