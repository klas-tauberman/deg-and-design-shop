"use client"

import { useEffect, useId, useState, ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useDragControls } from "framer-motion"

export interface DrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Drawer({ open, onClose, children, className = "" }: DrawerProps) {
  const labelId = useId()
  const [mounted, setMounted] = useState(false)
  const dragControls = useDragControls()

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
            key="drawer-backdrop"
            className="fixed inset-0 z-40 bg-neutral-900/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            tabIndex={-1}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.velocity.y > 500 || info.offset.y > 150) onClose()
            }}
            className={[
              "fixed bottom-0 inset-x-0 z-50 outline-none",
              "bg-bg-elevated rounded-t-[20px]",
              className,
            ].filter(Boolean).join(" ")}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Only the handle triggers drag, preserving scroll in content */}
            <div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 bg-white/30 rounded-full" />
            </div>
            <div
              id={labelId}
              className="max-h-[calc(90vh-2.5rem)] overflow-y-auto px-6 pb-8"
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Drawer
