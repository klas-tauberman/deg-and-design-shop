"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";
import { Button } from "./Button";

export interface NavLink {
  label: string;
  href: string;
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
 * Desktop: logo left, links left, CTA right.
 * Mobile: hamburger menu that expands to full-screen overlay.
 */
export function Navbar({
  logo,
  links = [],
  cta,
  className = "",
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`w-full ${className}`}>
      <nav className="flex items-center justify-between px-4 py-8 sm:px-8">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-1">
          {logo && <div className="mr-2">{logo}</div>}

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center px-5 py-3 rounded-full text-base font-medium text-brand-on-primary bg-brand-secondary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          {cta && (
            <div className="hidden md:block">
              {cta.href ? (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-brand-secondary text-brand-on-primary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <BasketIcon className="size-5" />
                  {cta.label}
                  {cta.badge && (
                    <span className="text-brand-on-primary/60">({cta.badge})</span>
                  )}
                </Link>
              ) : (
                <Button variant="secondary" onClick={cta.onClick}>
                  <BasketIcon className="size-5" />
                  {cta.label}
                  {cta.badge && (
                    <span className="text-brand-on-primary/60">({cta.badge})</span>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center size-10 rounded-full bg-brand-secondary gap-1.5"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span
              className={`block w-5 h-0.5 bg-brand-on-primary transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-brand-on-primary transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-brand-on-primary transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-bg-default flex flex-col px-8 py-8">
          <div className="flex justify-end mb-12">
            <button
              className="size-10 rounded-full bg-brand-secondary flex items-center justify-center"
              aria-label="Stäng meny"
              onClick={() => setOpen(false)}
            >
              <CloseIcon className="size-5 text-brand-on-primary" />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-[40px] font-bold text-text-primary py-2 hover:text-brand-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {cta && (
            <div className="mt-auto">
              {cta.href ? (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  <BasketIcon className="size-5" />
                  {cta.label}
                  {cta.badge && <span className="opacity-60">({cta.badge})</span>}
                </Link>
              ) : (
                <Button variant="secondary" onClick={() => { cta.onClick?.(); setOpen(false); }}>
                  <BasketIcon className="size-5" />
                  {cta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function BasketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 21.9758 19" fill="currentColor" aria-hidden="true">
      <path d="M4.51288 19C4.06288 19 3.66288 18.8625 3.31288 18.5875C2.96288 18.3125 2.72121 17.9583 2.58788 17.525L0.0378788 8.275C-0.0454545 7.95833 0.00871211 7.66667 0.200379 7.4C0.392045 7.13333 0.654545 7 0.987879 7H5.73788L10.1379 0.45C10.2212 0.316667 10.3379 0.208333 10.4879 0.125C10.6379 0.0416667 10.7962 0 10.9629 0C11.1295 0 11.2879 0.0416667 11.4379 0.125C11.5879 0.208333 11.7045 0.316667 11.7879 0.45L16.1879 7H20.9879C21.3212 7 21.5837 7.13333 21.7754 7.4C21.967 7.66667 22.0212 7.95833 21.9379 8.275L19.3879 17.525C19.2545 17.9583 19.0129 18.3125 18.6629 18.5875C18.3129 18.8625 17.9129 19 17.4629 19H4.51288ZM4.48788 17H17.4879L19.6879 9H2.28788L4.48788 17ZM12.4004 14.4125C12.792 14.0208 12.9879 13.55 12.9879 13C12.9879 12.45 12.792 11.9792 12.4004 11.5875C12.0087 11.1958 11.5379 11 10.9879 11C10.4379 11 9.96705 11.1958 9.57538 11.5875C9.18371 11.9792 8.98788 12.45 8.98788 13C8.98788 13.55 9.18371 14.0208 9.57538 14.4125C9.96705 14.8042 10.4379 15 10.9879 15C11.5379 15 12.0087 14.8042 12.4004 14.4125ZM8.16288 7H13.7879L10.9629 2.8L8.16288 7Z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" />
    </svg>
  );
}

export default Navbar;
