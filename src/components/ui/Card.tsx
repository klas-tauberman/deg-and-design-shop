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
    <svg className={className} viewBox="-5 -5.5 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.4 13L0 11.6L9.6 2H1V0H13V12H11V3.4L1.4 13Z" />
    </svg>
  );
}

function BasketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 21.9758 19" fill="currentColor" aria-hidden="true">
      <path d="M4.51288 19C4.06288 19 3.66288 18.8625 3.31288 18.5875C2.96288 18.3125 2.72121 17.9583 2.58788 17.525L0.0378788 8.275C-0.0454545 7.95833 0.00871211 7.66667 0.200379 7.4C0.392045 7.13333 0.654545 7 0.987879 7H5.73788L10.1379 0.45C10.2212 0.316667 10.3379 0.208333 10.4879 0.125C10.6379 0.0416667 10.7962 0 10.9629 0C11.1295 0 11.2879 0.0416667 11.4379 0.125C11.5879 0.208333 11.7045 0.316667 11.7879 0.45L16.1879 7H20.9879C21.3212 7 21.5837 7.13333 21.7754 7.4C21.967 7.66667 22.0212 7.95833 21.9379 8.275L19.3879 17.525C19.2545 17.9583 19.0129 18.3125 18.6629 18.5875C18.3129 18.8625 17.9129 19 17.4629 19H4.51288ZM4.48788 17H17.4879L19.6879 9H2.28788L4.48788 17ZM12.4004 14.4125C12.792 14.0208 12.9879 13.55 12.9879 13C12.9879 12.45 12.792 11.9792 12.4004 11.5875C12.0087 11.1958 11.5379 11 10.9879 11C10.4379 11 9.96705 11.1958 9.57538 11.5875C9.18371 11.9792 8.98788 12.45 8.98788 13C8.98788 13.55 9.18371 14.0208 9.57538 14.4125C9.96705 14.8042 10.4379 15 10.9879 15C11.5379 15 12.0087 14.8042 12.4004 14.4125ZM8.16288 7H13.7879L10.9629 2.8L8.16288 7Z" />
    </svg>
  );
}

export default ProductCard;
