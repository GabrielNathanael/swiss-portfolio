/**
 * COMPONENT: Tech Stack Section
 * Used in: Landing page (variant="landing") + About page (variant="about")
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStack, techCategories, categoryOrder } from "@/lib/data/techstack";

import { AnimatedBorder } from "@/components/ui/AnimatedBorder";

gsap.registerPlugin(ScrollTrigger);

interface TechStackProps {
  variant?: "landing" | "about";
  sectionNumber?: string;
}

export function TechStack({ variant = "landing", sectionNumber = "05" }: TechStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-category-block",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
    >
      <AnimatedBorder />
      <div className="container-grid">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div className="flex items-baseline gap-4">
            <span className="text-label text-[var(--color-text-tertiary)]">
              {sectionNumber}
            </span>
            <h2
              className="font-bold text-[var(--color-text-primary)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Technology
            </h2>
          </div>
        </div>

        {/* Categories */}
        <div
          className={
            variant === "about"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8"
          }
        >
          {categoryOrder.map((cat) => {
            const items = techStack.filter((t) => t.category === cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="tech-category-block">
                {/* Category label */}
                <p
                  className="text-label text-[var(--color-accent)] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {techCategories[cat]}
                </p>

                {/* Items */}
                <ul className="space-y-3">
                  {items.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <li
                        key={tech.name}
                        className="group flex items-center gap-2.5 py-1.5 border-b border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-200"
                      >
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 transition-colors duration-200 ${tech.color} opacity-70 group-hover:opacity-100`}
                        />
                        <span
                          className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {tech.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}