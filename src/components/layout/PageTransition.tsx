"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.7, 0, 1, 0.3] },
  },
};

// Overlay swipe
const overlayVariants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  enter: {
    scaleY: [0, 1, 1, 0],
    transformOrigin: ["bottom", "bottom", "top", "top"],
    transition: { duration: 0.9, times: [0, 0.4, 0.5, 1], ease: "easeInOut" },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={pathname} variants={variants} initial="initial" animate="enter" exit="exit" className="flex-1 flex flex-col">
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Vermillion swipe overlay */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${pathname}`}
          className="page-transition-overlay"
          variants={overlayVariants}
          initial="initial"
          animate="enter"
        />
      </AnimatePresence>
    </>
  );
}