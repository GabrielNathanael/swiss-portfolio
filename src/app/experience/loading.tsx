// src/app/experience/loading.tsx
import { PageHeaderSkeleton, ListSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="page-offset">
      <PageHeaderSkeleton />
      <ListSkeleton count={3} />
    </div>
  );
}