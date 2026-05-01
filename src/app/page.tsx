// src/app/page.tsx
/**
 * PAGE: Home / Landing
 * Route: /
 * Server Component — ISR every 1 hour
 */
import type { Metadata } from "next";
import {
  getFeaturedProjects,
  getRecentExperiences,
  getLatestCertificates,
  getProjects,
  getCertificates,
  getExperiences,
} from "@/lib/contentful/api";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { CertificateGlimpse } from "@/components/sections/CertificateGlimpse";
import { TechStack } from "@/components/sections/TechStack";
import { CTAStrip } from "@/components/sections/CTAStrip";

export const revalidate = 21600;

export const metadata: Metadata = {
  alternates: { canonical: "https://www.gabrielnathanael.site" },
  openGraph: { url: "https://www.gabrielnathanael.site" },
};

export default async function HomePage() {
  const [
    featuredProjects,
    recentExperiences,
    latestCertificates,
    allProjects,
    allCertificates,
    allExperiences,
  ] = await Promise.all([
    getFeaturedProjects(),
    getRecentExperiences(),
    getLatestCertificates(),
    getProjects(),
    getCertificates(),
    getExperiences(),
  ]);

  const currentJobs = allExperiences.filter((e) => e.iscurrent);

  return (
    <>
      <HeroSection />
      <StatsSection
        totalProjects={allProjects.length}
        totalCertificates={allCertificates.length}
        totalExperiences={allExperiences.length}
        currentJobs={currentJobs}
        sectionNumber="02"
      />
      <FeaturedProjects projects={featuredProjects} />
      <ExperienceStrip experiences={recentExperiences} />
      <CertificateGlimpse certificates={latestCertificates} />
      <TechStack sectionNumber="06" />
      <CTAStrip />
    </>
  );
}