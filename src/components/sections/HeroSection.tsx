/**
 * COMPONENT: Hero Section
 * File: src/components/sections/HeroSection.tsx
 * Features: Text scramble effect on load
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useScramble(text: string, ref: React.RefObject<HTMLElement | null>, delay = 0) {
  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length * 3;
    const interval = setInterval(() => {
      if (!ref.current) return;
      ref.current.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return "\u00A0";
          if (i < Math.floor(iteration / 3)) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        if (ref.current) ref.current.textContent = text;
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, ref]);

  useEffect(() => {
    const t = setTimeout(scramble, delay);
    return () => clearTimeout(t);
  }, [scramble, delay]);
}

function ScrambleText({
  text,
  className,
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useScramble(text, ref, delay);

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      aria-label={text}
    >
      {text}
    </span>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in meta elements after scramble
    const els = heroRef.current?.querySelectorAll(".hero-meta");
    if (!els) return;
    els.forEach((el, i) => {
      (el as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        (el as HTMLElement).style.transition = "opacity 0.8s ease, transform 0.8s ease";
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 900 + i * 100);
      (el as HTMLElement).style.transform = "translateY(12px)";
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden page-offset"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 0.04 }}>
        {[...Array(13)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-[var(--color-text-primary)]"
            style={{ left: `${(i / 12) * 100}%` }}
          />
        ))}
      </div>

      {/* Top rule */}
      <div className="container-grid pt-12">
        <div className="hero-rule h-px bg-[var(--color-border)]" />
      </div>

      {/* Main content */}
      <div className="container-grid flex-1 flex flex-col justify-center py-10 md:py-14">
        <div className="relative">
          <p className="hero-meta text-label text-[var(--color-text-tertiary)] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}>
            01 / INDEX
          </p>

          {/* Name with scramble effect */}
          <h1 className="leading-none tracking-tight select-none">
            {/* GABRIEL */}
            <div className="block overflow-hidden">
              <ScrambleText
                text="GABRIEL"
                className="block font-bold text-[var(--color-text-primary)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 13vw, 12rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "0.92",
                }}
                delay={0}
              />
            </div>

            {/* NATHANAEL — outlined, offset */}
            <div
              className="block overflow-hidden mt-1 md:mt-2"
              style={{ paddingLeft: "clamp(0.75rem, 4vw, 6rem)" }}
            >
              <ScrambleText
                text="NATHANAEL"
                className="block font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.1rem, 8.5vw, 8.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "0.92",
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--color-text-primary)",
                }}
                delay={150}
              />
            </div>

            {/* PURBA — accent */}
            <div className="block overflow-hidden mt-1 md:mt-2">
              <ScrambleText
                text="PURBA"
                className="block font-bold text-[var(--color-accent)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 13vw, 12rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "0.92",
                }}
                delay={300}
              />
            </div>
          </h1>

          {/* Role + CTA */}
          <div className="hero-meta mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="flex flex-col gap-2">
              <span
                className="text-label text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Full Stack Developer
              </span>
              <p
                className="text-[var(--color-text-secondary)] max-w-sm leading-relaxed"
                style={{ fontSize: "0.9rem" }}
              >
                Building performant, scalable web applications with a focus on
                developer experience and clean architecture.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/work"
                className="group flex items-center gap-3 text-label text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span>View Work</span>
                <span className="block w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
              </Link>
              <Link
                href="/contact"
                className="text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="container-grid pb-8">
        <div className="hero-rule h-px bg-[var(--color-border)] mb-5" />
        <div className="flex items-center justify-between">
          <span className="hero-meta text-label text-[var(--color-text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}>
            Based in Indonesia
          </span>
          <span className="hero-meta text-label text-[var(--color-text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}>
            Available for freelance
          </span>
        </div>
      </div>
    </section>
  );
}