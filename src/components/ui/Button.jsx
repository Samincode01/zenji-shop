import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-foreground text-background hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-foreground",
  ghost: "bg-transparent text-foreground hover:text-accent",
  accent: "bg-accent text-accent-foreground hover:opacity-90",
};

const sizes = {
  sm: "min-h-10 px-4 text-xs tracking-[0.14em]",
  md: "min-h-11 px-6 text-xs tracking-[0.16em]",
  lg: "min-h-12 px-8 text-sm tracking-[0.18em]",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  type,
  ...props
}) {
  const resolvedType =
    Component === "button" ? (type ?? "button") : undefined;

  return (
    <Component
      type={resolvedType}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium uppercase transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] disabled:cursor-not-allowed disabled:opacity-40",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
