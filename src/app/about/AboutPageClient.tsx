// src/app/about/AboutPageClient.tsx
/**
 * CLIENT: About Page
 * File: src/app/about/AboutPageClient.tsx
 * Handles: animations, display
 * Props: photo and resume URL from Contentful
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { TechStack } from "@/components/sections/TechStack";
import { StatsSection } from "@/components/sections/StatsSection";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  photo: string | null;
  resume: string | null;
  totalProjects: number;
  totalCertificates: number;
  totalExperiences: number;
  currentJobs: import("@/lib/contentful/types").Experience[];
}

const values = [
  {
    label: "01",
    title: "Learn by building",
    body: "The best way to understand something is to build it. Real projects teach what tutorials can't.",
  },
  {
    label: "02",
    title: "Code is communication",
    body: "Clean, readable code is a form of respect — for the next developer, for future-you, and for the product.",
  },
  {
    label: "03",
    title: "Ship, then iterate",
    body: "Perfectionism is a trap. I prefer working software in front of real users over a flawless spec in a drawer.",
  },
  {
    label: "04",
    title: "Full stack means ownership",
    body: "Knowing both ends of the stack means I understand the system as a whole — fewer assumptions, better decisions.",
  },
];

export function AboutPageClient({
  photo,
  resume,
  totalProjects,
  totalCertificates,
  totalExperiences,
  currentJobs,
}: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-header-el",
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
        ".about-body-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".about-body",
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 80%",
            once: true,
          },
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const fallbackPhoto =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";

  return (
    <div ref={pageRef} className="page-offset">
      {/* Header */}
      <div className="container-grid page-header border-b border-border">
        <div className="swiss-grid items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <span
              className="about-header-el text-label text-accent block mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              00 / ABOUT
            </span>
            <h1
              className="about-header-el font-bold text-text-primary leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              The person
              <br />
              <span className="text-accent">behind</span>
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--color-text-primary)",
                }}
              >
                the code.
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="about-body container-grid section-padding">
        <div className="swiss-grid items-start gap-y-14 md:gap-y-0">
          {/* Photo */}
          <div className="about-body-el col-span-12 md:col-span-4">
            <div
              className="relative overflow-hidden bg-surface"
              style={{ aspectRatio: "3/4", borderRadius: "var(--radius-sm)" }}
            >
              <Image
                src={photo ?? fallbackPhoto}
                alt="Gabriel Nathanael Purba"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span
                className="text-label text-text-secondary"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Available for freelance
              </span>
            </div>
          </div>

          {/* Bio text */}
          <div className="about-body-el col-span-12 md:col-span-7 md:col-start-6 flex flex-col gap-5">
            <h2
              className="font-bold text-text-primary"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Hey, I'm Gabriel.
            </h2>

            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base">
              <p>
                I'm a Full Stack Developer based in Indonesia with{" "}
                <span className="text-text-primary font-medium">1+ year</span>{" "}
                of experience building web applications, currently studying
                Computer Science at Universitas Pendidikan Ganesha.
              </p>
              <p>
                I work across the full stack using{" "}
                <span className="text-text-primary font-medium">Next.js</span>{" "}
                and{" "}
                <span className="text-text-primary font-medium">Laravel</span>{" "}
                as my primary frameworks — from database design and REST APIs to
                building modern, performant frontends. I enjoy owning the entire
                flow of a feature, end-to-end.
              </p>
              <p>
                Outside of work, I've been exploring cloud and DevOps
                fundamentals — hands-on with AWS and GCP on personal projects.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-px border border-border mt-2">
              {[
                { label: "Based in", value: "Indonesia" },
                { label: "Focus", value: "Full Stack" },
                { label: "Experience", value: "1+ year" },
                { label: "Status", value: "Open to work" },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 bg-surface">
                  <span
                    className="text-label text-text-tertiary block mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-bg text-label px-5 py-3 hover:bg-accent-hover transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Get in touch →
              </Link>

              {resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 border border-border text-text-secondary text-label px-5 py-3 hover:border-accent hover:text-accent transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v7M6 8L3 5M6 8l3-3M1 11h10"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Resume
                </a>
              )}

              <Link
                href="/work"
                className="text-label text-text-secondary hover:text-accent transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                See my work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsSection
        totalProjects={totalProjects}
        totalCertificates={totalCertificates}
        totalExperiences={totalExperiences}
        currentJobs={currentJobs}
      />

      {/* Tech Stack */}
      <TechStack variant="about" sectionNumber="—" />

      {/* Philosophy */}
      <div className="values-section border-t border-border">
        <div className="container-grid section-padding">
          <div className="flex items-baseline gap-4 mb-10 md:mb-12">
            <span
              className="text-label text-text-tertiary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Philosophy
            </span>
            <h2
              className="font-bold text-text-primary"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              How I think about work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {values.map((v) => (
              <div
                key={v.label}
                className="value-card p-6 md:p-8 bg-surface hover:bg-surface-2 transition-colors duration-300"
              >
                <span
                  className="text-label text-accent block mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {v.label}
                </span>
                <h3
                  className="font-bold text-text-primary mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {v.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
