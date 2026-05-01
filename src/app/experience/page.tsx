/**
 * PAGE: Experience / Work History
 * Route: /experience
 * Server Component — ISR every 1 hour
 */
import type { Metadata } from "next";
import { getExperiences } from "@/lib/contentful/api";
import { ExperiencePageClient } from "./ExperiencePageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional work history of Gabriel Nathanael Purba — Full Stack Developer with 4+ years of experience across startups, studios, and freelance.",
  alternates: { canonical: "https://www.gabrielnathanael.site/experience" },
  openGraph: {
    title: "Experience — Gabriel Nathanael Purba",
    description: "Professional work history of Gabriel Nathanael Purba — Full Stack Developer with 4+ years of experience across startups, studios, and freelance.",
    url: "https://www.gabrielnathanael.site/experience",
  },
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  // Sort: current first, then by startDate desc
  const sorted = [...experiences].sort((a, b) => {
    if (a.iscurrent && !b.iscurrent) return -1;
    if (!a.iscurrent && b.iscurrent) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return <ExperiencePageClient experiences={sorted} />;
}