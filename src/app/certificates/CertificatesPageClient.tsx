/**
 * CLIENT: Certificates Page
 * Route: /certificates
 * File: src/app/certificates/CertificatesPageClient.tsx
 * Features: issuer filter, pagination (8 per page), lightbox
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Certificate } from "@/lib/contentful/types";

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 8;

interface Props {
  certificates: Certificate[];
}

function getIssuers(certs: Certificate[]): string[] {
  return Array.from(new Set(certs.map((c) => c.issuer))).sort();
}

export function CertificatesPageClient({ certificates }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeIssuer, setActiveIssuer] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState<Certificate | null>(null);

  const filtered =
    activeIssuer === "All"
      ? certificates
      : certificates.filter((c) => c.issuer === activeIssuer);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeIssuer]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div ref={pageRef} className="page-offset">
      {/* Header */}
      <div className="container-grid page-header border-b border-[var(--color-border)]">
        <div className="swiss-grid items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <span
              className="cert-header-el text-label text-[var(--color-accent)] block mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              04 / CERTIFICATES
            </span>
            <h1
              className="cert-header-el font-bold text-[var(--color-text-primary)] leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--color-text-primary)" }}>My</span>
              <br />
              <span className="text-[var(--color-accent)]">Certificates</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="cert-header-el text-[var(--color-text-secondary)] leading-relaxed text-sm">
              {certificates.length} certifications from leading platforms and organisations.
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="container-grid py-5">
          <div className="flex flex-col gap-4">
            {/* All + count + Clear */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveIssuer("All")}
                  className={[
                    "px-4 py-2 border text-xs font-medium tracking-widest uppercase transition-colors duration-200",
                    activeIssuer === "All"
                      ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                  style={{ borderRadius: "var(--radius-sm)" }}
                >
                  All
                </button>
                <span
                  className="text-label text-[var(--color-text-tertiary)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {filtered.length} certificate{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              {activeIssuer !== "All" && (
                <button
                  onClick={() => setActiveIssuer("All")}
                  className="text-label text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-200 flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Clear ×
                </button>
              )}
            </div>

            {/* Issuer buttons — wrap on mobile */}
            <div className="flex flex-wrap gap-2">
              {getIssuers(certificates).map((issuer) => (
                <button
                  key={issuer}
                  onClick={() => setActiveIssuer(issuer)}
                  className={[
                    "px-3 py-1.5 border text-xs font-medium tracking-widest uppercase transition-colors duration-200",
                    activeIssuer === issuer
                      ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                  style={{ borderRadius: "var(--radius-sm)" }}
                >
                  {issuer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-grid py-10 md:py-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${activeIssuer}-${currentPage}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginated.map((cert, i) => (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group text-left w-full"
                onClick={() => setLightbox(cert)}
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[var(--color-text-primary)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  {cert.highlight && (
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-label text-[#F4F1EC]/90 bg-[var(--color-accent)] px-2 py-0.5"
                        style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <h3
                    className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug text-sm text-left"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                  >
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-[var(--color-text-secondary)]">{cert.issuer}</span>
                    <span
                      className="text-label text-[var(--color-text-tertiary)] text-xs"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-14 pt-8 border-t border-[var(--color-border)]">
            <span
              className="text-label text-[var(--color-text-tertiary)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={[
                    "w-10 h-10 flex items-center justify-center border text-label transition-colors duration-200",
                    currentPage === page
                      ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                  style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-[var(--color-text-primary)]/80 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 w-full max-w-xl bg-[var(--color-bg)]"
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <div
                className="relative h-64 bg-[var(--color-surface)] overflow-hidden"
                style={{ borderRadius: "var(--radius-md) var(--radius-md) 0 0" }}
              >
                <Image
                  src={lightbox.image}
                  alt={lightbox.title}
                  fill
                  className="object-contain p-4"
                  sizes="576px"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3
                    className="font-bold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "-0.02em" }}
                  >
                    {lightbox.title}
                  </h3>
                  <button
                    onClick={() => setLightbox(null)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {lightbox.issuer} · {lightbox.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}