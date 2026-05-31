"use client";

import { useState } from "react";

export interface QuantityStepperProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function QuantityStepper({ value, min = 1, max, onChange }: QuantityStepperProps) {
  const [internal, setInternal] = useState(min);
  const qty = value ?? internal;

  function set(next: number) {
    const clamped = Math.max(min, max !== undefined ? Math.min(max, next) : next);
    setInternal(clamped);
    onChange?.(clamped);
  }

  return (
    <div className="inline-flex items-center rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium">
      <button
        onClick={() => set(qty + 1)}
        className="size-12 rounded-full bg-brand-secondary flex items-center justify-center transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary shrink-0"
        aria-label="Öka antal"
      >
        <svg className="size-5" viewBox="-5 -5 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" />
        </svg>
      </button>
      <span className="w-8 text-center">{qty}</span>
      <button
        onClick={() => set(qty - 1)}
        className="size-12 rounded-full bg-brand-secondary flex items-center justify-center transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary shrink-0"
        aria-label="Minska antal"
      >
        <svg className="size-5" viewBox="-5 -11 24 24" fill="currentColor" aria-hidden="true">
          <path d="M0 2V0H14V2H0Z" />
        </svg>
      </button>
    </div>
  );
}

export default QuantityStepper;
