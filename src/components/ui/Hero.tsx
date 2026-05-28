import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Navbar, NavbarProps } from "./Navbar";

export interface HeroProps {
  headline: ReactNode;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  nav?: NavbarProps;
  className?: string;
}

/**
 * Full-width hero block matching the Figma Hero Block component.
 * 56px corner radius, background image with gradient overlay (multiply blend),
 * integrated Navbar at top, Display headline + Heading 2 subtext at bottom.
 */
export function Hero({
  headline,
  subtext,
  ctaLabel,
  ctaHref,
  backgroundImage,
  backgroundImageAlt = "",
  nav,
  className = "",
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-[32px] md:rounded-[var(--radius-block)] flex flex-col ${className}`}
    >
      {/* Background image */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1440px"
          />
          {/* Gradient overlay — matches Figma: multiply blend, dark at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(24,12,7,0.8) 0%, rgba(26,17,14,0) 57%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Content layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Integrated nav */}
        {nav && <Navbar {...nav} />}

        {/* Headline + subtext */}
        <div className="flex flex-col gap-4 px-3 pb-8 mt-auto sm:px-8">
          <h1
            className="font-bold text-text-primary tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 172px)", lineHeight: "0.82" }}
          >
            {headline}
          </h1>

          {subtext && (
            <p
              className="font-bold text-text-primary"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "1.3" }}
            >
              {subtext}
            </p>
          )}

          {ctaLabel && ctaHref && (
            <div className="mt-2">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-primary text-brand-on-primary font-medium text-base hover:opacity-90 transition-opacity"
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
