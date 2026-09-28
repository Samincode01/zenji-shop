"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { alertInfo } from "@/lib/alerts";
import { cn, isValidEmail } from "@/lib/utils";

export default function AuthForm({ mode = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const emailId = useId();
  const passwordId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();

  const validate = () => {
    const next = {};

    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    alertInfo({
      title: "Demo only",
      text:
        mode === "login"
          ? "Sign in is a visual demo for this assessment."
          : "Account creation is a visual demo for this assessment.",
      confirmText: "Understood",
    });
  };

  const handleForgotPassword = () => {
    alertInfo({
      title: "Demo only",
      text: "Password reset is not available in this assessment demo.",
      confirmText: "Understood",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-meta text-foreground">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email) {
              setErrors((current) => ({ ...current, email: undefined }));
            }
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
          className={cn(
            "h-12 border bg-transparent px-4 text-base text-foreground outline-none transition-colors",
            "placeholder:text-muted",
            "focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
            errors.email ? "border-accent" : "border-border",
          )}
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p id={emailErrorId} role="alert" className="text-sm text-accent">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={passwordId} className="text-meta text-foreground">
          Password
        </label>
        <div className="relative">
          <input
            id={passwordId}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) {
                setErrors((current) => ({ ...current, password: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? passwordErrorId : undefined}
            className={cn(
              "h-12 w-full border bg-transparent px-4 pr-12 text-base text-foreground outline-none transition-colors",
              "placeholder:text-muted",
              "focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
              errors.password ? "border-accent" : "border-border",
            )}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-1 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {showPassword ? (
              <HiEyeSlash aria-hidden="true" className="h-5 w-5" />
            ) : (
              <HiEye aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password ? (
          <p id={passwordErrorId} role="alert" className="text-sm text-accent">
            {errors.password}
          </p>
        ) : null}
      </div>

      {mode === "login" ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-nav text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            Forgot password?
          </button>
        </div>
      ) : null}

      <button
        type="submit"
        className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-3 bg-foreground text-nav text-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </form>
  );
}
