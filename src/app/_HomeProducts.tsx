"use client"

import { useState } from "react";
import { ProductCard } from "@/components/ui/Card";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Toast, ToastState } from "@/components/ui/Toast";
import { formatPriceKr, parsePriceKr, useCart } from "@/lib/cart";

interface Product {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  price: string;
  label: string;
  description: string;
  ingredients: { name: string; desc: string }[];
}

const products: Product[] = [
  {
    id: "levain",
    image: "/images/levain.webp",
    imageAlt: "Levain surdegsbröd skivat",
    title: "LEVAIN",
    subtitle: "vårvete & emmer",
    price: "70 kr",
    label: "KRAV-ekologiskt",
    description:
      "Bakat på lokalt odlat vårvete och uråldrigt emmer · minst 24 timmars jäsning ger ett djupt, komplext smakdjup och ett mjukt, öppet inkråm med krispig skorpa.",
    ingredients: [
      { name: "Vetemjöl (Qvarna vårvete)", desc: "Ekologiskt ljust siktat, protein ~12,5 g/100 g · KRAV" },
      { name: "Emmerfullkornsmjöl", desc: "Fullkornsmjöl av valsmalet emmer · KRAV · protein 14 g/100 g · fiber 12 g/100 g" },
      { name: "Vatten", desc: "74 % hydrering" },
      { name: "Surdegsstarter", desc: "Aktiv levain av vetemjöl & vatten" },
      { name: "Havssalt", desc: "" },
    ],
  },
  {
    id: "frallor",
    image: "/images/frallor.webp",
    imageAlt: "Frallor med vallmo",
    title: "8st FRALLOR",
    subtitle: "vårvete, emmer & vallmo",
    price: "70 kr",
    label: "KRAV-ekologiskt",
    description:
      "Luftiga frallor bakade på vårvete och emmer med ett knaprigt vallmotäcke. Perfekta till frukost eller lunch.",
    ingredients: [
      { name: "Vetemjöl (Qvarna vårvete)", desc: "Ekologiskt ljust siktat · KRAV" },
      { name: "Emmerfullkornsmjöl", desc: "Fullkornsmjöl av valsmalet emmer · KRAV" },
      { name: "Vallmofrön", desc: "" },
      { name: "Vatten", desc: "72 % hydrering" },
      { name: "Surdegsstarter", desc: "Aktiv levain av vetemjöl & vatten" },
      { name: "Havssalt", desc: "" },
    ],
  },
];

function ProductDetail({
  product,
  onOrdered,
}: {
  product: Product;
  onOrdered: (product: Product) => void;
}) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  function handleOrder() {
    addItem(
      {
        id: product.id,
        title: product.title,
        image: product.image,
        imageAlt: product.imageAlt,
        price: product.price,
      },
      qty
    );
    onOrdered(product);
  }

  return (
    <div className="flex flex-col gap-4 pr-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-text-secondary uppercase tracking-wider">
          {product.label}
        </p>
        <h2 className="text-4xl font-bold text-text-primary tracking-tight">
          {product.title}
        </h2>
        <p className="text-body-lg text-text-secondary mt-1">
          {product.description}
        </p>
      </div>
      <hr className="border-border-default" />
      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-bold text-text-primary uppercase tracking-widest">
          Innehåller
        </h3>
        <hr className="border-border-default" />
        {product.ingredients.map((item) => (
          <div key={item.name}>
            <p className="text-body-md font-bold text-text-primary">{item.name}</p>
            {item.desc && (
              <p className="text-body-md text-text-secondary">{item.desc}</p>
            )}
          </div>
        ))}
      </div>
      <hr className="border-border-default" />
      <div className="flex items-center gap-3 pt-1">
        <QuantityStepper value={qty} onChange={setQty} />
        <Button variant="primary" size="md" onClick={handleOrder}>
          Lägg till · {formatPriceKr(parsePriceKr(product.price) * qty)}
        </Button>
      </div>
    </div>
  );
}

export function HomeProducts() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = products.find((p) => p.id === activeId) ?? null;
  const { addItem } = useCart();
  const [toast, setToast] = useState<ToastState | null>(null);

  function announceAdded(product: Product) {
    setToast({ id: Date.now(), message: `${product.title} har lagts till i varukorgen` });
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          imageAlt={product.imageAlt}
          title={product.title}
          subtitle={product.subtitle}
          price={product.price}
          onReadMore={() => setActiveId(product.id)}
          onBuy={() => {
            addItem(
              {
                id: product.id,
                title: product.title,
                image: product.image,
                imageAlt: product.imageAlt,
                price: product.price,
              },
              1
            );
            announceAdded(product);
          }}
        />
      ))}

      <Panel open={active !== null} onClose={() => setActiveId(null)}>
        {active && (
          <ProductDetail
            product={active}
            onOrdered={(product) => {
              setActiveId(null);
              announceAdded(product);
            }}
          />
        )}
      </Panel>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
