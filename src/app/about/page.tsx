// src/app/about/page.tsx
/**
 * PAGE: About
 * Route: /about
 * Server Component — fetches profile + stats from Contentful
 */
import type { Metadata } from "next";
import {
  getProfile,
  getProjects,
  getCertificates,
  getExperiences,
} from "@/lib/contentful/api";
import { AboutPageClient } from "./AboutPageClient";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Gabriel Nathanael Purba — a Full Stack Developer from Indonesia building web applications with Next.js, React, and Laravel.",
  alternates: { canonical: "https://www.gabrielnathanael.site/about" },
  openGraph: {
    title: "About — Gabriel Nathanael Purba",
    description:
      "Learn about Gabriel Nathanael Purba — a Full Stack Developer from Indonesia.",
    url: "https://www.gabrielnathanael.site/about",
  },
};

export default async function AboutPage() {
  const [profile, allProjects, allCertificates, allExperiences] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getCertificates(),
      getExperiences(),
    ]);

  const currentJobs = allExperiences.filter((e) => e.iscurrent);

  return (
    <AboutPageClient
      photo={profile?.photo ?? null}
      resume={profile?.resume ?? null}
      totalProjects={allProjects.length}
      totalCertificates={allCertificates.length}
      totalExperiences={allExperiences.length}
      currentJobs={currentJobs}
    />
  );
}
