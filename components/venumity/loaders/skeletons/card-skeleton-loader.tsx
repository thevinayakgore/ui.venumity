export default function SkeletonLoaderCard() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10 w-full">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-foreground/3 border rounded-xl shadow-lg/10 overflow-hidden"
        >
          {/* Image skeleton */}
          <div className="h-48 bg-linear-to-r from-foreground/5 to-background border-b animate-pulse" />

          <div className="p-6 space-y-4">
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-foreground/5 rounded animate-pulse" />
              <div className="h-4 bg-foreground/5 rounded w-2/3 animate-pulse" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-foreground/5 rounded animate-pulse" />
              <div className="h-3 bg-foreground/5 rounded animate-pulse" />
              <div className="h-3 bg-foreground/5 rounded w-4/5 animate-pulse" />
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2">
              <div className="h-6 bg-foreground/5 rounded w-16 animate-pulse" />
              <div className="h-6 bg-foreground/5 rounded w-20 animate-pulse" />
            </div>

            {/* Button skeleton */}
            <div className="pt-4">
              <div className="h-10 bg-foreground/5 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
