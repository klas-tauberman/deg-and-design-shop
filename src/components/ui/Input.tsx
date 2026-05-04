"use client";

import { InputHTMLAttributes, useId } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
}

/**
 * Pill-shaped text input matching the Figma Input component.
 * States: default | focus (accent border) | error (red border) | disabled.
 */
export function Input({
  label,
  error,
  disabled,
  className = "",
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary tracking-wide"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          "w-full px-5 py-3 rounded-full text-base font-normal leading-relaxed",
          "bg-bg-surface text-text-primary placeholder:text-text-secondary",
          "border transition-all duration-150 outline-none",
          "focus:ring-2 focus:ring-brand-primary focus:ring-offset-0 focus:border-brand-primary",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error
            ? "border-error focus:ring-error focus:border-error"
            : "border-border-default",
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
