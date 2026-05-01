/**
 * COMPONENT: Experience Strip Section
 * Used in: Landing page
 * File: src/components/sections/ExperienceStrip.tsx
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import type { Experience } from "@/lib/contentful/types";

import { AnimatedBorder } from "@/components/ui/AnimatedBorder";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceStripProps {
  experiences: Experience[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${names[parseInt(month) - 1]} ${year}`;
}

export function ExperienceStrip({ experiences }: ExperienceStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-row", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-padding">
      <AnimatedBorder />
      <div className="container-grid">
        {/* Header */}
        <div className="flex items-end justify-between" style={{ marginBottom: "2rem" }}>
          <div className="flex items-baseline gap-4">
            <span className="text-label text-[var(--color-text-tertiary)]">03</span>
            <h2
              className="font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              Experience
            </h2>
          </div>
          <Link
            href="/experience"
            className="group hidden md:flex items-center gap-3 text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            <span>Full history</span>
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>

        {/* Rows */}
        <div>
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="exp-row group border-t border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-300 py-4 md:py-5"
            >
              {/* Mobile layout */}
              <div className="flex items-start gap-5 md:hidden">
                <span className="shrink-0 text-label text-[var(--color-text-tertiary)] mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3
                      className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 truncate"
                      style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "-0.02em" }}
                    >
                      {exp.company}
                    </h3>
                    <span
                      className={`shrink-0 text-label px-2 py-0.5 border ${
                        exp.iscurrent
                          ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                          : "border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                      }`}
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {exp.employmentType}
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm">{exp.position}</p>
                  <p className="text-label text-[var(--color-text-tertiary)] mt-1">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </p>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:flex items-center justify-between gap-4">
                <div className="flex items-center gap-5 min-w-0">
                  <span className="shrink-0 text-label text-[var(--color-text-tertiary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3
                      className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 truncate"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.8vw, 1.4rem)", letterSpacing: "-0.02em" }}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mt-0.5">{exp.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={`text-label px-2 py-1 border ${
                      exp.iscurrent
                        ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                    }`}
                    style={{ borderRadius: "var(--radius-sm)" }}
                  >
                    {exp.employmentType}
                  </span>
                  <span className="text-label text-[var(--color-text-secondary)]">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-[var(--color-border)]" />
        </div>

        <div className="mt-6 md:hidden">
          <Link href="/experience" className="text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-3">
            <span>Full history</span>
            <span className="block w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}