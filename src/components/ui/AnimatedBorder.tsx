/**
 * Animated border-top reveal
 * File: src/components/ui/AnimatedBorder.tsx
 * Replaces static border-t — scaleX from left on scroll
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedBorderProps {
  className?: string;
  delay?: number;
}

export function AnimatedBorder({ className = "", delay = 0 }: AnimatedBorderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`h-px bg-[var(--color-border)] ${className}`}
      style={{ transformOrigin: "left" }}
    />
  );
}