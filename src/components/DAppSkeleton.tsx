export const DAppSkeleton = () => {
  return (
    <div className="w-full flex items-start gap-3 p-3 rounded-lg animate-pulse">
      {/* Icon Skeleton */}
      <div className="relative w-12 h-12 shrink-0 bg-gray-200 rounded-lg" />

      {/* Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Description Skeleton */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Networks Skeleton */}
        <div className="flex gap-1">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Arrow Icon Skeleton */}
      <div className="shrink-0 w-5 h-5 bg-gray-200 rounded" />
    </div>
  );
};

export const DAppListSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <DAppSkeleton key={index} />
      ))}
    </div>
  );
};

