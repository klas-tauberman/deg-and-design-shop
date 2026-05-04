import Link from "next/link";
import { ReactNode } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title?: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: ReactNode;
  sections?: FooterSection[];
  contact?: {
    email?: string;
    phone?: string;
    instagram?: string;
  };
  copyright?: string;
  className?: string;
}

/**
 * Full-width footer matching the Figma Footer component.
 * Left: contact action buttons with icons. Right: copyright line.
 */
export function Footer({
  logo,
  sections = [],
  contact,
  copyright = `Copyright © Deg & Design ${new Date().getFullYear()}`,
  className = "",
}: FooterProps) {
  return (
    <footer
      className={`w-full py-6 ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: logo + contact links */}
        <div className="flex flex-col gap-4">
          {logo && <div>{logo}</div>}

          <div className="flex flex-wrap items-center gap-1">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <MailIcon className="size-5 shrink-0" />
                {contact.email}
              </a>
            )}

            {contact?.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <PhoneIcon className="size-5 shrink-0" />
                {contact.phone}
              </a>
            )}

            {contact?.instagram && (
              <a
                href={`https://instagram.com/${contact.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Instagram
              </a>
            )}

            {/* Extra link sections */}
            {sections.flatMap((section) =>
              section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right: copyright */}
        <p className="text-base font-medium text-text-secondary whitespace-nowrap shrink-0">
          {copyright}
        </p>
      </div>
    </footer>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export default Footer;
