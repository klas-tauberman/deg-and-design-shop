/**
 * Kitchen sink — visual QA page for all UI components in every variant and state.
 * Visit /kitchen-sink in dev to verify the design system is rendering correctly.
 */

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ContentCard } from "@/components/ui/Card";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import { PanelDrawerDemo } from "./_PanelDrawerDemo";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-[22px] font-bold text-text-secondary border-b border-border-default pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  );
}

export default function KitchenSink() {
  return (
    <div className="min-h-screen bg-bg-default text-text-primary">
      {/* ── Color palette ── */}
      <div className="px-8 py-12 flex flex-col gap-16">
        <div>
          <h1 className="text-h1 font-bold tracking-tight text-text-primary mb-2">
            Kitchen Sink
          </h1>
          <p className="text-base text-text-secondary">
            Every component · every variant · every state.
          </p>
        </div>

        {/* ── Panel & Drawer ── */}
        <Section title="Panel & Drawer">
          <PanelDrawerDemo />
        </Section>

        {/* ── Tokens: Colors ── */}
        <Section title="Color tokens">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-secondary font-medium">Backgrounds</p>
            <Row>
              {[
                ["bg-default", "var(--color-bg-default)", "#060202"],
                ["bg-surface", "var(--color-bg-surface)", "#090402"],
                ["bg-elevated", "var(--color-bg-elevated)", "#1A1818"],
              ].map(([name, , hex]) => (
                <div key={name} className="flex flex-col gap-1.5 w-28">
                  <div
                    className="h-14 rounded-lg border border-border-default"
                    style={{ backgroundColor: hex }}
                  />
                  <p className="text-xs text-text-secondary font-medium">{name}</p>
                  <p className="text-xs text-text-disabled font-mono">{hex}</p>
                </div>
              ))}
            </Row>

            <p className="text-sm text-text-secondary font-medium mt-2">Brand</p>
            <Row>
              {[
                ["brand-primary", "#FFC300"],
                ["brand-secondary", "#F9F6F2"],
                ["brand-on-primary", "#2E2421"],
              ].map(([name, hex]) => (
                <div key={name} className="flex flex-col gap-1.5 w-28">
                  <div
                    className="h-14 rounded-lg border border-border-default"
                    style={{ backgroundColor: hex }}
                  />
                  <p className="text-xs text-text-secondary font-medium">{name}</p>
                  <p className="text-xs text-text-disabled font-mono">{hex}</p>
                </div>
              ))}
            </Row>

            <p className="text-sm text-text-secondary font-medium mt-2">Neutrals</p>
            <div className="flex gap-2">
              {[50,100,200,300,400,500,600,700,800,900].map((n) => (
                <div key={n} className="flex flex-col gap-1 w-12">
                  <div
                    className={`h-10 rounded-md bg-neutral-${n}`}
                  />
                  <p className="text-[10px] text-text-disabled text-center">{n}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-text-secondary font-medium mt-2">Feedback</p>
            <Row>
              {[
                ["success", "#4CAF72"],
                ["warning", "#FFC300"],
                ["error",   "#E85C4A"],
                ["info",    "#4A90D9"],
              ].map(([name, hex]) => (
                <div key={name} className="flex flex-col gap-1.5 w-24">
                  <div className="h-10 rounded-md" style={{ backgroundColor: hex }} />
                  <p className="text-xs text-text-secondary font-medium">{name}</p>
                </div>
              ))}
            </Row>
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography">
          <div className="flex flex-col gap-4">
            {[
              { label: "Display (172px)", size: "172px", lh: "0.82", text: "DEG&\nDESIGN" },
              { label: "Display/2xl (56px)", size: "56px", lh: "64px", text: "Bröd för alla sinnen" },
              { label: "Display/xl (44px)", size: "44px", lh: "52px", text: "Bröd för alla sinnen" },
              { label: "Heading 1 (64px)", size: "64px", lh: "60px", text: "LEVAIN" },
              { label: "Heading 2 (40px)", size: "40px", lh: "52px", text: "vårvete & emmer" },
              { label: "Heading/h3 (22px)", size: "22px", lh: "1.4", text: "Ingredienser & metod" },
              { label: "Heading/h4 (18px)", size: "18px", lh: "1.4", text: "Ingredienser & metod" },
              { label: "Body/lg (18px)", size: "18px", lh: "1.7", text: "Lokala råvaror, 74% hydrering, minst 24 timmars jäsning." },
              { label: "Body/md (16px)", size: "16px", lh: "1.7", text: "Lokala råvaror, 74% hydrering, minst 24 timmars jäsning." },
              { label: "Body/sm (14px)", size: "14px", lh: "1.6", text: "Lokala råvaror, 74% hydrering, minst 24 timmars jäsning." },
              { label: "Label/md (14px Medium)", size: "14px", lh: "1.5", text: "Lägg i korgen", tracking: "0.01em", weight: "500" },
              { label: "Label/sm (12px Medium)", size: "12px", lh: "1.5", text: "Lägg i korgen", tracking: "0.02em", weight: "500" },
              { label: "Caption (12px)", size: "12px", lh: "1.5", text: "Copyright © Deg & Design 2026" },
            ].map((style) => (
              <div key={style.label} className="flex flex-col gap-1 border-b border-border-default pb-4">
                <p className="text-xs text-text-disabled font-medium">{style.label}</p>
                <p
                  className="text-text-primary font-bold whitespace-pre-line"
                  style={{
                    fontSize: style.size,
                    lineHeight: style.lh,
                    fontWeight: style.weight ?? "700",
                    letterSpacing: style.tracking,
                  }}
                >
                  {style.text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Quantity Stepper ── */}
        <Section title="Quantity Stepper">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-secondary">Default (min 1)</p>
            <Row><QuantityStepper /></Row>
            <p className="text-sm text-text-secondary">Min 0</p>
            <Row><QuantityStepper min={0} /></Row>
            <p className="text-sm text-text-secondary">Min 1, max 5</p>
            <Row><QuantityStepper min={1} max={5} /></Row>
          </div>
        </Section>

        {/* ── Button ── */}
        <Section title="Button">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-secondary">Variants</p>
            <Row>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </Row>

            <p className="text-sm text-text-secondary">Sizes</p>
            <Row>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Row>

            <p className="text-sm text-text-secondary">States</p>
            <Row>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="ghost" disabled>Disabled</Button>
            </Row>
          </div>
        </Section>

        {/* ── Input ── */}
        <Section title="Input">
          <div className="flex flex-col gap-4 max-w-sm">
            <Input label="Default" placeholder="Placeholder text" />
            <Input label="With value" defaultValue="Input value" />
            <Input label="Error state" defaultValue="Felaktig input" error="Det här fältet är obligatoriskt." />
            <Input label="Disabled" placeholder="Disabled field" disabled />
          </div>
        </Section>

        {/* ── Badge ── */}
        <Section title="Badge">
          <Row>
            <Badge variant="default">Default</Badge>
            <Badge variant="brand">Nyhet</Badge>
            <Badge variant="success">I lager</Badge>
            <Badge variant="warning">Begränsat</Badge>
            <Badge variant="error">Slutsåld</Badge>
          </Row>
        </Section>

        {/* ── Cards ── */}
        <Section title="Card — Content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <ContentCard
              title="Om Deg & Design"
              body="Ett hantverksbageri i Malmö som bakar surdegsbröd på beställning med lokala råvaror."
            />
            <ContentCard
              title="Vår metod"
              body="74% hydrering, minst 24 timmars jäsning, mjukt inkråm och en krispig, smakrik skorpa."
            />
          </div>
        </Section>

        {/* ── Navbar ── */}
        <Section title="Navbar">
          <div className="rounded-[var(--radius-block)] overflow-hidden bg-bg-surface">
            <Navbar
              links={[
                { label: "Bröd", href: "/brod" },
                { label: "Om", href: "/om" },
              ]}
              cta={{ label: "Varukorg", href: "/varukorg", badge: "2" }}
            />
          </div>
        </Section>

        {/* ── Footer ── */}
        <Section title="Footer">
          <div className="rounded-[var(--radius-block)] overflow-hidden bg-bg-default border border-border-default px-8">
            <Footer
              contact={{
                email: "info@tauberman.se",
                phone: "+46 707 43 85 95",
                instagram: "@degochdesign",
              }}
              copyright="Copyright © Deg & Design 2026"
            />
          </div>
        </Section>

        {/* ── Hero ── */}
        <Section title="Hero (no image)">
          <div className="h-[500px]">
            <Hero
              headline={<>DEG&<br />DESIGN</>}
              subtext="Lokala råvaror, 74% hydrering, minst 24 timmars jäsning, mjukt inkråm och en krispig, smakrik skorpa."
              nav={{
                links: [
                  { label: "Bröd", href: "/brod" },
                  { label: "Om", href: "/om" },
                ],
                cta: { label: "Varukorg", href: "/varukorg", badge: "2" },
              }}
              className="h-full bg-neutral-900"
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
