/**
 * PAGE: Contact
 * Route: /contact
 * File: src/app/contact/page.tsx
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const WA_NUMBER = "6281234567890"; // dummy — ganti dengan nomor asli
const WA_MESSAGE = encodeURIComponent("Hi Gabriel, I'd like to get in touch!");

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/GabrielNathanael",
    handle: "@GabrielNathanael",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/gabriel-nathanael-purba",
    handle: "gabrielnpurba",
  },
  {
    label: "Email",
    href: "mailto:gabrielnathanael81@gmail.com",
    handle: "gabrielnathanael81@gmail.com",
  },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={pageRef} className="page-offset">
      {/* Header */}
      <div className="container-grid page-header border-b border-border">
        <span
          className="contact-el text-label text-accent block mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          06 / CONTACT
        </span>
        <h1
          className="contact-el font-bold text-text-primary leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Let's build
          <br />
          <span className="text-accent">together.</span>
        </h1>
      </div>

      {/* Content — stacks on mobile, side by side on desktop */}
      <div className="container-grid section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Form — left 7 cols */}
          <div className="contact-el md:col-span-7">
            <h2
              className="font-bold text-text-primary mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Send a message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-accent p-8"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <span
                  className="text-label text-accent block mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Message sent ✓
                </span>
                <p className="text-text-secondary text-sm">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div>
                  <label
                    htmlFor="name"
                    className="text-label text-text-secondary block mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-border focus:border-accent pb-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-label text-text-secondary block mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-border focus:border-accent pb-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-label text-text-secondary block mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={8}
                    value={form.message}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder="What's on your mind?"
                    className="w-full bg-transparent border-b border-border focus:border-accent pb-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200 text-sm resize-none min-h-40"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <motion.button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-accent text-bg px-8 py-4 font-bold hover:bg-accent-hover transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      letterSpacing: "-0.01em",
                      borderRadius: "var(--radius-sm)",
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7H12M12 7L8 3M12 7L8 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 border border-border text-text-secondary px-5 py-4 font-bold hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      letterSpacing: "-0.01em",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar — right, offset 1 col */}
          <div className="contact-el md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-10">
              {/* Socials */}
              <div>
                <h3
                  className="text-label text-accent mb-5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Elsewhere
                </h3>
                <ul>
                  {socials.map(({ label, href, handle }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex items-center justify-between py-4 border-b border-border hover:border-accent transition-colors duration-200"
                      >
                        <span
                          className="text-label text-text-secondary group-hover:text-text-primary transition-colors"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-label text-text-tertiary group-hover:text-accent transition-colors"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {handle} ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response time */}
              <div
                className="border border-border p-6"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <span
                  className="text-label text-accent block mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Response time
                </span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  I typically respond within{" "}
                  <span className="text-text-primary font-medium">
                    24 hours
                  </span>{" "}
                  on weekdays. For urgent inquiries, email is fastest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
