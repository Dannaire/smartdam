// components/ui/Skeleton.tsx — Loading skeleton (PRD §7.2 dan §15)
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-line shadow-sm p-4 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-line shadow-sm p-4">
      <Skeleton className="h-4 w-1/4 mb-4" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
