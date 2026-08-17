/**
 * COMPONENT: Experience Timeline Section
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
  const names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${names[parseInt(month) - 1]} ${year}`;
}

function formatDuration(
  startDate: string,
  endDate: string | null,
  iscurrent: boolean,
): string {
  const start = new Date(startDate);
  const end = iscurrent || !endDate ? new Date() : new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1; // inclusive of the starting month
  months = Math.max(months, 1);

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remMonths > 0 || years === 0)
    parts.push(`${remMonths} mo${remMonths !== 1 ? "s" : ""}`);

  return parts.join(" ");
}

export function ExperienceStrip({ experiences }: ExperienceStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The vertical line fills in as the timeline scrolls through view
      if (trackRef.current && progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 70%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          },
        );
      }

      // Each entry reveals on its own as it individually scrolls into view —
      // not all at once, so the timeline plays out as you scroll.
      const rows = gsap.utils.toArray<HTMLElement>(".exp-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 84%",
              once: true,
            },
          },
        );

        const dot = row.querySelector(".exp-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2.5)",
              scrollTrigger: {
                trigger: row,
                start: "top 84%",
                once: true,
              },
            },
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [experiences]);

  if (experiences.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-padding">
      <AnimatedBorder />
      <div className="container-grid">
        {/* Header */}
        <div
          className="flex items-end justify-between"
          style={{ marginBottom: "2.5rem" }}
        >
          <div className="flex items-baseline gap-4">
            <span className="text-label text-[var(--color-text-tertiary)]">
              03
            </span>
            <h2
              className="font-bold text-[var(--color-text-primary)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
              }}
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

        {/* Timeline */}
        <div ref={trackRef} className="relative">
          {/* Static hairline track */}
          <div
            className="absolute top-0 bottom-0 w-px left-[15px] md:left-[19px]"
            style={{ backgroundColor: "var(--color-border)" }}
            aria-hidden="true"
          />
          {/* Accent line that fills in as you scroll */}
          <div
            ref={progressRef}
            className="absolute top-0 bottom-0 w-px left-[15px] md:left-[19px] origin-top"
            style={{ backgroundColor: "var(--color-accent)" }}
            aria-hidden="true"
          />

          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="exp-row relative flex gap-5 md:gap-6 pb-10 last:pb-0"
            >
              {/* Node column */}
              <div className="relative w-[30px] md:w-[38px] shrink-0 flex justify-center">
                {exp.iscurrent && (
                  <span
                    className="absolute mt-[7px] w-3 h-3 rounded-full animate-ping"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      opacity: 0.5,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className="exp-dot relative mt-[7px] w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: exp.iscurrent
                      ? "var(--color-accent)"
                      : "var(--color-bg, transparent)",
                    borderColor: exp.iscurrent
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="group flex-1 min-w-0 -mt-0.5 transition-transform duration-300 hover:translate-x-1">
                <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                  <h3
                    className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)",
                      letterSpacing: "-0.02em",
                    }}
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
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {exp.position}
                  {exp.location && (
                    <span className="text-[var(--color-text-tertiary)]">
                      {" "}
                      · {exp.location}
                    </span>
                  )}
                </p>
                <p className="text-label text-[var(--color-text-tertiary)] mt-1.5">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  <span
                    className="mx-1.5 inline-block w-1 h-1 rounded-full align-middle"
                    style={{ backgroundColor: "var(--color-text-tertiary)" }}
                    aria-hidden="true"
                  />
                  {formatDuration(exp.startDate, exp.endDate, exp.iscurrent)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/experience"
            className="text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-3"
          >
            <span>Full history</span>
            <span className="block w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}
