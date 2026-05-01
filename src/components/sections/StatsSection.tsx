// src/components/sections/StatsSection.tsx
/**
 * Stats Section
 * File: src/components/sections/StatsSection.tsx
 * Used in: Landing page + About page
 * Shows count-up numbers + currently working on
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import type { Experience } from "@/lib/contentful/types";

gsap.registerPlugin(ScrollTrigger);

interface StatsSectionProps {
  totalProjects: number;
  totalCertificates: number;
  totalExperiences: number;
  currentJobs: Experience[];
  sectionNumber?: string;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (el) el.textContent = Math.round(obj.val) + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${names[parseInt(month) - 1]} ${year}`;
}

export function StatsSection({
  totalProjects,
  totalCertificates,
  totalExperiences,
  currentJobs,
  sectionNumber = "—",
}: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    { value: 1,                  suffix: "+", label: "Years of experience" },
    { value: totalProjects,      suffix: "+", label: "Projects built" },
    { value: totalCertificates,  suffix: "+", label: "Certificates earned" },
    { value: totalExperiences,   suffix: "",  label: "Companies worked with" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        ".current-job",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".current-job",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <AnimatedBorder />
      <div className="container-grid section-padding">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[var(--color-border)]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item p-6 md:p-8 bg-[var(--color-surface)]"
            >
              <div
                className="font-bold text-[var(--color-text-primary)] leading-none mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p
                className="text-label text-[var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Currently working on */}
        {currentJobs.length > 0 && (
          <div className="current-job mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
              <span
                className="text-label text-[var(--color-text-tertiary)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Currently at
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 ml-4 sm:ml-0">
              {currentJobs.map((job, i) => (
                <span key={job.id} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-[var(--color-border)]">·</span>
                  )}
                  <span
                    className="font-medium text-[var(--color-text-primary)] text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {job.company}
                  </span>
                  <span className="text-[var(--color-text-secondary)] text-sm">
                    {job.position}
                  </span>
                  <span
                    className="text-label text-[var(--color-text-tertiary)]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {formatDate(job.startDate)} —
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}