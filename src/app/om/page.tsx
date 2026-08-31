"use client";

import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useCart } from "@/lib/cart";

export default function Om() {
  const { count } = useCart();

  return (
    <main className="bg-bg-default min-h-screen flex flex-col gap-4 p-2 sm:p-4 max-w-[1440px] mx-auto">
      <section className="relative overflow-hidden rounded-[32px] md:rounded-[var(--radius-block)] flex flex-col">
        <Image
          src="/images/hero.webp"
          alt="Nybakat surdegsbröd"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1440px"
        />
        <div className="absolute inset-0 bg-[#180c07]/[0.56] mix-blend-multiply" aria-hidden="true" />

        <div className="relative z-10 flex flex-col gap-8">
          <Navbar
            links={[
              { label: "Bröd", href: "/" },
              { label: "Om", href: "/om", active: true },
            ]}
            cta={{ label: "Varukorg", href: "/varukorg", badge: count > 0 ? String(count) : undefined }}
          />

          <h1
            className="px-3 sm:px-8 text-[80px] sm:text-[172px] font-bold text-text-primary tracking-tight"
            style={{ lineHeight: "0.82" }}
          >
            OM
          </h1>

          <div className="px-3 sm:px-8 pb-3 sm:pb-8 flex flex-col gap-6 sm:gap-8">
            <p className="text-[24px] md:text-[40px] font-bold text-text-primary" style={{ lineHeight: 1.3 }}>
              Året var 2018 när jag satte min första surdegsstart. Ingen stor plan, bara nyfikenhet och
              ett kök som snart luktade surt på ett bra sätt.
            </p>
            <p className="text-[24px] md:text-[40px] font-bold text-text-primary" style={{ lineHeight: 1.3 }}>
              I oktober 2024 hände något. Jag bakade mer än familjen kunde äta och insåg att jag blivit
              smått besatt. Inte konstigt, egentligen. Att mjöl, vatten och salt kan bli något så gott
              genom naturlig fermentering är fascinerande varje gång.
            </p>
            <p className="text-[24px] md:text-[40px] font-bold text-text-primary" style={{ lineHeight: 1.3 }}>
              Idag bakar jag fyra till sex bröd i veckan och tar beställningar. Jag formar varje deg för
              hand med traditionella metoder. Inget konstigt. Inga tillsatser. Bara ekologiskt mjöl,
              vatten, salt och den surdeg jag vårdat sedan 2018. Brödet får jäsa långsamt, vilket ger
              djupare smak och bättre hållbarhet.
            </p>
            <p className="text-[24px] md:text-[40px] font-bold text-text-primary" style={{ lineHeight: 1.3 }}>
              Jag ser det som ett litet uppror mot industribrödet. Det brödet som alltid smakar
              likadant, ser likadant ut och håller för länge av fel anledningar.
            </p>
            <p className="text-[24px] md:text-[40px] font-bold text-text-primary" style={{ lineHeight: 1.3 }}>
              Varje bröd är lite annorlunda. Det är hela poängen.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative aspect-square rounded-[32px] md:rounded-[var(--radius-block)] overflow-hidden">
          <Image
            src="/images/frallor.webp"
            alt="Nybakade frallor"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 704px"
          />
        </div>
        <div className="relative aspect-square rounded-[32px] md:rounded-[var(--radius-block)] overflow-hidden">
          <Image
            src="/images/levain.webp"
            alt="Levain surdegsbröd skivat"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 704px"
          />
        </div>
      </div>

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
