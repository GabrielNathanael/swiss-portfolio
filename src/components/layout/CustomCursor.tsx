"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Mobile & Touchscreen Check
    // Strictly disabled on touch devices / coarse pointers.
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const checkPointer = () => {
      setIsEnabled(mediaQuery.matches);
    };

    checkPointer();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", checkPointer);
    } else {
      mediaQuery.addListener(checkPointer);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", checkPointer);
      } else {
        mediaQuery.removeListener(checkPointer);
      }
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let isVisible = false;
    let isHovered = false;

    // Zero-delay instant hardware tracking
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }

      if (trackerRef.current) {
        trackerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => {
      if (trackerRef.current) {
        trackerRef.current.classList.add("is-clicking");
      }
    };

    const onMouseUp = () => {
      if (trackerRef.current) {
        trackerRef.current.classList.remove("is-clicking");
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    // Event delegation for interactive elements across all pages
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover], .cursor-pointer'
      );

      if (interactive && !isHovered) {
        isHovered = true;
        if (trackerRef.current) trackerRef.current.classList.add("is-hovered");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover], .cursor-pointer'
      );

      if (interactive && isHovered) {
        // Prevent flicker when moving between child elements of the same interactive target
        const related = e.relatedTarget as HTMLElement | null;
        if (related && interactive.contains(related)) return;

        isHovered = false;
        if (trackerRef.current) trackerRef.current.classList.remove("is-hovered");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isEnabled]);

  // Completely unmounted on mobile/touch screens: 0 DOM nodes, 0 memory, 0 stuck bugs
  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      className="custom-cursor-container"
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      <div ref={trackerRef} className="cursor-cross-tracker">
        <div className="cursor-cross-scaler">
          <div className="cursor-cross-spinner">
            <svg
              viewBox="0 0 32 32"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Precision Swiss Crosshair */}
              <line
                x1="16"
                y1="4"
                x2="16"
                y2="28"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <line
                x1="4"
                y1="16"
                x2="28"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />

              {/* Precision Corner Brackets (appear on hover) */}
              <path
                d="M8 12V8h4"
                stroke="currentColor"
                strokeWidth="1.2"
                className="cursor-cross-bracket"
              />
              <path
                d="M20 8h4v4"
                stroke="currentColor"
                strokeWidth="1.2"
                className="cursor-cross-bracket"
              />
              <path
                d="M8 20v4h4"
                stroke="currentColor"
                strokeWidth="1.2"
                className="cursor-cross-bracket"
              />
              <path
                d="M20 24h4v-4"
                stroke="currentColor"
                strokeWidth="1.2"
                className="cursor-cross-bracket"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}