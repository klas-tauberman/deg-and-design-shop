"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavContact {
  email?: string;
  phone?: string;
  instagram?: string;
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
  contact?: NavContact;
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
  contact,
  className = "",
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`w-full ${className}`}>
      <nav className="flex items-center justify-between p-4 sm:p-8">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-2">
          {logo && <div className="mr-2">{logo}</div>}

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-2">
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
                <button
                  onClick={cta.onClick}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-brand-secondary text-brand-on-primary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <BasketIcon className="size-5" />
                  {cta.label}
                  {cta.badge && (
                    <span className="text-brand-on-primary/60">({cta.badge})</span>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center size-12 rounded-full bg-brand-secondary text-brand-on-primary hover:opacity-90 transition-opacity"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-bg-default flex flex-col p-2 sm:p-4">
          <div className="flex flex-col flex-1 p-4 sm:p-8">
          {/* Header row — mirrors the nav bar */}
          <div className="flex justify-end">
            <button
              className="size-12 rounded-full bg-brand-secondary inline-flex items-center justify-center text-brand-on-primary hover:opacity-90 transition-opacity"
              aria-label="Stäng meny"
              onClick={() => setOpen(false)}
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col gap-2 mt-8">
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

          {/* Contact buttons at bottom */}
          {contact && (
            <div className="mt-auto flex flex-wrap gap-2">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <MailIcon className="size-5" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <PhoneIcon className="size-5" />
                  {contact.phone}
                </a>
              )}
              {contact.instagram && (
                <a
                  href={`https://instagram.com/${contact.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Instagram
                </a>
              )}
            </div>
          )}
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-3 -6 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-5 -5 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" />
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

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 16" fill="currentColor" aria-hidden="true">
      <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V14V4Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 15 22" fill="currentColor" aria-hidden="true">
      <path d="M2 22C1.45 22 0.979167 21.8042 0.5875 21.4125C0.195833 21.0208 0 20.55 0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H12C12.55 0 13.0208 0.195833 13.4125 0.5875C13.8042 0.979167 14 1.45 14 2V5.1C14.3 5.21667 14.5417 5.4 14.725 5.65C14.9083 5.9 15 6.18333 15 6.5V8.5C15 8.81667 14.9083 9.1 14.725 9.35C14.5417 9.6 14.3 9.78333 14 9.9V20C14 20.55 13.8042 21.0208 13.4125 21.4125C13.0208 21.8042 12.55 22 12 22H2ZM2 20H12V2H2V20ZM7.7125 4.7125C7.90417 4.52083 8 4.28333 8 4C8 3.71667 7.90417 3.47917 7.7125 3.2875C7.52083 3.09583 7.28333 3 7 3C6.71667 3 6.47917 3.09583 6.2875 3.2875C6.09583 3.47917 6 3.71667 6 4C6 4.28333 6.09583 4.52083 6.2875 4.7125C6.47917 4.90417 6.71667 5 7 5C7.28333 5 7.52083 4.90417 7.7125 4.7125Z" />
    </svg>
  );
}

export default Navbar;
