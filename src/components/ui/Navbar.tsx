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
      <nav className="flex items-center justify-between px-8 py-8">
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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.5 20a1 1 0 0 1-.713-.3A1 1 0 0 1 4.5 19a1 1 0 0 1 .287-.713A1 1 0 0 1 5.5 18a1 1 0 0 1 .713.287A1 1 0 0 1 6.5 19a1 1 0 0 1-.287.7A1 1 0 0 1 5.5 20Zm13 0a1 1 0 0 1-.713-.3A1 1 0 0 1 17.5 19a1 1 0 0 1 .287-.713A1 1 0 0 1 18.5 18a1 1 0 0 1 .713.287A1 1 0 0 1 19.5 19a1 1 0 0 1-.287.7A1 1 0 0 1 18.5 20ZM4.25 6l1.5 8.025h10.45L17.8 6H4.25Zm-.8-2h15.25a.96.96 0 0 1 .763.325.99.99 0 0 1 .212.825L17.9 14.35a1.48 1.48 0 0 1-.512.887 1.44 1.44 0 0 1-.938.338H5.5a1.44 1.44 0 0 1-.937-.338 1.48 1.48 0 0 1-.513-.887L2.3 5.15A.45.45 0 0 0 2.1 4.9a.49.49 0 0 0-.35-.15H1V3h1.525a1.5 1.5 0 0 1 1 .35 1.52 1.52 0 0 1 .525.875L4.3 5.4A.3.3 0 0 0 4.5 4h-.05Z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

export default Navbar;
