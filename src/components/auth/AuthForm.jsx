"use client";

import { useId, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { alertInfo } from "@/lib/alerts";
import { cn, isValidEmail } from "@/lib/utils";

const inputClassName = (hasError) =>
  cn(
    "h-12 w-full border bg-transparent px-4 text-base text-foreground outline-none transition-colors",
    "placeholder:text-muted",
    "focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
    hasError ? "border-accent" : "border-border",
  );

function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  autoComplete,
  show,
  onToggleShow,
  error,
  errorId,
  placeholder = "••••••••",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-meta text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClassName(Boolean(error)), "pr-12")}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute top-1/2 right-1 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {show ? (
            <HiEyeSlash aria-hidden="true" className="h-5 w-5" />
          ) : (
            <HiEye aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function AuthForm({ mode = "login" }) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();
  const confirmPasswordErrorId = useId();

  const clearError = (field) => {
    setErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: undefined };
    });
  };

  const validate = () => {
    const next = {};

    if (isSignup && !name.trim()) {
      next.name = "Full name is required.";
    }

    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (isSignup && password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    if (isSignup) {
      if (!confirmPassword) {
        next.confirmPassword = "Confirm your password.";
      } else if (confirmPassword !== password) {
        next.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    alertInfo({
      title: "Demo only",
      text: isSignup
        ? "Account creation is a visual demo for this assessment."
        : "Sign in is a visual demo for this assessment.",
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
      {isSignup ? (
        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="text-meta text-foreground">
            Full Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? nameErrorId : undefined}
            className={inputClassName(Boolean(errors.name))}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id={nameErrorId} role="alert" className="text-sm text-accent">
              {errors.name}
            </p>
          ) : null}
        </div>
      ) : null}

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
            clearError("email");
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
          className={inputClassName(Boolean(errors.email))}
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p id={emailErrorId} role="alert" className="text-sm text-accent">
            {errors.email}
          </p>
        ) : null}
      </div>

      <PasswordField
        id={passwordId}
        name="password"
        label="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          clearError("password");
        }}
        autoComplete={isSignup ? "new-password" : "current-password"}
        show={showPassword}
        onToggleShow={() => setShowPassword((value) => !value)}
        error={errors.password}
        errorId={passwordErrorId}
      />

      {isSignup ? (
        <PasswordField
          id={confirmPasswordId}
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            clearError("confirmPassword");
          }}
          autoComplete="new-password"
          show={showConfirmPassword}
          onToggleShow={() => setShowConfirmPassword((value) => !value)}
          error={errors.confirmPassword}
          errorId={confirmPasswordErrorId}
        />
      ) : null}

      {!isSignup ? (
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
        <span>{isSignup ? "Create Account" : "Sign In"}</span>
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
