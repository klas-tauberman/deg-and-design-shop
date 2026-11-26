"use client"

import { useRef, useState } from "react";
import { ProductCard } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Motion";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Toast, ToastState } from "@/components/ui/Toast";
import { formatPriceKr, parsePriceKr, useCart } from "@/lib/cart";

interface Product {
  id: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  price: string;
  label: string;
  description: string;
  ingredients: { name: string; desc: string }[];
  weight?: string;
  hidden?: boolean;
}

const products: Product[] = [
  {
    id: "levain",
    weight: "ca 1 kg",
    image: "/images/levain.webp",
    imageAlt: "Levain surdegsbröd skivat",
    title: "LEVAIN",
    subtitle: "vårvete & emmer",
    price: "70 kr",
    label: "KRAV-ekologiskt",
    description:
      "Bakat på lokalt odlat vårvete och emmer. Degen kalljäser under natten vilket ger ett djupt, komplext smakdjup och ett mjukt, öppet inkråm med krispig skorpa.",
    ingredients: [
      { name: "Vetemjöl (Warbro kvarn)", desc: "" },
      { name: "Emmer fullkorn (Limbacka kvarn)", desc: "" },
      { name: "Vatten", desc: "" },
      { name: "Salt", desc: "" },
    ],
  },
  {
    id: "levain-stort",
    weight: "ca 1,6 kg",
    image: "/images/levain-stort.webp",
    mobileImage: "/images/levain-stort-mobil.webp",
    imageAlt: "Stort levain surdegsbröd",
    title: "STORT LEVAIN",
    subtitle: "vårvete & emmer",
    price: "120 kr",
    label: "KRAV-ekologiskt",
    description:
      "Bakat på lokalt odlat vårvete och emmer. Degen kalljäser under natten vilket ger ett djupt, komplext smakdjup och ett mjukt, öppet inkråm med krispig skorpa.",
    ingredients: [
      { name: "Vetemjöl (Warbro kvarn)", desc: "" },
      { name: "Emmer fullkorn (Limbacka kvarn)", desc: "" },
      { name: "Vatten", desc: "" },
      { name: "Salt", desc: "" },
    ],
  },
  {
    id: "emmer",
    weight: "ca 800 g",
    image: "/images/emmer.webp",
    imageAlt: "Skivat emmerbröd på surdeg",
    title: "EMMER",
    subtitle: "emmer & enkorn",
    price: "70 kr",
    label: "KRAV-ekologiskt",
    description:
      "Bakat på fullkorn av emmer och enkorn, två av våra äldsta vetesorter, och jäst på vetesurdeg. Degen kalljäser under natten vilket ger ett djupt, komplext smakdjup, ett mörkt inkråm och en krispig skorpa.",
    ingredients: [
      { name: "Emmer fullkorn (Limbacka kvarn)", desc: "" },
      { name: "Enkorn fullkorn (Warbro kvarn)", desc: "" },
      { name: "Vetesurdeg", desc: "" },
      { name: "Vatten", desc: "" },
      { name: "Salt", desc: "" },
    ],
  },
  {
    id: "frallor",
    hidden: true,
    image: "/images/frallor.webp",
    imageAlt: "Frallor med vallmo",
    title: "8st FRALLOR",
    subtitle: "vårvete, emmer & vallmo",
    price: "70 kr",
    label: "KRAV-ekologiskt",
    description:
      "Luftiga frallor bakade på lokalt odlat vårvete och emmer med ett knaprigt täcke av vallmo- och sesamfrön. Perfekta till frukost eller lunch.",
    ingredients: [
      { name: "Vetemjöl (Warbro kvarn)", desc: "" },
      { name: "Emmer fullkorn (Limbacka kvarn)", desc: "" },
      { name: "Vallmofrön", desc: "" },
      { name: "Sesamfrön", desc: "" },
      { name: "Vatten", desc: "" },
      { name: "Salt", desc: "" },
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
        <p className="text-body-lg font-normal text-text-primary mt-1">
          {product.description}
        </p>
        {product.weight && (
          <p className="text-body-md text-text-secondary mt-1">Vikt: {product.weight}</p>
        )}
      </div>
      <hr className="border-border-default" />
      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-bold text-text-primary uppercase tracking-widest">
          Innehåller
        </h3>
        <hr className="border-border-default" />
        <ul className="flex flex-col gap-3 list-disc pl-5 marker:text-text-secondary">
          {product.ingredients.map((item) => (
            <li key={item.name}>
              <p className="text-body-md font-normal text-text-primary">{item.name}</p>
              {item.desc && (
                <p className="text-body-md text-text-secondary">{item.desc}</p>
              )}
            </li>
          ))}
        </ul>
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
  const toastId = useRef(0);

  function announceAdded(product: Product) {
    toastId.current += 1;
    setToast({ id: toastId.current, title: product.title, image: product.image, imageAlt: product.imageAlt });
  }

  return (
    <>
      {products.filter((product) => !product.hidden).map((product) => (
        <Reveal key={product.id}>
        <ProductCard
          image={product.image}
          mobileImage={product.mobileImage}
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
        </Reveal>
      ))}

      <Panel open={active !== null} onClose={() => setActiveId(null)}>
        {active && (
          <ProductDetail
            product={active}
            onOrdered={(product) => announceAdded(product)}
          />
        )}
      </Panel>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
