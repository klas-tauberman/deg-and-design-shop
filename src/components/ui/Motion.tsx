"use client";

import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Background-image parallax. Fills its (overflow-hidden) parent and moves the
 * children a little slower than the page while the parent scrolls past.
 * The inner layer overhangs the parent by 48px top and bottom, more than the
 * 40px travel, so edges never show.
 */
export function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div
        className="absolute inset-x-0 -top-12 -bottom-12 will-change-transform"
        style={reduce ? undefined : { y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Fades a section in from slightly below the first time it enters the viewport. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
