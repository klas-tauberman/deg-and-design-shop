"use client"

import { useState } from "react"
import { Panel } from "@/components/ui/Panel"
import { Drawer } from "@/components/ui/Drawer"
import { Button } from "@/components/ui/Button"

const ingredients = [
  { name: "Vetemjöl (Qvarna vårvete)", desc: "Ekologiskt ljust siktat, protein ~12,5 g/100 g · KRAV" },
  { name: "Emmerfullkornsmjöl", desc: "Fullkornsmjöl av valsmalet emmer · KRAV · protein 14 g/100 g · fiber 12 g/100 g" },
  { name: "Vatten", desc: "74 % hydrering" },
  { name: "Surdegsstarter", desc: "Aktiv levain av vetemjöl & vatten" },
  { name: "Havssalt", desc: "" },
]

function ProductContent() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-col gap-4 pr-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-text-secondary uppercase tracking-wider">KRAV-ekologiskt</p>
        <h2 className="text-4xl font-bold text-text-primary tracking-tight">LEVAIN</h2>
        <p className="text-body-lg text-text-secondary mt-1">
          Bakat på lokalt odlat vårvete och uråldrigt emmer · minst 24 timmars jäsning ger ett
          djupt, komplext smakdjup och ett mjukt, öppet inkråm med krispig skorpa.
        </p>
      </div>
      <hr className="border-border-default" />
      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-bold text-text-primary uppercase tracking-widest">
          Innehåller
        </h3>
        <hr className="border-border-default" />
        {ingredients.map((item) => (
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
        <div className="inline-flex items-center gap-4 px-5 py-3 rounded-full bg-brand-secondary text-brand-on-primary font-medium text-base">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="leading-none" aria-label="Minska antal">−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="leading-none" aria-label="Öka antal">+</button>
        </div>
        <Button variant="primary" size="md">Köp · 70 kr</Button>
      </div>
    </div>
  )
}

export function PanelDrawerDemo() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setPanelOpen(true)}>
          Open Panel
        </Button>
        <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
          Open Drawer
        </Button>
      </div>

      <Panel open={panelOpen} onClose={() => setPanelOpen(false)}>
        <ProductContent />
      </Panel>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <ProductContent />
      </Drawer>
    </>
  )
}
