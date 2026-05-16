"use client"

import { useEffect, useId, useState, ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

export interface PanelProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Panel({ open, onClose, children, className = "" }: PanelProps) {
  const labelId = useId()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="panel-backdrop"
            className="fixed inset-0 z-40 bg-neutral-900/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            tabIndex={-1}
            className={[
              "fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm",
              "overflow-y-auto bg-bg-elevated rounded-l-[20px] p-6 outline-none",
              className,
            ].filter(Boolean).join(" ")}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Stäng"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div id={labelId}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Panel
