// src/app/certificates/loading.tsx
import { PageHeaderSkeleton, CardGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="page-offset">
      <PageHeaderSkeleton />
      <CardGridSkeleton count={8} />
    </div>
  );
}