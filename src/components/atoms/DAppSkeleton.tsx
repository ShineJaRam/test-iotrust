export const DAppSkeleton = () => {
  return (
    <div className="w-full flex items-start gap-3 p-3 rounded-lg animate-pulse">
      <div className="relative w-12 h-12 shrink-0 bg-gray-200 rounded-lg" />

      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        <div className="flex gap-1">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>

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

export const FavoriteSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-3 flex items-center gap-3 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );
};

export const FavoriteListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <FavoriteSkeleton key={index} />
      ))}
    </div>
  );
};
