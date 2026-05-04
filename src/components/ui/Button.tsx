"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  /** Accent fill — amber #FFC300 with dark text. Primary CTA (Köp, Beställ). */
  primary:
    "bg-brand-primary text-brand-on-primary hover:opacity-90 active:opacity-80",
  /** Cream fill with dark text. Secondary actions (Läs mer, Tillbaka). */
  secondary:
    "bg-brand-secondary text-brand-on-primary hover:opacity-90 active:opacity-80",
  /** No fill, border only. Tertiary / nav-style actions. */
  ghost:
    "bg-transparent text-text-primary border border-border-default hover:border-border-strong hover:bg-bg-elevated active:opacity-80",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-3 text-base gap-2",
  lg: "px-6 py-4 text-base gap-2",
};

const Spinner = () => (
  <svg
    className="animate-spin size-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

/**
 * Pill-shaped button matching the Figma Button component.
 * Four Figma variants map to three code variants (Nav/Default → secondary, Nav/Selected → ghost, Secondary → secondary, Primary → primary).
 */
export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 whitespace-nowrap",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export default Button;
