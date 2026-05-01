/**
 * PAGE: Certificates
 * Route: /certificates
 * Server Component — ISR every 1 hour
 */
import type { Metadata } from "next";
import { getCertificates } from "@/lib/contentful/api";
import { CertificatesPageClient } from "./CertificatesPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Certificates",
  description: "Professional certifications earned by Gabriel Nathanael Purba including AWS, Google Cloud, and more.",
  alternates: { canonical: "https://www.gabrielnathanael.site/certificates" },
  openGraph: {
    title: "Certificates — Gabriel Nathanael Purba",
    description: "Professional certifications earned by Gabriel Nathanael Purba including AWS, Google Cloud, and more.",
    url: "https://www.gabrielnathanael.site/certificates",
  },
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  const sorted = [...certificates].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return Number(b.year) - Number(a.year);
  });
  return <CertificatesPageClient certificates={sorted} />;
}