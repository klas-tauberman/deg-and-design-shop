"use client";

import Link from "next/link";
import { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  logo?: ReactNode;
  links?: NavLink[];
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
    badge?: string;
  };
  className?: string;
}

/**
 * Full-width navigation bar matching the Figma Header component.
 * Logo left, links left, CTA right — same layout on mobile and desktop.
 */
export function Navbar({
  logo,
  links = [],
  cta,
  className = "",
}: NavbarProps) {
  return (
    <header className={`w-full ${className}`}>
      <nav className="flex items-center justify-between flex-wrap gap-2 p-4 sm:p-8">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-2">
          {logo && <div className="mr-2">{logo}</div>}

          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium text-brand-on-primary bg-brand-secondary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {link.active && <span className="size-2 rounded-full bg-current shrink-0" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-2">
          {cta && (
            <div>
              {cta.href ? (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-brand-secondary text-brand-on-primary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {cta.label}
                  {cta.badge && (
                    <span className="text-brand-on-primary/60">({cta.badge})</span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={cta.onClick}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-brand-secondary text-brand-on-primary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {cta.label}
                  {cta.badge && (
                    <span className="text-brand-on-primary/60">({cta.badge})</span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
