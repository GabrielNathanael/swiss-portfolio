/**
 * COMPONENT: Certificate Glimpse Section
 * Used in: Landing page
 * Data: passed as props from server component
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Certificate } from "@/lib/contentful/types";

import { AnimatedBorder } from "@/components/ui/AnimatedBorder";

gsap.registerPlugin(ScrollTrigger);

interface CertificateGlimpseProps {
  certificates: Certificate[];
}

export function CertificateGlimpse({ certificates }: CertificateGlimpseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-card", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (certificates.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-padding">
      <AnimatedBorder />
      <div className="container-grid">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div className="flex items-baseline gap-4">
            <span className="text-label text-[var(--color-text-tertiary)]">04</span>
            <h2
              className="font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              Certificates
            </h2>
          </div>
          <Link href="/certificates" className="group hidden md:flex items-center gap-3 text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300">
            <span>View all</span>
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="cert-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative h-44 overflow-hidden bg-[var(--color-surface)]"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[var(--color-text-primary)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                {cert.highlight && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-label text-[#F4F1EC]/80 bg-[var(--color-accent)]/80 px-2 py-0.5"
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h3
                  className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug text-sm"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                >
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[var(--color-text-secondary)] text-xs">{cert.issuer}</span>
                  <span className="text-label text-[var(--color-text-tertiary)] text-xs">{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/certificates" className="text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-3">
            <span>View all</span>
            <span className="block w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}