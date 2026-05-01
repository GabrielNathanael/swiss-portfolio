"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const isHovering = useRef(false);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(dotX, { damping: 35, stiffness: 200, mass: 0.8 });
  const ringY = useSpring(dotY, { damping: 35, stiffness: 200, mass: 0.8 });

  const dotScale = useSpring(1, springConfig);
  const ringScale = useSpring(1, { damping: 25, stiffness: 150 });
  const ringOpacity = useSpring(1, { damping: 25, stiffness: 150 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      dotScale.set(0);
      ringScale.set(1.6);
      ringOpacity.set(0.5);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      dotScale.set(1);
      ringScale.set(1);
      ringOpacity.set(1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Attach hover listeners to all interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label"
    );

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [dotX, dotY, dotScale, ringScale, ringOpacity]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          scale: dotScale,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          opacity: ringOpacity,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}