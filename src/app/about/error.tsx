// src/app/about/error.tsx
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
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center page-offset text-center px-6">
      <span className="text-label text-accent block mb-4"
        style={{ fontFamily: "var(--font-mono)" }}>
        Failed to load
      </span>
      <h2
        className="font-bold text-text-primary mb-4"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
      >
        Something went wrong
      </h2>
      <p className="text-text-secondary mb-8 max-w-xs text-sm leading-relaxed">
        Could not load this page. This might be a temporary issue.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 text-sm font-bold hover:bg-accent-hover transition-colors"
          style={{ fontFamily: "var(--font-display)", borderRadius: "var(--radius-sm)" }}
        >
          Try again
        </button>
        <Link href="/" className="text-label text-text-secondary hover:text-accent transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}>
          ← Home
        </Link>
      </div>
    </div>
  );
}