/**
 * COMPONENT: Featured Projects Section
 * Used in: Landing page
 * File: src/components/sections/FeaturedProjects.tsx
 */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/contentful/types";

import { AnimatedBorder } from "@/components/ui/AnimatedBorder";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: Project[];
}

function ProjectCard({
  project,
  index,
  layoutVariant,
}: {
  project: Project;
  index: number;
  layoutVariant: "large" | "small" | "medium";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 8, y: -x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const colClasses = {
    large:  "col-span-12 md:col-span-7",
    small:  "col-span-12 md:col-span-5",
    medium: "col-span-12 md:col-span-6",
  };

  // Height based on layout AND orientation
  const imageHeight = () => {
    if (project.orientation === "vertical") {
      // Portrait — taller container
      return {
        large:  "h-[420px] md:h-[580px]",
        small:  "h-[380px] md:h-[520px]",
        medium: "h-[400px] md:h-[540px]",
      }[layoutVariant];
    }
    // Horizontal (default) — landscape
    return {
      large:  "h-[300px] md:h-[420px]",
      small:  "h-[260px] md:h-[340px]",
      medium: "h-[280px] md:h-[380px]",
    }[layoutVariant];
  };

  const primaryUrl = project.demoUrl ?? project.githubUrl ?? "#";

  return (
    <div
      ref={cardRef}
      className={`project-card ${colClasses[layoutVariant]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.6s ease" : "transform 0.1s ease",
      }}
    >
      <Link href={primaryUrl} target="_blank" rel="noopener noreferrer" className="group block">
        {/* Image container */}
        <div
          className={`relative overflow-hidden bg-[var(--color-surface)] ${imageHeight()}`}
          style={{ borderRadius: "var(--radius-sm)" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
              project.orientation === "vertical" ? "object-cover object-top" : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <motion.div
            className="absolute inset-0 bg-[var(--color-text-primary)]"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.4 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="text-[#F4F1EC] font-bold"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.5vw, 1.8rem)" }}
            >
              Visit Project ↗
            </span>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className="text-label text-[#F4F1EC]/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="text-label text-[#F4F1EC]/60 border border-[#F4F1EC]/20 px-1.5 py-0.5"
              style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
            >
              {project.projectType}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h3
              className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h3>
            <p className="mt-1 text-[var(--color-text-secondary)] text-sm leading-snug line-clamp-1">
              {project.description}
            </p>
          </div>
          <span
            className="shrink-0 text-label text-[var(--color-text-tertiary)] mt-1"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {project.year}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((t: string) => (
            <span
              key={t}
              className="text-label text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5"
              style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (projects.length === 0) return null;

  const layoutVariants: Array<"large" | "small" | "medium"> = ["large", "small", "medium"];

  return (
    <section ref={sectionRef} className="section-padding">
      <AnimatedBorder />
      <div className="container-grid">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div className="flex items-baseline gap-4">
            <span
              className="text-label text-[var(--color-text-tertiary)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              02
            </span>
            <h2
              className="font-bold text-[var(--color-text-primary)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Selected Work
            </h2>
          </div>
          <Link
            href="/work"
            className="group hidden md:flex items-center gap-3 text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>All projects</span>
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>

        {/* Row 1: large + small */}
        <div className="swiss-grid gap-y-6 md:gap-y-8">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} layoutVariant={layoutVariants[i]} />
          ))}
        </div>

        {/* Row 2: centered medium */}
        {projects[2] && (
          <div className="swiss-grid mt-6 md:mt-8">
            <div className="col-span-12 md:col-start-4 md:col-span-6">
              <ProjectCard project={projects[2]} index={2} layoutVariant="medium" />
            </div>
          </div>
        )}

        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="text-label text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>All projects</span>
            <span className="block w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}