"use client"

import { createContext, useContext, useMemo, useState, useEffect, ReactNode } from "react"

const CART_STORAGE_KEY = "degochdesign-cart"

export interface CartItem {
  id: string
  title: string
  image: string
  imageAlt: string
  price: string
  qty: number
}

export function parsePriceKr(price: string): number {
  return parseInt(price, 10) || 0
}

export function formatPriceKr(amount: number): string {
  return `${amount} kr`
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "qty">, qty: number) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {
      // ignore corrupt or unavailable storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore write failures (private mode, quota, etc.)
    }
  }, [items, hydrated])

  function addItem(item: Omit<CartItem, "qty">, qty: number) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...item, qty }]
    })
  }

  function updateQty(id: string, qty: number) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clear() {
    setItems([])
  }

  const total = useMemo(
    () => items.reduce((sum, i) => sum + parsePriceKr(i.price) * i.qty, 0),
    [items]
  )
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
