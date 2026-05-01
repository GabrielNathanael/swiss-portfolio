/**
 * Skeleton loading components
 * File: src/components/ui/Skeleton.tsx
 */
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-surface-2 animate-pulse ${className}`}
      style={{ borderRadius: "var(--radius-sm)" }}
    />
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="container-grid page-header border-b border-border">
      <SkeletonBlock className="h-4 w-24 mb-4" />
      <SkeletonBlock className="h-16 md:h-24 w-3/4 mb-2" />
      <SkeletonBlock className="h-16 md:h-24 w-1/2" />
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="container-grid py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <SkeletonBlock className="aspect-16/10 w-full" />
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="container-grid section-padding">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="py-6 border-t border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <SkeletonBlock className="h-6 w-48" />
              <SkeletonBlock className="h-4 w-32" />
            </div>
            <SkeletonBlock className="h-6 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}