import { Hero } from "@/components/ui/Hero";
import { Footer } from "@/components/ui/Footer";
import { HomeProducts } from "./_HomeProducts";

export default function Home() {
  return (
    <main className="bg-bg-default min-h-screen flex flex-col gap-4 p-2 sm:p-4">
      <Hero
        headline={<>DEG&<br />DESIGN</>}
        subtext="Lokala råvaror, 74% hydrering, minst 24 timmars jäsning, mjukt inkråm och en krispig, smakrik skorpa."
        backgroundImage="/images/hero.webp"
        backgroundImageAlt="Nybakat surdegsbröd"
        className="h-[478px] md:h-[530px]"
        nav={{
          links: [
            { label: "Bröd", href: "/brod", active: true },
            { label: "Om", href: "/om" },
          ],
          cta: { label: "Varukorg", href: "/varukorg" },
          contact: {
            email: "info@tauberman.se",
            phone: "+46 707 43 85 95",
            instagram: "@degochdesign",
          },
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
