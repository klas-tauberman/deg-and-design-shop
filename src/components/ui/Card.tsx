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
      className={`relative overflow-hidden rounded-[32px] md:rounded-[var(--radius-block)] h-[522px] flex items-end px-4 pt-8 pb-4 sm:p-8 ${className}`}
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

        <div className="flex items-center gap-2 shrink-0">
          {onReadMore && (
            <Button variant="secondary" size="md" onClick={onReadMore}>
              Läs mer
              <ArrowOutwardIcon className="size-5" />
            </Button>
          )}
          {onBuy && (
            <Button variant="primary" size="md" onClick={onBuy}>
              Lägg till · {price}
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
    <svg className={className} viewBox="-5 -5.5 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.4 13L0 11.6L9.6 2H1V0H13V12H11V3.4L1.4 13Z" />
    </svg>
  );
}


export default ProductCard;
