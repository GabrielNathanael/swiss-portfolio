/**
 * PAGE: Work / All Projects
 * Route: /work
 * File: src/app/work/page.tsx
 * Server Component — ISR every 1 hour
 */
import type { Metadata } from "next";
import { getProjects, getTagsWithCategories } from "@/lib/contentful/api";
import { WorkPageClient } from "./WorkPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and personal work by Gabriel Nathanael Purba — Full Stack Developer. Built with Next.js, React, TypeScript, Node.js, and more.",
  alternates: { canonical: "https://www.gabrielnathanael.site/work" },
  openGraph: {
    title: "Work — Gabriel Nathanael Purba",
    description: "Projects and personal work by Gabriel Nathanael Purba — Full Stack Developer. Built with Next.js, React, TypeScript, Node.js, and more.",
    url: "https://www.gabrielnathanael.site/work",
  },
};

export default async function WorkPage() {
  const [projects, tagData] = await Promise.all([
    getProjects(),
    getTagsWithCategories(),
  ]);

  return (
    <WorkPageClient
      projects={projects}
      tagCategories={tagData.categories}
    />
  );
}