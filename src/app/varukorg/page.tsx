"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Footer } from "@/components/ui/Footer";
import { CartItem, formatPriceKr, parsePriceKr, useCart } from "@/lib/cart";

const PICKUP_INFO =
  "Din beställning kommer vara färdig inom 2-3 dagar för upphämtning. Du hämtar ditt bröd på Norregatan 1 i Malmö. Undrar du om något så ring mig på 0707 43 85 95.";

const contact = {
  email: "info@tauberman.se",
  phone: "+46 707 43 85 95",
  instagram: "@degochdesign",
};

interface ConfirmedOrder {
  items: CartItem[];
  total: number;
  email: string;
}

export default function Varukorg() {
  const { items, updateQty, removeItem, clear, total } = useCart();
  const [email, setEmail] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  function handleSubmit() {
    if (items.length === 0 || !email) return;
    setConfirmedOrder({ items, total, email });
    clear();
  }

  return (
    <main className="bg-bg-default min-h-screen flex flex-col gap-4 p-2 sm:p-4">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-medium bg-brand-secondary text-brand-on-primary hover:opacity-90 transition-opacity"
        >
          Fortsätt handla
        </Link>
      </div>

      {confirmedOrder ? (
        <Confirmation order={confirmedOrder} />
      ) : (
        <>
          <section className="bg-bg-elevated rounded-[24px] p-6 sm:p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-h3 font-bold text-text-primary uppercase tracking-widest">
                Varukorg
              </h2>
              <hr className="border-border-default" />
            </div>

            {items.length === 0 ? (
              <p className="text-body-md text-text-secondary">Din varukorg är tom.</p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative size-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="64px" />
                    </div>
                    <p className="flex-1 text-body-lg font-bold text-text-primary">{item.title}</p>
                    <p className="text-body-lg font-bold text-text-primary">{item.price}</p>
                    <QuantityStepper
                      value={item.qty}
                      min={1}
                      onChange={(qty) => updateQty(item.id, qty)}
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="size-12 rounded-full bg-border-default inline-flex items-center justify-center text-text-primary hover:bg-border-strong transition-colors shrink-0"
                      aria-label={`Ta bort ${item.title}`}
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
                ))}

                <hr className="border-border-default" />
                <div className="flex items-center justify-between">
                  <p className="text-h3 font-bold text-text-primary uppercase tracking-widest">Totalt</p>
                  <p className="text-h3 font-bold text-text-primary">{formatPriceKr(total)}</p>
                </div>
              </>
            )}
          </section>

          <section className="bg-bg-elevated rounded-[24px] p-6 sm:p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-h3 font-bold text-text-primary uppercase tracking-widest">
                Dina uppgifter
              </h2>
              <hr className="border-border-default" />
            </div>

            <p className="text-body-md text-text-secondary">
              Ange din emailadress för att få information om din beställning samt när det är dags för
              upphämtning.
            </p>

            <Input
              type="email"
              required
              placeholder="Din emailadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="primary"
              size="md"
              disabled={items.length === 0 || !email}
              onClick={handleSubmit}
              className="w-full"
            >
              Slutför beställning
            </Button>
          </section>

          <PickupInfo />
        </>
      )}

      <Footer contact={contact} copyright="Copyright © Deg & Design 2026" />
    </main>
  );
}

function Confirmation({ order }: { order: ConfirmedOrder }) {
  return (
    <>
      <section className="bg-bg-elevated rounded-[24px] p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-h3 font-bold text-text-primary uppercase tracking-widest">
            Tack för din beställning
          </h2>
          <hr className="border-border-default" />
        </div>

        <p className="text-body-md text-text-secondary">
          Din beställning är mottagen. Vi skickar information till {order.email} när det är dags för
          upphämtning.
        </p>

        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative size-16 rounded-xl overflow-hidden shrink-0">
              <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="64px" />
            </div>
            <p className="flex-1 text-body-lg font-bold text-text-primary">{item.title}</p>
            <p className="text-body-md text-text-secondary">{item.qty} st</p>
            <p className="text-body-lg font-bold text-text-primary">
              {formatPriceKr(parsePriceKr(item.price) * item.qty)}
            </p>
          </div>
        ))}

        <hr className="border-border-default" />
        <div className="flex items-center justify-between">
          <p className="text-h3 font-bold text-text-primary uppercase tracking-widest">Totalt</p>
          <p className="text-h3 font-bold text-text-primary">{formatPriceKr(order.total)}</p>
        </div>
      </section>

      <PickupInfo />
    </>
  );
}

function PickupInfo() {
  return (
    <section className="bg-bg-elevated rounded-[24px] p-6 sm:p-8 flex items-start gap-3">
      <InfoIcon className="size-5 text-text-primary shrink-0 mt-0.5" />
      <p className="text-body-md text-text-secondary">{PICKUP_INFO}</p>
    </section>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-5 -5 26 28" fill="currentColor" aria-hidden="true">
      <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="9" cy="9" r="8" />
      <path d="M9 8v5M9 5.5v.01" strokeLinecap="round" />
    </svg>
  );
}
