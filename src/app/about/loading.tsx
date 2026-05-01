// src/app/about/loading.tsx
import { PageHeaderSkeleton } from "@/components/ui/Skeleton";
import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="page-offset">
      <PageHeaderSkeleton />
      <div className="container-grid section-padding">
        <div className="swiss-grid gap-y-14 md:gap-y-0">
          <div className="col-span-12 md:col-span-4">
            <div className="w-full bg-[var(--color-surface-2)] animate-pulse" style={{ aspectRatio: "3/4", borderRadius: "var(--radius-sm)" }} />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col gap-4">
            <SkeletonBlock className="h-8 w-48" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}