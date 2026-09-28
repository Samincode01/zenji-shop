import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#shop", label: "Shop" },
  { href: "/#collection", label: "Collection" },
  { href: "/#story", label: "Story" },
];

export default function DesktopNav({ className }) {
  return (
    <nav
      aria-label="Primary"
      className={cn("hidden items-center gap-10 lg:flex", className)}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-nav text-foreground transition-colors duration-[var(--duration-base)] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
