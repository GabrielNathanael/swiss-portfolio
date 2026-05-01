/**
 * CLIENT: Work Page
 * Route: /work
 * File: src/app/work/WorkPageClient.tsx
 * Features: grouped tag filter, pagination (6 per page), grid layout
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import type { Project } from "@/lib/contentful/types";

const ITEMS_PER_PAGE = 6;

interface WorkPageClientProps {
  projects: Project[];
  tagCategories: Record<string, string[]>;
}

export function WorkPageClient({ projects, tagCategories }: WorkPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-offset">
      {/* Page header */}
      <div ref={headerRef} className="container-grid page-header border-b border-border">
        <div className="swiss-grid items-end gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <span
              className="work-header-el text-label text-accent block mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              02 / WORK
            </span>
            <h1
              className="work-header-el font-bold text-text-primary leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Selected
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--color-text-primary)" }}>
                Projects
              </span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="work-header-el text-text-secondary leading-relaxed text-sm">
              Personal projects and products I've built — from dev tools to consumer apps.
            </p>
          </div>
        </div>
      </div>

      {/* Grouped filter */}
      <div className="border-b border-border bg-bg">
        <div className="container-grid py-6">
          <div className="flex flex-col gap-5">
            {/* All button + result count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveFilter("All")}
                  className={[
                    "px-4 py-2 border text-xs font-medium tracking-widest uppercase transition-colors duration-200",
                    activeFilter === "All"
                      ? "border-accent text-accent bg-accent/5"
                      : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary",
                  ].join(" ")}
                  style={{ borderRadius: "var(--radius-sm)" }}
                >
                  All
                </button>
                <span
                  className="text-label text-text-tertiary"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              {activeFilter !== "All" && (
                <button
                  onClick={() => setActiveFilter("All")}
                  className="text-label text-text-tertiary hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Clear ×
                </button>
              )}
            </div>

            {/* Grouped categories */}
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {Object.entries(tagCategories).map(([category, tags]) => (
                <div key={category} className="flex flex-col gap-2.5">
                  {/* Category label */}
                  <span
                    className="text-label text-text-tertiary"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {category}
                  </span>
                  {/* Tags in this category */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag: string) => (
                      <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={[
                          "px-3 py-1.5 border text-xs font-medium tracking-widest uppercase transition-colors duration-200",
                          activeFilter === tag
                            ? "border-accent text-accent bg-accent/5"
                            : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary",
                        ].join(" ")}
                        style={{ borderRadius: "var(--radius-sm)" }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project grid */}
      <div className="container-grid py-10 md:py-14">
        <AnimatePresence mode="popLayout">
          {paginated.length > 0 ? (
            <motion.div
              key={`${activeFilter}-${currentPage}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {paginated.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  className="group flex flex-col"
                >
                  {/* Image */}
                  <div
                    className={`relative w-full overflow-hidden bg-surface ${
                      project.orientation === "vertical" ? "aspect-3/4" : "aspect-16/10"
                    }`}
                    style={{ borderRadius: "var(--radius-sm)" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`transition-transform duration-700 group-hover:scale-105 ${
                        project.orientation === "vertical"
                          ? "object-cover object-top"
                          : "object-cover"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-text-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="text-label text-bg/70 bg-text-primary/40 backdrop-blur-sm px-2 py-0.5"
                        style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
                      >
                        {project.projectType}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-label text-bg/60"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex-1 flex flex-col gap-3">
                    <div>
                      <h2
                        className="font-bold text-text-primary"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {project.title}
                      </h2>
                      <p className="mt-1 text-text-secondary text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t: string) => (
                        <span
                          key={t}
                          className={[
                            "text-label px-2 py-0.5 border transition-colors duration-200",
                            t === activeFilter
                              ? "border-accent text-accent"
                              : "border-border text-text-tertiary",
                          ].join(" ")}
                          style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 mt-auto pt-1">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-label bg-accent text-bg px-4 py-2 hover:bg-accent-hover transition-colors duration-200"
                          style={{ fontFamily: "var(--font-mono)", borderRadius: "var(--radius-sm)" }}
                        >
                          Live ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-label border border-border text-text-secondary px-4 py-2 hover:border-accent hover:text-accent transition-colors duration-200"
                          style={{ fontFamily: "var(--font-mono)", borderRadius: "var(--radius-sm)" }}
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-text-tertiary text-sm"
            >
              No projects found for{" "}
              <span className="text-accent">{activeFilter}</span>.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-14 pt-8 border-t border-border">
            <span
              className="text-label text-text-tertiary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-border text-text-secondary hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
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
                      ? "border-accent text-accent"
                      : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary",
                  ].join(" ")}
                  style={{ borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-border text-text-secondary hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
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
    </div>
  );
}