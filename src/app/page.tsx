"use client";

import { Hero } from "@/components/ui/Hero";
import { Footer } from "@/components/ui/Footer";
import { HomeProducts } from "./_HomeProducts";
import { useCart } from "@/lib/cart";

export default function Home() {
  const { count } = useCart();

  return (
    <main className="bg-bg-default min-h-screen flex flex-col gap-4 p-2 sm:p-4 max-w-[1440px] mx-auto">
      <Hero
        headline={<>DEG&<br />DESIGN</>}
        subtext="Lokala KRAV-märkta råvaror, lång kalljäsning, mjukt inkråm och en krispig, smakrik skorpa."
        backgroundImage="/images/hero.webp"
        backgroundImageAlt="Nybakat surdegsbröd"
        className="h-[478px] md:h-[530px]"
        nav={{
          links: [
            { label: "Bröd", href: "/", active: true },
            { label: "Om", href: "/om" },
          ],
          cta: { label: "Varukorg", href: "/varukorg", badge: count > 0 ? String(count) : undefined },
        }}
      />
      <HomeProducts />
      <Footer
        contact={{
          email: "info@tauberman.se",
          phone: "+46 707 43 85 95",
          instagram: "@degochdesign",
        }}
        copyright="Copyright © Deg & Design 2026"
      />
    </main>
  );
}
