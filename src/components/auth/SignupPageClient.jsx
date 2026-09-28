"use client";

import AuthPageShell from "@/components/auth/AuthPageShell";

const SIGNUP_IMAGE = {
  src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=80",
  alt: "Dark fashion portrait of a person in a tailored coat under low urban light",
};

export default function SignupPageClient() {
  return (
    <AuthPageShell
      mode="signup"
      image={SIGNUP_IMAGE}
      imageLabel={
        <>
          Members
          <span aria-hidden="true" className="mx-2 opacity-50">
            /
          </span>
          Begin
        </>
      }
      eyebrow={
        <>
          Create Account
          <span aria-hidden="true" className="mx-2 text-border">
            /
          </span>
          Zenji
        </>
      }
      title={"Your Story\nStarts Here."}
      description="Join the ZENJI demo experience. This form is presentation-only — no account is created."
      footerPrompt="Already have an account?"
      footerHref="/login"
      footerLabel="Sign In"
    />
  );
}
