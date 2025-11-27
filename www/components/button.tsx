import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

export function Button({ href, variant = "primary", size = "md", className = "", target, rel, children }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary via-purple-500 to-accent text-white hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
    outline:
      "border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:-translate-y-0.5 backdrop-blur-sm",
    ghost: "hover:bg-muted hover:text-foreground",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 py-2",
    lg: "h-12 px-8 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Add shimmer effect for primary variant
  const shimmerEffect =
    variant === "primary" ? (
      <span className="absolute inset-0 animate-shimmer opacity-0 hover:opacity-100 transition-opacity" />
    ) : null;

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classes} target={target} rel={rel}>
          {shimmerEffect}
          <span className="relative z-10 inline-flex items-center">{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {shimmerEffect}
        <span className="relative z-10 inline-flex items-center">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes}>
      {shimmerEffect}
      <span className="relative z-10 inline-flex items-center">{children}</span>
    </button>
  );
}
