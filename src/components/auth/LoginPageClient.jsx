"use client";

import AuthPageShell from "@/components/auth/AuthPageShell";

const LOGIN_IMAGE = {
  src: "https://images.unsplash.com/photo-1523398002811-cecf3f0b5d9c?auto=format&fit=crop&w=1600&q=80",
  alt: "Fashion editorial portrait of a model in oversized dark streetwear against concrete architecture",
};

export default function LoginPageClient() {
  return (
    <AuthPageShell
      mode="login"
      image={LOGIN_IMAGE}
      imageLabel={
        <>
          Members
          <span aria-hidden="true" className="mx-2 opacity-50">
            /
          </span>
          Entrance
        </>
      }
      eyebrow={
        <>
          Login
          <span aria-hidden="true" className="mx-2 text-border">
            /
          </span>
          Zenji
        </>
      }
      title={"Welcome\nBack."}
      description="Sign in to continue your story. This is a visual demo — no account is created or verified."
      footerPrompt="Don't have an account?"
      footerHref="/signup"
      footerLabel="Create Account"
    />
  );
}
