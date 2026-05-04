import { ReactNode } from "react";

export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-neutral-700 text-text-primary",
  brand:   "bg-brand-primary text-brand-on-primary",
  success: "bg-[#0d2014] text-success border border-success/30",
  warning: "bg-[#2a1f00] text-warning border border-warning/30",
  error:   "bg-[#2a0f0b] text-error border border-error/30",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "hidden",
  brand:   "bg-brand-on-primary",
  success: "bg-success",
  warning: "bg-warning",
  error:   "bg-error",
};

/**
 * Status badge / tag matching the Figma Badge component.
 * Variants: default | brand | success | warning | error.
 */
export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-xs font-medium tracking-wide leading-none whitespace-nowrap",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={`size-1.5 rounded-full shrink-0 ${dotClasses[variant]}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

export default Badge;
