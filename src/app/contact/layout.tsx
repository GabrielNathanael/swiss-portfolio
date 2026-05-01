/**
 * LAYOUT: Contact page metadata
 * File: src/app/contact/layout.tsx
 * Since contact/page.tsx is "use client", metadata goes here
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gabriel Nathanael Purba — Full Stack Developer based in Indonesia. Available for freelance and full-time opportunities.",
  alternates: { canonical: "https://www.gabrielnathanael.site/contact" },
  openGraph: {
    title: "Contact — Gabriel Nathanael Purba",
    description: "Get in touch with Gabriel Nathanael Purba — Full Stack Developer.",
    url: "https://www.gabrielnathanael.site/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}