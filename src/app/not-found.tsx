import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center page-offset text-center px-6">
      {/* Label */}
      <span
        className="text-label text-[var(--color-accent)] block mb-8"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        404 / NOT FOUND
      </span>

      {/* Big 404 */}
      <h1
        className="font-bold leading-none mb-10"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 20vw, 16rem)",
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1.5px var(--color-border)",
        }}
      >
        404
      </h1>

      {/* Description */}
      <p className="text-[var(--color-text-secondary)] mb-10 max-w-sm text-sm leading-relaxed">
        This page doesn&apos;t exist. Maybe it was moved, or maybe it never existed.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-3 bg-[var(--color-accent)] text-[#F4F1EC] px-6 py-3 font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
        style={{ fontFamily: "var(--font-display)", borderRadius: "var(--radius-sm)" }}
      >
        ← Back home
      </Link>
    </div>
  );
}