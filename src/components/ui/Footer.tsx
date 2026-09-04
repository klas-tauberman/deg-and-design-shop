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

          <div className="flex flex-wrap items-center gap-2">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2F2D2A] text-text-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <MailIcon className="size-5 shrink-0" />
                {contact.email}
              </a>
            )}

            {contact?.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2F2D2A] text-text-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2F2D2A] text-text-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
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
                  className="inline-flex items-center px-5 py-3 rounded-full bg-[#2F2D2A] text-text-primary text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
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

export default Footer;
