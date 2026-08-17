/**
 * CLIENT: Experience Page
 * Handles: animations, display
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Experience } from "@/lib/contentful/types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
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

export function ExperiencePageClient({ experiences }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header-el",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
      );
      gsap.fromTo(
        ".exp-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".exp-list", start: "top 80%", once: true },
        },
      );
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-list",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="page-offset">
      {/* Header */}
      <div className="container-grid page-header border-b border-border">
        <div className="swiss-grid items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <span className="exp-header-el text-label text-accent block mb-3">
              03 / EXPERIENCE
            </span>
            <h1
              className="exp-header-el font-bold text-text-primary leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Work
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--color-text-primary)",
                }}
              >
                History
              </span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="exp-header-el text-text-secondary leading-relaxed text-sm">
              {experiences.length} roles across product companies, studios, and
              freelance engagements.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="exp-list container-grid section-padding">
        <div className="swiss-grid">
          <div className="col-span-12 md:col-start-2 md:col-span-10 relative">
            <div
              className="absolute left-0 top-6 bottom-6 w-px bg-border hidden md:block"
              style={{ left: "-1px" }}
              aria-hidden="true"
            />
            <div
              className="timeline-line absolute left-0 top-6 bottom-6 w-px bg-accent origin-top hidden md:block"
              style={{ left: "-1px" }}
              aria-hidden="true"
            />
            {experiences.map((exp: Experience, i: number) => (
              <div
                key={exp.id}
                className="exp-item group relative md:pl-10 py-10 border-b border-border"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-16 w-2.5 h-2.5 rounded-full border-2 border-border bg-bg group-hover:border-accent group-hover:bg-accent transition-colors duration-300 hidden md:block"
                  style={{ transform: "translateX(-50%)" }}
                />

                <div className="swiss-grid gap-y-6">
                  {/* Left: index + period */}
                  <div className="col-span-12 md:col-span-3">
                    <span className="text-label text-text-tertiary block mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-label text-text-secondary block leading-loose">
                      {formatDate(exp.startDate)}
                      <br />— {formatDate(exp.endDate)}
                    </span>
                    <span
                      className={`inline-block mt-4 text-label px-2.5 py-1 border ${
                        exp.iscurrent
                          ? "border-accent text-accent"
                          : "border-border text-text-tertiary"
                      }`}
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {exp.employmentType}
                    </span>
                  </div>

                  {/* Right: content */}
                  <div className="col-span-12 md:col-span-9">
                    {exp.website ? (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/company inline-flex items-baseline gap-2 mb-2"
                      >
                        <h2
                          className="font-bold text-text-primary group-hover:text-accent group-hover/company:underline underline-offset-4 decoration-1 transition-colors duration-300"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {exp.company}
                        </h2>
                        <span
                          className="text-label text-text-tertiary group-hover/company:text-accent transition-colors duration-300"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <h2
                        className="font-bold text-text-primary group-hover:text-accent transition-colors duration-300 mb-2"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {exp.company}
                      </h2>
                    )}
                    <p className="text-text-secondary text-sm mb-5">
                      {exp.position} · {exp.location}
                    </p>
                    <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    {exp.responsibilities &&
                      exp.responsibilities.length > 0 && (
                        <ul className="space-y-3 mb-8">
                          {exp.responsibilities.map((r, ri) => (
                            <li key={ri} className="flex items-start gap-3">
                              <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent shrink-0 block" />
                              <span className="text-text-secondary text-sm leading-relaxed">
                                {r}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                    {/* Technologies */}
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.technologies.map((t: string) => (
                          <span
                            key={t}
                            className="text-label text-text-tertiary border border-border px-2.5 py-1"
                            style={{ borderRadius: "var(--radius-sm)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project websites */}
                    {exp.projectWebsite && exp.projectWebsite.length > 0 && (
                      <div className="mt-2">
                        <span className="text-label text-text-tertiary block mb-3">
                          Related Projects
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {exp.projectWebsite.map((pw) => (
                            <a
                              key={pw.url}
                              href={pw.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-label text-text-primary border border-border px-3.5 py-1.5 hover:border-accent hover:bg-accent hover:text-bg transition-colors duration-300"
                              style={{ borderRadius: "var(--radius-sm)" }}
                            >
                              {pw.title}
                              <span aria-hidden="true">↗</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
