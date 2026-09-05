import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "outline" | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-secondary text-brand-secondary-foreground",
  outline: "border border-black/10 text-foreground bg-transparent",
  accent: "bg-brand-accent text-brand-accent-foreground",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
