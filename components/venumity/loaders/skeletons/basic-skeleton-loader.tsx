export default function SkeletonLoaderBasic() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-6 p-6 md:p-10 w-full">
      {/* Card skeleton */}
      <div className="bg-foreground/5 rounded-xl p-6 space-y-4 w-full">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-foreground/10 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-foreground/10 rounded w-1/2 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-foreground/10 rounded animate-pulse" />
          <div className="h-4 bg-foreground/10 rounded animate-pulse" />
          <div className="h-4 bg-foreground/10 rounded w-5/6 animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="flex gap-3 pt-4">
          <div className="h-10 bg-foreground/10 rounded w-24 animate-pulse" />
          <div className="h-10 bg-foreground/10 rounded w-32 animate-pulse" />
        </div>
      </div>

      {/* List skeleton */}
      <div className="space-y-4 w-full">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-foreground/5 rounded-lg"
          >
            <div className="w-12 h-12 bg-foreground/10 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-foreground/10 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-foreground/10 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
