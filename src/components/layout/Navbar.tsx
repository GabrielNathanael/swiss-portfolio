"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { clsx } from "clsx";
import { Home, Briefcase, Award, FolderOpen, Mail } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About", icon: Home },
  { href: "/work", label: "Work", icon: FolderOpen },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 80);
    setScrolled(latest > 20);
  });

  const toggleTheme = useCallback(async () => {
    if (!themeButtonRef.current) return;

    const newTheme = theme === "dark" ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const { top, left, width, height } =
      themeButtonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    const transition = document.startViewTransition(async () => {
      setTheme(newTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [theme, setTheme]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-bg/90 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="container-grid">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Wordmark */}
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-label text-accent">©</span>
              <span
                className="font-display font-bold text-sm tracking-tight text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                GNP
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={clsx(
                      "text-label transition-colors duration-200",
                      pathname === href
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  ref={themeButtonRef}
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:border-accent transition-colors duration-200"
                >
                  {resolvedTheme === "dark" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
              )}

              {/* Mobile hamburger / close */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                ) : (
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <line
                      x1="0"
                      y1="1"
                      x2="16"
                      y2="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="0"
                      y1="6"
                      x2="16"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="0"
                      y1="11"
                      x2="16"
                      y2="11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Vertical Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-text-primary/20 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Floating vertical menu — aligned to hamburger button */}
            <div
              className="md:hidden fixed z-50"
              style={{ top: "calc(4rem + 1rem)", right: "1rem" }}
            >
              <div className="flex flex-col gap-3 items-end">
                {navLinks.map(({ href, label, icon: Icon }, i) => {
                  const active = pathname === href;
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-3"
                      >
                        {/* Label pill */}
                        <span
                          className={clsx(
                            "text-label px-4 py-2 border transition-colors duration-200 whitespace-nowrap",
                            active
                              ? "border-accent text-accent bg-bg"
                              : "border-border text-text-secondary bg-bg/90 group-hover:border-accent group-hover:text-accent",
                          )}
                          style={{
                            fontFamily: "var(--font-mono)",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          {label}
                        </span>

                        {/* Icon box — w-9 h-9 matches hamburger button */}
                        <div
                          className={clsx(
                            "w-9 h-9 flex items-center justify-center border transition-colors duration-200",
                            active
                              ? "bg-accent border-accent text-bg"
                              : "bg-surface border-border text-text-secondary group-hover:bg-accent group-hover:border-accent group-hover:text-bg",
                          )}
                          style={{ borderRadius: "var(--radius-sm)" }}
                        >
                          <Icon size={14} />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
