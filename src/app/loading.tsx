// src/app/loading.tsx
import { PageHeaderSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="page-offset">
      <div className="min-h-screen flex flex-col justify-center container-grid">
        <div className="h-4 w-24 bg-[var(--color-surface-2)] animate-pulse mb-6" style={{ borderRadius: "var(--radius-sm)" }} />
        <div className="h-[40vw] max-h-64 w-3/4 bg-[var(--color-surface-2)] animate-pulse mb-2" style={{ borderRadius: "var(--radius-sm)" }} />
        <div className="h-[40vw] max-h-64 w-1/2 bg-[var(--color-surface-2)] animate-pulse" style={{ borderRadius: "var(--radius-sm)" }} />
      </div>
    </div>
  );
}