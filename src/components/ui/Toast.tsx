"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export interface ToastState {
  id: number
  title: string
  image: string
  imageAlt: string
}

export interface ToastProps {
  toast: ToastState | null
  onClose: () => void
  duration?: number
}

/**
 * Transient confirmation toast, portaled to body, pinned top-right.
 * Matches the Figma Toast component: product thumbnail + message, "Visa"
 * button linking to the cart. Auto-dismisses after `duration` ms.
 * Announced via aria-live for screen readers.
 */
export function Toast({ toast, onClose, duration = 3000 }: ToastProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [toast, duration, onClose])

  if (!mounted) return null

  return createPortal(
    <div className="fixed top-4 right-4 z-[60] flex justify-end pointer-events-none sm:top-8 sm:right-8">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex items-center gap-4 p-3 rounded-xl bg-bg-surface shadow-lg"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center gap-2 pl-1">
              <div className="relative size-12 rounded-lg overflow-hidden shrink-0">
                <Image src={toast.image} alt={toast.imageAlt} fill className="object-cover" sizes="48px" />
              </div>
              <p className="text-base font-medium text-text-primary whitespace-nowrap">
                {toast.title} tillagt i varukorgen
              </p>
            </div>
            <Link
              href="/varukorg"
              onClick={onClose}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full text-base font-medium bg-[#2F2D2A] text-[#E4E4E4] hover:bg-bg-elevated transition-colors shrink-0"
            >
              Visa
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  )
}

export default Toast
