// src/app/layout.tsx
import type { Metadata } from "next";
import { syne, dmSans, spaceMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { LenisProvider } from "@/lib/lenis";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BackToTop } from "@/components/ui/BackToTop";
import "@/app/globals.css";

const BASE_URL = "https://www.gabrielnathanael.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Gabriel Nathanael Purba — Full Stack Developer",
    template: "%s — Gabriel Nathanael Purba",
  },
  description:
    "Full Stack Developer based in Indonesia. Building performant, scalable web applications with Next.js, React, TypeScript, Node.js, and PostgreSQL.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Indonesia",
    "Gabriel Nathanael Purba",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Gabriel Nathanael Purba", url: BASE_URL }],
  creator: "Gabriel Nathanael Purba",
  publisher: "Gabriel Nathanael Purba",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Gabriel Nathanael Purba",
    title: "Gabriel Nathanael Purba — Full Stack Developer",
    description:
      "Full Stack Developer based in Indonesia. Building performant, scalable web applications.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nathanael Purba — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Nathanael Purba — Full Stack Developer",
    description:
      "Full Stack Developer based in Indonesia. Building performant, scalable web applications.",
    images: ["/opengraph-image.png"],
    creator: "@gabrielnpurba",
  },
  alternates: { canonical: BASE_URL },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriel Nathanael Purba",
  url: BASE_URL,
  jobTitle: "Full Stack Developer",
  worksFor: { "@type": "Organization", name: "Freelance" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressRegion: "Indonesia",
  },
  sameAs: [
    "https://github.com/GabrielNathanael",
    "https://www.linkedin.com/in/gabriel-nathanael-purba",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Full Stack Development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <ProgressBar />
            <CustomCursor />
            <Navbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
            <BackToTop />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
