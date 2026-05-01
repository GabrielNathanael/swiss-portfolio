// src/app/contact/loading.tsx
import { PageHeaderSkeleton } from "@/components/ui/Skeleton";
import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="page-offset">
      <PageHeaderSkeleton />
      <div className="container-grid section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-7 flex flex-col gap-8">
            <SkeletonBlock className="h-6 w-36" />
            {[1,2,3].map(i => (
              <div key={i} className="flex flex-col gap-2">
                <SkeletonBlock className="h-3 w-12" />
                <SkeletonBlock className="h-8 w-full" />
              </div>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4">
            <SkeletonBlock className="h-4 w-24" />
            {[1,2,3].map(i => <SkeletonBlock key={i} className="h-12 w-full" />)}
          </div>
        </div>
      </div>
    </div>
  );
}