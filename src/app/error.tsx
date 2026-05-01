// src/app/error.tsx
/**
 * Root error boundary
 * File: src/app/error.tsx
 */
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center page-offset text-center px-6">
      <span
        className="text-label text-accent block mb-4"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Something went wrong
      </span>
      <h1
        className="font-bold text-text-primary leading-none mb-6"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 6vw, 5rem)",
          letterSpacing: "-0.04em",
        }}
      >
        Unexpected
        <br />
        <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--color-text-primary)" }}>
          Error
        </span>
      </h1>
      <p className="text-text-secondary mb-10 max-w-sm text-sm leading-relaxed">
        Something went wrong on our end. Try refreshing the page or come back later.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 text-sm font-bold hover:bg-accent-hover transition-colors"
          style={{ fontFamily: "var(--font-display)", borderRadius: "var(--radius-sm)" }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-label text-text-secondary hover:text-accent transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}