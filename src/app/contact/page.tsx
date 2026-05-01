/**
 * PAGE: Contact
 * Route: /contact
 * File: src/app/contact/page.tsx
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";

const WA_NUMBER = "6281290265801";
const WA_MESSAGE = encodeURIComponent("Hi Gabriel, I'd like to get in touch!");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/GabrielNathanael",
    handle: "@GabrielNathanael",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/gabriel-nathanael-purba",
    handle: "Gabriel Nathanael Purba",
  },
  {
    label: "Email",
    href: "mailto:gabrielnathanael81@gmail.com",
    handle: "gabrielnathanael81@gmail.com",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gabrielnathanaelp/",
    handle: "@gabrielnathanaelp",
  },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((s) => ({ ...s, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.", {
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          borderRadius: "var(--radius-sm)",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/gabrielnathanael81@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `New Message from [${form.name}]`,
            _captcha: "false",
            _template: "box",
          }),
        },
      );

      const data = await response.json();

      if (response.ok && (data.success === true || data.success === "true")) {
        setSubmitted(true);
        toast.success("Message sent! I'll get back to you within 24 hours.", {
          style: {
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-accent)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            borderRadius: "var(--radius-sm)",
          },
        });
      } else {
        throw new Error("FormSubmit returned failure");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again later.", {
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          borderRadius: "var(--radius-sm)",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sonner Toaster — styled to match design system */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            borderRadius: "var(--radius-sm)",
          },
        }}
      />

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
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-10"
                  noValidate
                >
                  {/* Name */}
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
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-border focus:border-accent pb-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200 text-sm disabled:opacity-50"
                      style={{
                        borderColor: errors.name
                          ? "var(--color-accent)"
                          : undefined,
                      }}
                    />
                    {errors.name && (
                      <p
                        className="mt-2 text-accent"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
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
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b border-border focus:border-accent pb-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200 text-sm disabled:opacity-50"
                      style={{
                        borderColor: errors.email
                          ? "var(--color-accent)"
                          : undefined,
                      }}
                    />
                    {errors.email && (
                      <p
                        className="mt-2 text-accent"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
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
                      name="message"
                      rows={8}
                      value={form.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="What's on your mind?"
                      className="w-full bg-transparent border-b border-border focus:border-accent pb-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors duration-200 text-sm resize-none min-h-40 disabled:opacity-50"
                      style={{
                        borderColor: errors.message
                          ? "var(--color-accent)"
                          : undefined,
                      }}
                    />
                    {errors.message && (
                      <p
                        className="mt-2 text-accent"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-3 bg-accent text-bg px-8 py-4 font-bold hover:bg-accent-hover transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.95rem",
                        letterSpacing: "-0.01em",
                        borderRadius: "var(--radius-sm)",
                      }}
                      whileHover={isSubmitting ? {} : { x: 4 }}
                      whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          {/* Spinner */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="animate-spin"
                          >
                            <circle
                              cx="7"
                              cy="7"
                              r="5.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeOpacity="0.3"
                            />
                            <path
                              d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2 7H12M12 7L8 3M12 7L8 11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
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
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
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
                    on weekdays. For urgent inquiries, WhatsApp is fastest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
