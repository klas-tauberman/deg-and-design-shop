"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

export interface ToastState {
  id: number
  message: string
}

export interface ToastProps {
  toast: ToastState | null
  onClose: () => void
  duration?: number
}

/**
 * Transient confirmation message, portaled to body, bottom-anchored.
 * Auto-dismisses after `duration` ms. Announced via aria-live for screen readers.
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
    <div className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 pointer-events-none sm:bottom-8">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-bg-elevated text-text-primary text-base font-medium shadow-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <CheckIcon className="size-5 text-brand-primary shrink-0" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8.5L6 12.5L14 3.5" />
    </svg>
  )
}

export default Toast
