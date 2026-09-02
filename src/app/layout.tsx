import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.degochdesign.se"),
  title: {
    default: "Deg & Design — Hembakat surdegsbröd",
    template: "%s | Deg & Design",
  },
  description:
    "Hembakat surdegsbröd med lokala KRAV-märkta råvaror, lång kalljäsning, mjukt inkråm och en krispig, smakrik skorpa. Inga tillsatser — bara mjöl, vatten, salt och surdeg.",
  keywords: ["surdegsbröd", "surdeg", "hembakat bröd", "KRAV-märkt", "ekologiskt bröd", "Deg & Design"],
  openGraph: {
    title: "Deg & Design — Hembakat surdegsbröd",
    description:
      "Lokala KRAV-märkta råvaror, lång kalljäsning och en krispig, smakrik skorpa. En liten resning mot det industriella brödet.",
    url: "https://www.degochdesign.se",
    siteName: "Deg & Design",
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Deg & Design — hembakat surdegsbröd" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deg & Design — Hembakat surdegsbröd",
    description:
      "Lokala KRAV-märkta råvaror, lång kalljäsning, mjukt inkråm och en krispig, smakrik skorpa.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" data-theme="dark" className="h-full">
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
