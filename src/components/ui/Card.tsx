import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "./Button";

/* ─── Product Card ─────────────────────────────────────────────────────── */

export interface ProductCardProps {
  image: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  price: string;
  onReadMore?: () => void;
  onBuy?: () => void;
  className?: string;
}

/**
 * Full-width product card matching the Figma Product Card component.
 * 56px corner radius, background image with gradient overlay, bottom-anchored actions.
 */
export function ProductCard({
  image,
  imageAlt = "",
  title,
  subtitle,
  price,
  onReadMore,
  onBuy,
  className = "",
}: ProductCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-[32px] md:rounded-[var(--radius-block)] h-[522px] flex items-end px-3 pt-8 pb-3 sm:p-8 ${className}`}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1408px"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(16,5,2,0.9) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between w-full">
        <div className="flex flex-col gap-1">
          <h2 className="text-[64px] font-bold leading-[60px] text-text-primary tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[40px] font-bold leading-[52px] text-text-primary">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {onReadMore && (
            <Button variant="secondary" size="md" onClick={onReadMore}>
              Läs mer
              <ArrowOutwardIcon className="size-5" />
            </Button>
          )}
          {onBuy && (
            <Button variant="primary" size="md" onClick={onBuy}>
              <BasketIcon className="size-5" />
              Köp
              <span className="text-brand-on-primary/60">•</span>
              {price}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Content Card ─────────────────────────────────────────────────────── */

export interface ContentCardProps {
  image?: string;
  imageAlt?: string;
  title: string;
  body: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * General-purpose content card with optional image, title, and body text.
 */
export function ContentCard({
  image,
  imageAlt = "",
  title,
  body,
  onClick,
  className = "",
}: ContentCardProps) {
  return (
    <article
      onClick={onClick}
      className={[
        "bg-bg-surface rounded-[var(--radius-block)] overflow-hidden",
        onClick ? "cursor-pointer hover:bg-bg-elevated transition-colors duration-150" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="600px"
          />
        </div>
      )}
      <div className="p-8 flex flex-col gap-4">
        <h3 className="text-[22px] font-bold leading-tight text-text-primary">
          {title}
        </h3>
        <div className="text-base text-text-secondary leading-relaxed">{body}</div>
      </div>
    </article>
  );
}

/* ─── Icons (inline, avoids extra icon dep) ────────────────────────────── */

function ArrowOutwardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.4 18L5 16.6 14.6 7H6V5h12v12h-2V8.4L6.4 18Z" />
    </svg>
  );
}

function BasketIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.5 20a1 1 0 0 1-.713-.3A1 1 0 0 1 4.5 19a1 1 0 0 1 .287-.713A1 1 0 0 1 5.5 18a1 1 0 0 1 .713.287A1 1 0 0 1 6.5 19a1 1 0 0 1-.287.7A1 1 0 0 1 5.5 20Zm13 0a1 1 0 0 1-.713-.3A1 1 0 0 1 17.5 19a1 1 0 0 1 .287-.713A1 1 0 0 1 18.5 18a1 1 0 0 1 .713.287A1 1 0 0 1 19.5 19a1 1 0 0 1-.287.7A1 1 0 0 1 18.5 20ZM4.25 6l1.5 8.025h10.45L17.8 6H4.25Zm-.8-2h15.25a.96.96 0 0 1 .763.325.99.99 0 0 1 .212.825L17.9 14.35a1.48 1.48 0 0 1-.512.887 1.44 1.44 0 0 1-.938.338H5.5a1.44 1.44 0 0 1-.937-.338 1.48 1.48 0 0 1-.513-.887L2.3 5.15A.45.45 0 0 0 2.1 4.9a.49.49 0 0 0-.35-.15H1V3h1.525a1.5 1.5 0 0 1 1 .35 1.52 1.52 0 0 1 .525.875L4.3 5.4A.3.3 0 0 0 4.5 4h-.05Z" />
    </svg>
  );
}

export default ProductCard;
