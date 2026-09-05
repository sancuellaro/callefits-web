import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-semibold uppercase tracking-wider text-xs md:text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-brand-primary text-brand-primary-foreground shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]",
  outline:
    "border border-black/10 bg-transparent text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground",
  secondary:
    "bg-brand-secondary text-brand-secondary-foreground hover:-translate-y-0.5 hover:shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
  link: "bg-transparent text-foreground underline-offset-4 hover:underline tracking-normal normal-case font-medium",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-11 px-6 py-2",
  sm: "h-9 px-4",
  lg: "h-12 px-8 text-sm md:text-base",
  icon: "h-11 w-11",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
