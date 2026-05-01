// src/components/ui/ProgressBar.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const timeline = useRef<gsap.core.Tween | null>(null);

  // Start progress on any <a> click (link click = navigation start)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) return;

      isNavigating.current = true;
      const bar = barRef.current;
      if (!bar) return;

      // Reset and show bar
      bar.style.opacity = "1";
      bar.style.width = "0%";

      // Animate to 80% — hold there until pathname changes
      timeline.current = gsap.to(bar, {
        width: "80%",
        duration: 0.8,
        ease: "power2.out",
      });
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  // Complete bar when pathname changes (navigation done)
  useEffect(() => {
    if (!isNavigating.current) return;
    isNavigating.current = false;

    const bar = barRef.current;
    if (!bar) return;

    timeline.current?.kill();

    gsap.to(bar, {
      width: "100%",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(bar, {
          opacity: 0,
          duration: 0.4,
          delay: 0.1,
          onComplete: () => {
            bar.style.width = "0%";
            bar.style.opacity = "1";
          },
        });
      },
    });
  }, [pathname]);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: "0%",
        backgroundColor: "var(--color-accent)",
        zIndex: 9999,
        opacity: 1,
        transformOrigin: "left",
        pointerEvents: "none",
      }}
    />
  );
}