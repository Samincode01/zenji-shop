import Link from "next/link";

const primaryLinks = [
  { href: "/#shop", label: "Shop" },
  { href: "/#collection", label: "Collection" },
  { href: "/#story", label: "Story" },
];

const linkClassName =
  "inline-flex min-h-11 items-center text-nav text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-zenji py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-display inline-block text-[2.5rem] leading-none tracking-[0.1em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] sm:text-[3rem]"
              aria-label="ZENJI home"
            >
              ZENJI
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed tracking-[0.04em] text-muted">
              Anime-inspired streetwear
              <br />
              designed in Australia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
            <nav aria-label="Footer">
              <p className="text-meta mb-4">Navigate</p>
              <ul className="flex flex-col gap-1">
                {primaryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-meta mb-4">Connect</p>
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    Instagram
                    <span aria-hidden="true" className="ml-2">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@zenji.example"
                    className={linkClassName}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-meta mb-4">Origin</p>
              <p className="text-nav text-foreground">Australia</p>
              <p className="mt-3 text-sm tracking-[0.06em] text-muted">
                Demo storefront
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta">Australia</p>
          <p className="text-meta">© 2026 ZENJI</p>
        </div>
      </div>
    </footer>
  );
}
