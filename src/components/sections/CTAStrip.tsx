"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

import { AnimatedBorder } from "@/components/ui/AnimatedBorder";

gsap.registerPlugin(ScrollTrigger);

export function CTAStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 overflow-hidden">
      <AnimatedBorder />
      <div className="container-grid">
        <div className="cta-text">
          {/* Eyebrow */}
          <span
            className="text-label text-accent block mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            06 / LET'S CONNECT
          </span>

          {/* Main text */}
          <h2
            className="font-bold text-text-primary leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Let's build
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px var(--color-text-primary)",
              }}
            >
              something
            </span>
            <br />
            <span className="text-accent">together.</span>
          </h2>

          {/* Action row */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{ marginTop: "3.5rem", paddingBottom: "2rem" }}
          >
            <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 bg-accent text-bg px-8 py-4 font-bold tracking-tight transition-colors duration-300 hover:bg-accent-hover"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Start a conversation
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>

            <a
              href="mailto:gabrielnathanael81@gmail.com"
              className="text-label text-text-secondary hover:text-accent transition-colors duration-300"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              gabrielnathanael81@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
